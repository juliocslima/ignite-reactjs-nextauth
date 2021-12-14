import { useAuth } from "../contexts/AuthContext"
import { validadeUserPermissions } from "../utils/validadeUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useAuth();

  if(!isAuthenticated) {
    return false;
  }

  if(user) {
    const userHasValidPermissions = validadeUserPermissions({
      user,
      permissions, 
      roles,
    });

    return userHasValidPermissions;
  } else {
    return false;
  }
}