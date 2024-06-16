import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated, useSpring, easings } from 'react-spring'
import getCells from "./getCells";

export default function Roulette() {

	// const googlecells = await getCells();
	// console.log(googlecells);
	const	cells = [
		{name: 'Goal 0', weigth: 40},
		{name: 'Goal 1', weigth: 10},
		{name: 'Goal 2', weigth: -20},
		{name: 'Goal 3', weigth: -30},
		{name: 'Goal 4', weigth: 40},
		{name: 'Goal 5', weigth: 40},
		{name: 'Goal 6', weigth: 10},
		{name: 'Goal 7', weigth: -20},
		{name: 'Goal 8', weigth: -30},
		{name: 'Goal 9', weigth: -20},
		{name: 'Goal 10', weigth: -30},
		{name: 'Goal 11', weigth: 40},
		{name: 'Goal 12', weigth: 10},
		{name: 'Goal 13', weigth: -20},
		{name: 'Goal 14', weigth: -30},
		{name: 'Goal 15', weigth: -20},
		{name: 'Goal 16', weigth: 40},
		{name: 'Goal 17', weigth: 10},
		{name: 'Goal 18', weigth: -20},
		{name: 'Goal 19', weigth: -30},
		{name: 'Goal 20', weigth: 40},
		{name: 'Goal 21', weigth: 40},
		{name: 'Goal 22', weigth: 10},
		{name: 'Goal 23', weigth: -20},
		{name: 'Goal 24', weigth: -30},
		{name: 'Goal 25', weigth: -20},
		{name: 'Goal 26', weigth: -30},
		{name: 'Goal 27', weigth: 40},
		{name: 'Goal 28', weigth: 10},
		{name: 'Goal 29', weigth: 20},
		{name: 'Goal 30', weigth: 30},
		{name: 'Goal 31', weigth: -20},
		{name: 'Goal 32', weigth: -20},
		{name: 'Goal 33', weigth: -20},
		{name: 'Goal 34', weigth: -20},
		{name: 'Goal 35', weigth: -20},
		{name: 'Goal 36', weigth: -20},
		{name: 'Goal 37', weigth: -20},
		{name: 'Goal 38', weigth: -20},
		{name: 'Goal 39', weigth: -20},
		{name: 'Goal 40', weigth: -20},
		{name: 'Goal 41', weigth: -20},
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
	const randWeight = Math.floor(Math.random() * cells.reduce((sum, cell) => sum + Math.abs(cell.weigth), 0));
	var	weight = Math.abs(cells[0].weigth);
	for (var i = 0; weight < randWeight; i++)
		weight += Math.abs(cells[i + 1].weigth);
	console.log('rand index', i);
	return (i);
}
