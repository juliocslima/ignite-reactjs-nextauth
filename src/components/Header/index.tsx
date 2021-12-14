import { Button, Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from 'react-icons/ri';
import { useAuth } from "../../contexts/AuthContext";

import { Logo } from "./Logo";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { signOut } = useAuth();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="1480"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />

      <Flex
        align="center"
        ml="auto"
      >
        <Button
          bgColor="gray.700"
          _hover={{
            bg: 'red'
          }}
          onClick={signOut}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}