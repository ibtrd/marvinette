import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import RouletteWheel from "./RouletteWheel";
import { useContext, useEffect, useState } from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner } from '@chakra-ui/react';
import RewardModal from '../rewardModal/RewardModal';
import ParticlesComponent from '../particules/ParticlesComponent';

export default function Roulette({size, ...props}) {

	const {cells, reward} = useContext(WheelContext);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (reward)
			setOpen(true);
	}, [reward])


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
				{open && reward && reward.particles ?
            		<ParticlesComponent url={reward.particles} /> : ''
       			}
				{open && reward &&
					<RewardModal
						onClose={() => setOpen(false)}
						reward={reward}
					/>
				}
			</div>
		);
	else
		return (
			<Spinner size='xl' />
	);
  }

