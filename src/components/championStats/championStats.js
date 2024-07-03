import { Avatar, Card, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function ChampionStats({champion, ...props}) {

	return (
		<Card
			{...props}
			alignItems='center'
			bg='gray.50'
			borderRadius='16px'
			overflow='hidden'
			display='flex'
			bgImage='url(/background.jpg)'
			bgSize='cover'
			flexDir='row'
		>
			<Center
				flex='1'
				bg='#FFD801'
				height='100%'
				flexDir='column'
			>
				<Avatar
					size='xl'
					src={champion.img}
					name={champion.name}
				>
					<Image
						src='https://cdn-icons-png.flaticon.com/512/2385/2385856.png'
						height='65%'
						position='absolute'
						transform='rotate(30deg)'
						top='-30%'
						right='-20%'
					/>
				</Avatar>
			</Center>
			<Stack
				flex='3'
				justifyContent='center'
				color='white'
				alignItems='center'
				height='100%'
				textShadow='1px 1px 2px rgba(0, 0, 0, 0.52)'
			>
				<Heading
					marginLeft='8px'
				>
					{champion.login}
				</Heading>
				<Text>
					The Marvinette Champion
				</Text>
			</Stack>
		</Card>
	);
  }
