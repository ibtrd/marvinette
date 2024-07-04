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
			>
			</Avatar>
			<Image
				src={reward.reward}
				height='32px'
				alt={reward.alt}
				marginRight='32px'
				marginLeft='-16px'
				zIndex='5'
			/>
			<Text>{reward.login}</Text>
		</Flex>
	);
  }
