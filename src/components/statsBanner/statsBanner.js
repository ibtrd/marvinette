import { Avatar, Card, CardBody, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useStats } from "../../hooks/useStats";

export default function StatsBanner({isAdmin, ...props}) {

	const { stats } = useStats();

	if (stats)
		return (
			<Card
				{...props}
				zIndex='3000'
			>
				<CardBody display='flex' alignItems='center' justifyContent='space-between' padding='8px'>
					<Flex alignItems='center' marginRight='8px'>
						<Avatar name='bwisniew' src='https://cdn.intra.42.fr/users/dae133a4b21afe63c0934c2545ab7857/bwisniew.jpg' size='sm'>
							<Image
								src='https://cdn-icons-png.flaticon.com/512/2385/2385856.png'
								position='absolute'
								top='-70%'
								right='-30%'
								transform='rotate(20deg)'
							/>
						</Avatar>
						<Text marginX='8px'>bwisniew</Text>
					</Flex>
					<Flex
						alignItems='center'
					>
						<Image
							height='32px'
							src='./wheelIcon.png'
							marginRight='8px'
						/>
						<Text>
							{stats.total} spins
						</Text>
					</Flex>
					<IconButton
						marginLeft='16px'
						colorScheme="purple"
						icon={<FontAwesomeIcon icon='trophy'/>}
						size='sm'
					/>
				</CardBody>
			</Card>
		);
  }

