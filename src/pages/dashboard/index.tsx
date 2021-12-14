import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { parseCookies } from 'nookies';
import Router from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { api } from "../../services/apiClient";
import { setupAPIClient } from "../../services/api";
import { useCan } from "../../hooks/useCan";
import { Can } from "../../components/Can";
import { Header } from "../../components/Header";

export default function Dashboard() {

  const { user } = useAuth();
  const { 'nextauth.token': token } = parseCookies();

  const useCanSeeMetrics = useCan({ 
    roles: ['editor', 'administrator']
  });

  useEffect(() => {
    if(token) {
      api.get('/me').then((response) => {
        if(response) {
          console.log(response.data);
        }
      }).catch((error) => {
        console.log('Dashboard error: ' + error.message);
      });
    } else {
      Router.push('/');
    }
  }, []);

  return(
    <Flex 
      direction="column"
      h="100vh"
    > 
      <Header />
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
          <Can permissions={['metrics.list']}>
            <Box>
              Métricas
            </Box>
          </Can>
      </Box>
      </Flex>
    </Flex>
  );
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');
  console.log(response.data);

  return {
    props: {}
  }
})