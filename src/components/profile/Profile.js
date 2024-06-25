import { Avatar, Card, CardBody, Flex, IconButton, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

export default function Profile({isAdmin, ...props}) {

	const {me} = useContext(ProfileContext);

	if (me)
		return (
			<Card
				{...props}
				zIndex='3000'
				backgroundImage={process.env.REACT_APP_DEV ? "url('https://static.vecteezy.com/system/resources/previews/014/433/288/non_2x/yellow-and-black-caution-tape-barricade-tape-seamless-striped-pattern-or-texture-vector.jpg')" : 'none'}
				backgroundSize='cover'
				backgroundPosition='center'
			>
				<CardBody display='flex' alignItems='center' justifyContent='space-between' padding='8px'>
					<Flex alignItems='center' marginRight='16px'>
						<Avatar name={me.login} src={me.img} size='sm'/>
						<Text marginX='8px' fontWeight='bold'>{me.login}</Text>
					</Flex>
					<Flex>
						<IconButton
							colorScheme="red"
							as='a'
							href='/auth/logout'
							size='sm'
							icon={<FontAwesomeIcon icon="arrow-right-from-bracket"/>}
						/>
						{me.admin && !isAdmin &&
							<IconButton
								marginLeft='4px'
								colorScheme="blue"
								as='a'
								href='/admin'
								size='sm'
								icon={<FontAwesomeIcon icon="user-tie"/>}
							/>
						}
						{me.admin && isAdmin &&
							<IconButton
								marginLeft='4px'
								colorScheme="blue"
								as='a'
								href='/'
								size='sm'
								icon={<FontAwesomeIcon icon="house"/>}
							/>
						}
					</Flex>
				</CardBody>
			</Card>
		);
  }

