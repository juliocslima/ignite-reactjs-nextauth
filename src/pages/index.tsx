import { Box, Button, Flex, Stack } from "@chakra-ui/react";

import { Input } from "../components/Form/Input";
import { Logo } from "../components/Header/Logo";

export default function Home() {
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
      >
        <Box align="center" mb="8">
          <Logo />
        </Box>
        
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink">Entrar</Button>
      </Flex>
      
    </Flex>
  )
}