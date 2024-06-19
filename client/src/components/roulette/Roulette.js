import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated, useSpring, easings } from 'react-spring'
import { useState } from "react";

export default function Roulette({cells, lastUpdate, size, onOpen}) {

	const [reward, setReward] = useState(undefined)

	const spinRoulette = () => {
		setReward(undefined);
		fetch(`/goal/${lastUpdate}`)
		.then(async (res) => {
		  if (res.ok)
		  {
			const goal = (await res.json())
			const rand =  getRandom((-360/cells.length)/2.5, (360/cells.length)/2.5)
			console.log('Goal:', goal);
			spinApi.start({
				from: {
					rotate: randomStart,
				},
				to: {
					rotate: 360 * 10 + (360 - (360/cells.length) * goal.goal) + rand,
				},
				config: {
					duration: getRandomDuration(10, 15),
					easing: easings.easeOutCubic,
				},
				onRest: () => {
					setReward(goal)
				},
			})
		  }
		  else if (res.status === 409){
			onOpen()
		  }
		})
	}

	const getRandomDuration = (min, max) => {
		return (Math.random() * (max - min) + min) * 1000;
	}

	const getRandom = (min, max) => {
		return (Math.random() * (max - min) + min);
	}
	
	const randomStart = getRandom(0, 360)

	const [spins, spinApi] = useSpring(() => ({
		from: { rotate: randomStart },
	}))



	return (
	  <animated.div
	  	className='Roulette'
		style={{...spins}}
		onClick={spinRoulette}
	  >
		{cells.map((cell, index) => (
			<RouletteCell
				size={size}
				key={index}
				data={cell}
				rotate={360/cells.length * index}
				angle={360/cells.length}
				reward={reward ? reward : undefined}
				index={index}
			/>
		))}
	  </animated.div>
	);
  }

