import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import decode from 'jwt-decode';
import { validadeUserPermissions } from "./validadeUserPermissions";

type withSSRAuthProps = {
  permissions: string[];
  roles: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: withSSRAuthProps) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];

    if(!cookies['nextauth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    if(options) {
      const user = decode<{ permissions: string[], roles: string[],}>(token);
      const { permissions, roles } = options;

      const userHasValidPermissions = validadeUserPermissions({
        user,
        permissions, 
        roles,
      });

      console.log(userHasValidPermissions);

      if(!userHasValidPermissions) {
        return { 
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }

    try {
      return await fn(ctx);
    } catch (error) {
      if(error instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');
    
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}
