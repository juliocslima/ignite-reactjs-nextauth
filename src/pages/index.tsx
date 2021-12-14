import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { SubmitHandler, useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';

import { Input } from "../components/Form/Input";
import { Logo } from "../components/Header/Logo";

import { useAuth } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFormData = {
  email: string;
  password: string;
}

export default function Home() {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;
  const { signIn } = useAuth();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    > 

      <Flex 
        as="form"
        width="100%"
        maxWidth={360}
        bgColor="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Box align="center" mb="8">
          <Logo />
        </Box>
        
        <Stack spacing="4">
          <Input 
            name="email" 
            id="email"
            type="email" 
            label="E-mail" 
            error={errors.email}
            {...register("email")}
          />

          <Input 
            name="password" 
            id="password"
            type="password" 
            error={errors.password}
            label="Senha" 
            {...register("password")}
          />
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});