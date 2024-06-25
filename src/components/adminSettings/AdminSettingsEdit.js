import { Flex, FormControl, FormLabel, IconButton, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AdminSettingsEdit({setting}) {


	return (
		<FormControl width='100%' marginY='8px' display='flex' alignItems='center'>
			<FormLabel>{setting.key}</FormLabel>
			<Input defaultValue={setting.value} type='text' marginInline='8px'/>
			<IconButton icon={<FontAwesomeIcon icon='check' />} />
		</FormControl>
	);
  }

