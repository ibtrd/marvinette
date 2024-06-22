import { Avatar, Card, CardBody, Flex, IconButton, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

export default function Profile({...props}) {

	const {me} = useContext(ProfileContext);

	if (me)
		return (
			<Card
				{...props}
				zIndex='3000'
			>
				<CardBody display='flex' alignItems='center' justifyContent='space-between' padding='8px'>
					<Flex alignItems='center' marginRight='16px'>
						<Avatar name={me.login} src={me.img} size='sm'/>
						<Text marginX='8px' fontWeight='bold'>{me.login}</Text>
					</Flex>
						<IconButton
							colorScheme="red"
							as='a'
							href='/auth/logout'
							size='sm'
							icon={<FontAwesomeIcon icon="arrow-right-from-bracket"/>}
						/>
						{me.admin &&
							<IconButton
								marginLeft='4px'
								colorScheme="blue"
								as='a'
								href='/admin'
								size='sm'
								icon={<FontAwesomeIcon icon="user-tie"/>}
							/>
						}
				</CardBody>
			</Card>
		);
  }

