import { Flex, Heading, FormControl, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { useSettings } from '../../hooks/useSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AdminSettings({...props}) {

	const [cooldown, setCooldown, updateCooldown] = useSettings('cooldown');
	const [poolYear, setPoolYear, updatePoolYear] = useSettings('poolYear');
	const [poolMonth, setPoolMonth, updatePoolMonth] = useSettings('poolMonth');
	const [poolStatus, setPoolStatus, updatePoolStatus] = useSettings('poolStatus');
	const [gameStatus, setGameStatus, updateGameStatus] = useSettings('gameStatus');

	return (
	 <Flex {...props} flexDir='column' alignItems='center'>
		<Heading size='md'>Settings</Heading>
		<Flex flexDir='column' overflowY='scroll'>

			<FormControl width='100%' marginY='8px' display='flex' alignItems='center'>
				<FormLabel>Wheel cooldown</FormLabel>
				<Input value={cooldown} onChange={setCooldown} type='text' marginInline='8px'/>
				<IconButton icon={<FontAwesomeIcon icon='check' />} onClick={() => updateCooldown()} />
			</FormControl>


			<FormControl width='100%' marginY='8px' display='flex' alignItems='center'>
				<FormLabel>Pool Year</FormLabel>
				<Select value={poolYear} onChange={setPoolYear} marginInline='8px'>
					<option value={2023}>2023</option>
					<option value={2024}>2024</option>
				</Select>
				<IconButton icon={<FontAwesomeIcon icon='check' />} onClick={() => updatePoolYear()} />
			</FormControl>

			<FormControl width='100%' marginY='8px' display='flex' alignItems='center'>
				<FormLabel>Pool Month</FormLabel>
				<Select value={poolMonth} onChange={setPoolMonth} marginInline='8px'>
					<option value='july'>July</option>
					<option value='september'>September</option>
					<option value='august'>August</option>
				</Select>
				<IconButton icon={<FontAwesomeIcon icon='check' />} onClick={() => updatePoolMonth()} />
			</FormControl>

			<FormControl width='100%' marginY='8px' display='flex' alignItems='center'>
				<FormLabel>Pool Status</FormLabel>
				<Select value={poolStatus} onChange={setPoolStatus} marginInline='8px'>
					<option value='active'>Acitive</option>
					<option value='inactive'>Inactive</option>
				</Select>
				<IconButton icon={<FontAwesomeIcon icon='check' />} onClick={() => updatePoolStatus()} />
			</FormControl>

			<FormControl width='100%' marginY='8px' display='flex' alignItems='center'>
				<FormLabel>Game Status</FormLabel>
				<Select value={gameStatus} onChange={setGameStatus} marginInline='8px'>
					<option value='active'>Acitive</option>
					<option value='inactive'>Inactive</option>
				</Select>
				<IconButton icon={<FontAwesomeIcon icon='check' />} onClick={() => updateGameStatus()} />
			</FormControl>

		</Flex>
	 </Flex>
	);
  }

