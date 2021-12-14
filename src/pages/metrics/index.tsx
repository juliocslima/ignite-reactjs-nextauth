import { Box, Flex, Text } from "@chakra-ui/react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../../services/api";
import { Header } from "../../components/Header";

export default function Metrics() {

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
        <Box fontSize="3xl">
          <Text>Metrics</Text>
        </Box>
      </Flex>
    </Flex>
  );
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator'],
})