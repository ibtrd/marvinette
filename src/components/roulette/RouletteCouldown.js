
import { Flex, Text } from '@chakra-ui/react';
import './Roulette.css'
import { useEffect, useState } from 'react';

export default function RouletteCouldown() {

	const nextSpin = Date.now() + 120000;
	const [time, setTime] = useState(nextSpin - Date.now());

	useEffect(() => {
		const timer = setInterval(() => {
			if (nextSpin - Date.now() <= 0)
			{
				setTime(0);
				clearInterval(timer);
			}
			else{
				setTime(nextSpin - Date.now());
			}
		}, 500);
		return () => {
			clearInterval(timer);
		}
	}, []);

	return (
		<span className='RouletteCouldown'>
			<Flex
				fontSize='4vw'
				color='black'
				// fontFamily="Ubuntu Mono"
				fontWeight='500'
			>
				<Text
					bg='white'
					borderLeftRadius='16px'
					paddingX='16px'
				>
					{Math.floor(time / 1000 / 60).toString().padStart(2, '0')}
				</Text>
				<Flex
			
					bg='white'
					width='2vw'
					justifyContent='center'
					fontWeight='700'
				>
					{Math.floor(time / 1000 % 2) ? ' ' : ':'}
				</Flex>
				<Text
					bg='white'
					borderRightRadius='16px'
					paddingX='16px'
				>
					{Math.floor(time / 1000 % 60).toString().padStart(2, '0')}
				</Text>
			</Flex>
		</span>
	);
  }