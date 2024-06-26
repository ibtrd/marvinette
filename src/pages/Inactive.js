import { Center, Heading, Text } from "@chakra-ui/react";

export default function Inactive() {

  return (
    <Center
      width='100vw'
      height='100vh'
      alignItems='center'
      justifyContent='center'
	  flexDir='column'
    >
		<Heading>No fun allowed.</Heading>
		<Text width='50%'>Sorry, but the Marvinette is currently inactive. Please check back later.</Text>

	</Center>
    
  );
}
