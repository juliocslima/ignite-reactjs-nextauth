import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    
    <Text 
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
    >
      ReactAuth
      <Text as="span" ml="1" color="pink.500">.</Text>
    </Text>
  )
}