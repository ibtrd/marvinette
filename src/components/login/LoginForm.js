import { Flex, Heading, Text } from '@chakra-ui/react';
import LoginButton from './LoginButton';

export default function LoginForm({...props}) {

	return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      {...props}
    >
      <Heading>Marvinette</Heading>
      <Text marginY="64px" textAlign="justify" w={["60vw", "40vw", "30vw"]}>
        Dear 42 Lyon's Pisciner. <br />
        By now, you must be well-acquainted with Norminette and her daunting
        sister, Moulinette. We all know that luck has absolutely no part in
        dealing with them. But here's some exciting news for you! This year,
        their long-lost cousin is joining the lineup. What does she do, you ask?
        We'll leave that for you to discover, but maybe this time luck might
        just have a role to play :)
      </Text>
      <LoginButton />
    </Flex>
  );
  }

