import { Center, Heading, Image, Text, Link } from "@chakra-ui/react";

export default function Inactive() {

  return (
    <Center width="100vw" height="100vh" flexDir="column">
      <Image src="/nofun.png" height="5vh" />
      <Heading>No fun allowed</Heading>
      <Text marginY="64px" textAlign="justify" w={["60vw", "40vw", "30vw"]}>
        Hello July 2024
        <br /> <br />
        We are overjoyed by how popular Marvinette was on its first day out.
        Y'all are crazy! Unfortunately, it will remain inactive for now as we
        still want you to focus on your Piscine. No worries, we promise
        it will come back!
        <br /> <br />
        Have fun on Rush00 :)
      </Text>
      <Text
        color={'gray.400'}
        position={'absolute'}
        bottom='16px'
        textAlign='center'
      >
        Developed by <Link href='https://profile.intra.42.fr/users/ibertran' >ibertran</Link> && <Link href='https://profile.intra.42.fr/users/bwisniew'>bwisniew</Link>.
      </Text>
    </Center>
    
  );
}
