import { Flex, Link, Text } from '@chakra-ui/react';
import '../App.css'
import LoginForm from "../components/login/LoginForm";

export default function Login() {

  return (
    <Flex
      width='100vw'
      height='100vh'
      alignItems='center'
      justifyContent='center'
    >
		  <LoginForm />
      <Text
        color={'gray.400'}
        position={'absolute'}
        bottom='16px'
        textAlign='center'
      >
        Devlopded by <Link href='https://profile.intra.42.fr/users/ibertran' >ibertran</Link> and <Link href='https://profile.intra.42.fr/users/bwisniew'>bwisniew</Link>.
      </Text>
    </Flex>
    
  );
}
