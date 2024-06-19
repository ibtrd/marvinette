import './Roulette.css'
import RoulettePointer from "./RoulettePointer";
import Roulette from "./Roulette";
import { useDisclosure } from '@chakra-ui/react'

export default function FullRoulette({size, ...props}) {

	const { isOpen: rewardOpen, onOpen: onRewardOpen, onClose: onRewardClose } = useDisclosure()

	return (
		<div className='FullRoulette' style={{
			height: size,
			width: size
		}}>
			<Roulette
				size={size}
				{...props}
				onReward={onRewardOpen}
			/>
			<RoulettePointer />
	  	</div>
	);
  }

