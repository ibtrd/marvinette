import { Flex } from '@chakra-ui/react';
import '../App.css'
import LoginForm from "../components/login/LoginForm";
import { useEffect } from 'react';

export default function Login() {

  return (
    <Flex
      width='100vw'
      height='100vh'
      alignItems='center'
      justifyContent='center'
    >
		  <LoginForm />
    </Flex>
    
  );
}
