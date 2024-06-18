import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated, useSpring, easings } from 'react-spring'

export default function Roulette({cells, goal, setGoal, lastUpdate}) {

	const spinRoulette = () => {
		fetch(`/goal/${lastUpdate}`)
		.then(async (res) => {
		  if (res.ok)
		  {
			const goal = (await res.json()).goal
			setGoal(goal)
			const rand =  getRandom((-360/cells.length)/2.5, (360/cells.length)/2.5)
			console.log('Goal:', cells[goal].name, goal, 'rand:', rand);
			api.start({
				from: {
					rotate: randomStart,
				},
				to: {
					// rotate: 360 * 20 + ((360/cells.length) * goal),
					rotate: 360 * 10 + (360 - (360/cells.length) * goal) + rand,
				},
				config: {
					duration: getRandomDuration(10, 15),
					easing: easings.easeOutCubic,
				},
			})
		  }
		})
	}

	const getRandomDuration = (min, max) => {
		return (Math.random() * (max - min) + min) * 1000;
	}

	const getRandom = (min, max) => {
		return (Math.random() * (max - min) + min);
	}

	const randomStart = getRandom(0, 360);


	const [springs, api] = useSpring(() => ({
		from: { rotate: randomStart },
	}))


	return (
	  <animated.div
	  	className='Roulette'
		style={{...springs}}
		onClick={spinRoulette}
	  >
		{cells.map((cell, index) => (
			<RouletteCell
				key={index}
				data={cell}
				rotate={360/cells.length * index}
				angle={360/cells.length}
			/>
		))}
	  </animated.div>
	);
  }

