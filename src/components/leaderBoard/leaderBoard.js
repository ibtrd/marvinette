import { Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import ProfileCard from "./profileCard";


export default function LeaderBoard({stats, ...props}) {

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
			<Stack
				alignItems='center'
				width='100%'
				flex='2'
			>
				<Stack
					alignItems='center'
					marginY='24px'
				>
					<Heading
						color='gray.600'
						textAlign='center'
					>
						Leaderboard
					</Heading>
					<Text size='sm'>
						Total: {stats.totalSpins} spins
					</Text>
				</Stack>
				{stats && stats.topTen.length >= 3 &&
					<Flex
						justifyContent='center'
					>
						<ProfileCard
							rank={2}
							user={stats.topTen[1]}
							paddingTop='32px'
						/>
						<ProfileCard
							rank={1}
							user={stats.topTen[0]}
						/>
						<ProfileCard
							user={stats.topTen[2]}
							rank={3}
							paddingTop='32px'
						/>
					</Flex>
				}
			</Stack>
			<Stack
				flex='5'
				width='80%'
				alignItems='center'
				justifyContent='space-around'
				paddingBottom='16px'
				marginBottom='8px'
			>
				{stats && stats.topTen.length > 3 &&
					stats.topTen.slice(3).map((user, index) => (
						<ProfileCard
							width='100%'
							key={index}
							rank={index + 4}
							user={user}
						/>
					))
				}
			</Stack>
		</Card>
	);
  }
