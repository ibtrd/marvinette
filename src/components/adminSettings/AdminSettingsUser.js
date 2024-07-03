import { Flex, Heading, IconButton, Input, Select } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserForce } from '../../hooks/useUserForce';
import { useState } from 'react';

export default function AdminSettingsUser({...props}) {

	const [cells, forceUser] = useUserForce();
	const [login, setLogin] = useState('');
	const [cell, setCell] = useState(-1);

	const force = () => {
		if (cell !== '-1')
			forceUser(login, {id: cell, name: cells[cell].name});
		else
			forceUser(login, {id: -1, name: 'Cancel Reward'});
	}

	return (
	 <Flex {...props} flexDir='column' alignItems='center'>
		<Heading size='md' marginBottom='8px'>Force user next Reward</Heading>
		<Flex>
			<Input placeholder='Login' onChange={(e) => setLogin(e.target.value)}/>
			<Select
				placeholder='Select a cell'
				marginX='8px'
				onChange={(e) => setCell(e.target.value)}
			>
				<option value='-1'>Cancel Reward</option>
				{cells.map((cell, index) => (
					<option key={index} value={index}>
						[{index}] {cell.name}
					</option>
				))}
			</Select>
			<IconButton icon={<FontAwesomeIcon icon='check' />} onClick={() => force()}/>
		</Flex>
	 </Flex>
	);
  }

