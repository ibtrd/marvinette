import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import Roulette from "./Roulette";
import { useContext } from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner } from '@chakra-ui/react';

export default function FullRoulette({size, ...props}) {

	const {cells} = useContext(WheelContext);

	if (cells.length > 0)
		return (
			<div className='FullRoulette' style={{
				height: size,
				width: size
			}}>
				<Roulette
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

