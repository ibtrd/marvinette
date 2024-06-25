import { Flex, Heading, Text } from '@chakra-ui/react';
import LoginButton from './LoginButton';

export default function LoginForm({...props}) {

	return (
	  <Flex
	  	alignItems='center'
		justifyContent='center'
		flexDir='column'
		{...props}
	  >
		<Heading>
			Marvinette
		</Heading>
		<Text
			marginY='64px'
			textAlign='justify'
			w={['60vw', '40vw', '30vw']}
		>
			Get ready to experience a new and exciting way to engage with our school community. Whether you're here to learn, connect, or simply have fun, the 42 Roulette offers something for everyone.
		</Text>
		<LoginButton/>
	  </Flex>
	);
  }

