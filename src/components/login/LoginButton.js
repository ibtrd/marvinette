import { Button, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useError } from '../../hooks/useError';
import { animated, useSpring } from 'react-spring';

export default function LoginButton({...props}) {

	const [isLoading, setIsLoading] = useState(false);
	const [hover, onHover] = useSpring(() => ({ y: 0 }));
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

	const handleLogin = () => {
		if (!isLoading) {
			setIsLoading(true);
			window.location.href = '/auth/login';
		}
	}

	return (
		<Button
			{...props}
			color='white'
			bg='black'
			isLoading={isLoading}
			onClick={() => handleLogin()}
			_hover={{bg: 'gray.500'}}
			onMouseEnter={() => onHover({ y: -23 })}
 			onMouseLeave={() => onHover({ y: 0 })}
		>
			<Text>Login with</Text>
			<Image
				src='https://profile.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg'
				height='16px'
				marginX='8px'
			/>
			<Text>Intra</Text>
			<animated.img
				style={{ ...hover, position: 'absolute', height: '100%', zIndex: -1 }}
				src='https://static.vecteezy.com/system/resources/previews/036/646/256/non_2x/duck-emoji-no-free-vector.png'
			>
			</animated.img>
		</Button>
	);
  }
