import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import Roulette from "./Roulette";
import { useContext } from 'react';
import { WheelContext } from '../../contexts/WheelContext';
import { Spinner } from '@chakra-ui/react';
import ParticlesFirework from "../particules/ParticlesFirework";
import ParticlesConfetti from "../particules/ParticlesConfetti";
import ParticlesParty from '../particules/ParticlesParty';
import ParticlesPeperotig from '../particules/ParticlesPeperotig';

export default function FullRoulette({size, ...props}) {

	const {cells, reward} = useContext(WheelContext);

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
				{reward && reward.particles === 'firework' ? <ParticlesFirework/> : ''}
				{reward && reward.particles === 'confetti' ? <ParticlesConfetti/> : ''}
				{reward && reward.particles === 'party' ? <ParticlesParty/> : ''}
				{reward && reward.particles === 'peperotig' ? <ParticlesPeperotig/> : ''}
			</div>
		);
	else
		return (
			<Spinner size='xl' />
	);
  }

