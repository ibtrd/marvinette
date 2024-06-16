import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated, useSpring, easings } from 'react-spring'

export default function Roulette() {

	const	cells = [
		{name: 'Goal 0', weight: 40},
		{name: 'Goal 1', weight: 10},
		{name: 'Goal 2', weight: -20},
		{name: 'Goal 3', weight: -30},
		{name: 'Goal 4', weight: 40},
		{name: 'Goal 5', weight: 40},
		{name: 'Goal 6', weight: 10},
		{name: 'Goal 7', weight: -20},
		{name: 'Goal 8', weight: -30},
		{name: 'Goal 9', weight: -20},
		{name: 'Goal 10', weight: -30},
		{name: 'Goal 11', weight: 40},
		{name: 'Goal 12', weight: 10},
		{name: 'Goal 13', weight: -20},
		{name: 'Goal 14', weight: -30},
		{name: 'Goal 15', weight: -20},
		{name: 'Goal 16', weight: 40},
		{name: 'Goal 17', weight: 10},
		{name: 'Goal 18', weight: -20},
		{name: 'Goal 19', weight: -30},
		{name: 'Goal 20', weight: 40},
		{name: 'Goal 21', weight: 40},
		{name: 'Goal 22', weight: 10},
		{name: 'Goal 23', weight: -20},
		{name: 'Goal 24', weight: -30},
		{name: 'Goal 25', weight: -20},
		{name: 'Goal 26', weight: -30},
		{name: 'Goal 27', weight: 40},
		{name: 'Goal 28', weight: 10},
		{name: 'Goal 29', weight: 20},
		{name: 'Goal 30', weight: 30},
		{name: 'Goal 31', weight: -20},
		{name: 'Goal 32', weight: -20},
		{name: 'Goal 33', weight: -20},
		{name: 'Goal 34', weight: -20},
		{name: 'Goal 35', weight: -20},
		{name: 'Goal 36', weight: -20},
		{name: 'Goal 37', weight: -20},
		{name: 'Goal 38', weight: -20},
		{name: 'Goal 39', weight: -20},
		{name: 'Goal 40', weight: -20},
		{name: 'Goal 41', weight: -20},
	]

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

	const	handleClick = () => {
		const	goal = getGoal(cells);
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

  function getGoal(cells) {
	const randWeight = Math.floor(Math.random() * cells.reduce((sum, cell) => sum + Math.abs(cell.weight), 0));
	var	weight = Math.abs(cells[0].weight);
	for (var i = 0; weight < randWeight; i++)
		weight += Math.abs(cells[i + 1].weight);
	console.log('rand index', i);
	return (i);
}
