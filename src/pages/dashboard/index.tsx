import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

export default function Dashboard() {

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    api.get('/me').then((response) => {
      if(response) {
        console.log(response.data);
      }
    })
  }, []);

  return(
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    > 
      <Box>
      <Text fontSize="3xl">{user?.email}</Text>
      <h2>Permissions: {user?.permissions}</h2>
      <h2>Roles: {user?.roles}</h2>
      </Box>
    </Flex>
  );
}