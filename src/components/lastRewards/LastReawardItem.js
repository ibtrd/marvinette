import { Avatar, Flex, Image, Text } from "@chakra-ui/react";

export default function LastRewardsItem({reward, ...props}) {

	return (
		<Flex
			{...props}
			alignItems='center'
			justifyContent='space-between'
			as='a'
			href={`https://profile.intra.42.fr/users/${reward.login}`}
		>
			<Flex
				align='center'
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
					marginLeft='-8px'
					zIndex='5'
				/>
			</Flex>
			<Text>{reward.login}</Text>
		</Flex>
	);
  }
