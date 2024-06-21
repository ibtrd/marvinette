import { Avatar, Card, CardBody, Flex, IconButton, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Profile({...props}) {

	return (
		<Card
			{...props}
			zIndex='3000'
		>
			<CardBody display='flex' alignItems='center' justifyContent='space-between' padding='8px'>
				<Flex alignItems='center' marginRight='16px'>
					<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='sm'/>
					<Text marginX='8px' fontWeight='bold'>bwisniew</Text>
				</Flex>
					<IconButton
						colorScheme="red"
						as='a'
						href='/auth/logout'
						size='sm'
						icon={<FontAwesomeIcon icon="arrow-right-from-bracket"/>}
					/>
					<IconButton
						marginLeft='4px'
						colorScheme="blue"
						as='a'
						href='/admin'
						size='sm'
						icon={<FontAwesomeIcon icon="user-tie"/>}
					/>
			</CardBody>
		</Card>
	);
  }

