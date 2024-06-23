import { Button, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useError } from '../../hooks/useError';

export default function LoginButton({...props}) {

	const [isLoading, setIsLoading] = useState(false);
	const { 
		showError
	} = useError();

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => {
				showError('An error occurred. Please try again later.');
				setIsLoading(false);
			}, 20000);
			return () => clearTimeout(timer);
		}
	}, [isLoading]);

	return (
	  <Button
		as='a'
	 	href='/auth/login'
		{...props}
		color='white'
		bg='black'
		isLoading={isLoading}
		onClick={() => setIsLoading(true)}
	>
		<Text>Login with</Text>
		<Image
			src='https://profile.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg'
			height='16px'
			marginX='8px'
		/>
		<Text>Intra</Text>
		<Image

			position='absolute' height='90%' top='-5' zIndex={-1}
			src='https://static.vecteezy.com/system/resources/previews/036/646/256/non_2x/duck-emoji-no-free-vector.png'
		/>
	  </Button>
	);
  }
