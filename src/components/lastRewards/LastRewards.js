import { Card, Heading, Stack } from "@chakra-ui/react";
import LastRewardsItem from "./LastReawardItem";


export default function LastRewards({stats, ...props}) {

	if (stats)
	return (
		<Card
			{...props}
			alignItems='center'
			borderRadius='16px'
			overflow='hidden'
			justifyContent='space-between'
			display='flex'
			flexDirection='column'
			bg='gray.50'
		>
				<Heading
					color='gray.600'
					marginY='32px'
					textAlign='center'
				>
					Last Rewards
				</Heading>
				<Stack
					width='100%'
					height='85%'
					marginBottom='32px'
					alignItems='center'
					justifyContent='space-around'
				>
					{stats && stats.lastRewards && stats.lastRewards.filter((a, i) => i < 15).map((reward, index) => (
						<LastRewardsItem
							width='90%'
							key={index}
							reward={reward}
						/>
					))}
				</Stack>
		</Card>
	);
  }
