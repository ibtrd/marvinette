import { Center, Heading, Image, Text } from "@chakra-ui/react";

export default function Inactive() {

  return (
    <Center
      width='100vw'
      height='100vh'
	    flexDir='column'
    >
      <Image src='/nofun.png' height='5vh'/>
      <Heading>No fun allowed.</Heading>
      <Text maxWidth='90vw' textAlign='center'>
          Sorry, but the Marvinette is currently inactive. Please check back later.
        </Text>

    </Center>
    
  );
}
