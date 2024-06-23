import { Flex, Heading } from '@chakra-ui/react';
import AdminSettingsEdit from './AdminSettingsEdit';

export default function AdminSettings({...props}) {

	const settings = [
		{key: 'cooldown', value: '12'},
		{key: 'cooldown', value: '12'},
		{key: 'cooldown', value: '12'},
		{key: 'cooldown', value: '12'}
	]

	return (
	 <Flex {...props} flexDir='column' alignItems='center'>
		<Heading size='md'>Settings</Heading>
		<Flex flexDir='column' overflowY='scroll'>
			{settings.map((setting, index) => (
				<AdminSettingsEdit key={index} setting={setting}/>
			))}
		</Flex>
	 </Flex>
	);
  }

