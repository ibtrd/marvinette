import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import RouletteWheel from "./RouletteWheel";
import { useContext} from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner } from '@chakra-ui/react';

export default function Roulette({size, ...props}) {

	const {cells} = useContext(WheelContext);

	if (cells.length > 0)
		return (
			<div className='Roulette' style={{
				height: size,
				width: size
			}}>
				<RouletteWheel
					size={size}
					{...props}
				/>
				<RoulettePointer />
			</div>
		);
	else
		return (
			<Spinner size='xl' />
	);
  }

