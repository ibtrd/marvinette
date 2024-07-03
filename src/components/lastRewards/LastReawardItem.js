import { Avatar, Flex, Image, Text } from "@chakra-ui/react";

export default function LastRewardsItem({reward, ...props}) {

	return (
		<Flex
			{...props}
			alignItems='center'
			justifyContent='center'
		>
			<Avatar
				size='sm'
				src={reward.img}
				name={reward.login}
				marginRight='32px'
			>
				<Image
					src={reward.reward}
					height='100%'
					width='auto'
					position='absolute'
					right='-65%'
					alt={reward.alt}
				/>
			</Avatar>
			<Text>{reward.login}</Text>
		</Flex>
	);
  }
