import { Avatar, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";


export default function ProfileCard({user, rank, ...props}) {

	if (rank < 4)
	return (
		<Stack
			{...props}
			alignItems='center'
			gap='0'
			marginInline='24px'
			as='a'
			href={`https://profile.intra.42.fr/users/${user.login}`}
		>
			<Heading
				size='sm'
				margin='4px'

			>
				{rank}
			</Heading>
			<Avatar
				size='lg'
				src={user.img}
				name={user.login}
				border={rank === 1 ? '4px solid #d4af37' : (rank === 2 ? '4px solid #c0c0c0' : '4px solid #cd7f32')}
			>
				<Image
					src={user.coalitionImg}
					height='35%'
					position='absolute'
					right='0'
					bottom='0'
				/>
			</Avatar>
			<Heading
				margin='0'
				size='md'
			>
				{user.spins}
			</Heading>
			<Text>{user.login}</Text>
		</Stack>
	);

	return (
		<Flex
			{...props}
			alignItems='center'
			justifyContent='space-between'
			as='a'
			href={`https://profile.intra.42.fr/users/${user.login}`}
		>
			<Flex
				alignItems='center'
			>
				<Text
					position='absolute'
				>
					{rank}
				</Text>
				<Avatar
					marginLeft='32px'
					size='sm'
					src={user.img}
					name={user.login}
				>
					<Image
						src={user.coalitionImg}
						height='40%'
						position='absolute'
						right='0'
						bottom='0'
					/>
				</Avatar>
				<Text
					marginLeft='8px'
				>
					{user.login}
				</Text>
			</Flex>
			<Heading
				size='sm'
			>
				{user.spins}
			</Heading>
		</Flex>
	)
  }
