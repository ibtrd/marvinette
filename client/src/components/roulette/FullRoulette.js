import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import Roulette from "./Roulette";
import { useContext, useEffect, useState } from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner } from '@chakra-ui/react';
import ParticlesFirework from "../particules/ParticlesFirework";
import ParticlesConfetti from "../particules/ParticlesConfetti";
import ParticlesParty from '../particules/ParticlesParty';
import ParticlesPeperotig from '../particules/ParticlesPeperotig';
import RewardModal from '../rewardModal/RewardModal';
import RouletteCouldown from './RouletteCouldown';

export default function FullRoulette({size, ...props}) {

	const {cells, reward} = useContext(WheelContext);

	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (reward)
		{
			setTimeout(() => {
				setOpen(true);
			}, 2000);
		}
	}, [reward])


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
				{open && reward.particles === 'firework' ? <ParticlesFirework/> : ''}
				{open && reward.particles === 'confetti' ? <ParticlesConfetti/> : ''}
				{open && reward.particles === 'party' ? <ParticlesParty/> : ''}
				{open && reward.particles === 'peperotig' ? <ParticlesPeperotig/> : ''}
				{open &&
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

