import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import RouletteWheel from "./RouletteWheel";
import { useContext, useEffect} from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner } from '@chakra-ui/react';
import { animated, useSpring } from 'react-spring';

export default function Roulette({size, ...props}) {

	const {cells} = useContext(WheelContext);

	const [spring, api] = useSpring(
		() => ({
		  from: {
				scale: 0,
				transform: window.innerWidth < 768 ? 'translate(-50%, -50%)' : 'translate(0, 0)',
			},
		  to: { scale: 1 },
		}), []
	);

	useEffect(() => {
		api({
			transform: window.innerWidth < 768 ? 'translate(-50%, -50%)' : 'translate(0, 0)',
	  
  		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [size]);

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

