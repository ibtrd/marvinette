import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated } from 'react-spring'
import { useContext, useEffect } from "react";
import { WheelContext } from "../../contexts/WheelContext";
import { useSpin } from "../../hooks/useSpin";

export default function RouletteWheel({size}) {

	const { cells, getGoal, goal, reward } = useContext(WheelContext);
	const { wheelSpin, annimation } = useSpin();

	useEffect(() => {
		if (goal)
			wheelSpin()
	}, [goal]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			 const key = e.key;
			 console.log(key)
			 console.log(goal)
			 if ((goal === null ) && key === ' ')
				getGoal()
		};
		document.addEventListener('keydown', handleKeyDown, true);
	
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	
	}, []);


	return (
	  <animated.div
	  	className='RouletteWheel'
		style={{...annimation}}
		onClick={() => getGoal()}
	  >
		{cells.map((cell, index) => (
			<RouletteCell
				size={size}
				key={index}
				data={cell}
				rotate={360/cells.length * index}
				angle={360/cells.length}
				// reward={reward ? reward : undefined}
				index={index}
			/>
		))}
	  </animated.div>
	);
  }

