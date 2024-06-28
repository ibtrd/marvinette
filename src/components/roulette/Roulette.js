import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import RouletteWheel from "./RouletteWheel";
import { useContext} from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner, transform } from '@chakra-ui/react';
import { animated, useSpring } from 'react-spring';

export default function Roulette({size, ...props}) {

	const {cells} = useContext(WheelContext);

	const [spring] = useSpring(
		() => ({
		  from: {
				scale: 0
			},
		  to: { scale: 1 },
		}),
		[]
	  );

	if (cells.length > 0)
		return (
			<animated.div className='Roulette' style={{
				height: size,
				width: size,
				...spring
			}}>
				<RouletteWheel
					size={size}
					{...props}
				/>
				<RoulettePointer />
			</animated.div>
		);
	else
		return (
			<Spinner size='xl' />
	);
  }

