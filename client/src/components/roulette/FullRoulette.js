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
import { ProfileContext } from '../../contexts/ProfileContext';

export default function FullRoulette({size, ...props}) {

	const {cells, reward, setReward} = useContext(WheelContext);
	const {me} = useContext(ProfileContext);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (me && me.lastReward && me.nextSpin > Date.now())
		{
			console.log('me home', me, Date.now());
			setOpen(true);
		}
	}, [me]);

	useEffect(() => {
		if (reward && !open)
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
				{open && me.lastReward.particles === 'firework' ? <ParticlesFirework/> : ''}
				{open && me.lastReward.particles === 'confetti' ? <ParticlesConfetti/> : ''}
				{open && me.lastReward.particles === 'party' ? <ParticlesParty/> : ''}
				{open && me.lastReward.particles === 'peperotig' ? <ParticlesPeperotig/> : ''}
				{open &&
					<RewardModal
						onClose={() => setOpen(false)}
						nextSpin={me.nextSpin}
						reward={me.lastReward}
					/>
				}
			</div>
		);
	else
		return (
			<Spinner size='xl' />
	);
  }

