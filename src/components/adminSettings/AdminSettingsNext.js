import { Flex, Heading, IconButton, Input, Select } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNextForce } from '../../hooks/useNextForce';

export default function AdminSettingsNext({...props}) {

	const [cells, forceNext] = useNextForce();
	const [cell, setCell] = useState(-1);

	const force = () => {
		forceNext({id: cell, name: cells[cell].name})
	}

	return (
	 <Flex {...props} flexDir='column' alignItems='center'>
		<Heading size='md' marginBottom='8px'>Force next Reward</Heading>
		<Flex>
			<Select
				placeholder='Select a cell'
				marginX='8px'
				onChange={(e) => setCell(e.target.value)}
			>
				<option value={-1}>Cancel Reward</option>
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

