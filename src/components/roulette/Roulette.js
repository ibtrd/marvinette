import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated, useSpring, easings } from 'react-spring'

export default function Roulette() {

	const	cells = [
		{name: 'Goal0', weigth: '40'},
		{name: 'Goal1', weigth: '10'},
		{name: 'Goal2', weigth: '-20'},
		{name: 'Goal3', weigth: '-30'},
		{name: 'Goal4', weigth: '40'},
		{name: 'Goal5', weigth: '40'},
		{name: 'Goal6', weigth: '10'},
		{name: 'Goal7', weigth: '-20'},
		{name: 'Goal8', weigth: '-30'},
		{name: 'Goal9', weigth: '-20'},
		{name: 'Goal10', weigth: '-30'},
		{name: 'Goal11', weigth: '40'},
		{name: 'Goal12', weigth: '10'},
		{name: 'Goal13', weigth: '-20'},
		{name: 'Goal14', weigth: '-30'},
		{name: 'Goal15', weigth: '-20'}
	]

	const getRandomDuration = (min, max) => {
		return (Math.random() * (max - min) + min) * 1000;
	}


	const [springs, api] = useSpring(() => ({
		from: { rotate: 0 },
	}))

	const	handleClick = () => {
		var	goal = Math.floor(Math.random() * (cells.length));
		console.log('Goal:', cells[goal].name, goal);
		api.start({
			from: {
				rotate: 0,
			},
			to: {
				rotate: 360 * 20 + ((360/cells.length) * goal),
			},
			config: {
				duration: getRandomDuration(7, 14),
				easing: easings.easeOutCubic,
			},
		})
	}


	return (
	  <animated.div
	  	className='Roulette'
		style={{...springs}}
		onClick={handleClick}
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