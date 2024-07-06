import RouletteCell from "./RouletteCell";
import './Roulette.css'
import { animated } from 'react-spring'
import { useContext, useEffect } from "react";
import { WheelContext } from "../../contexts/WheelContext";
import { useSpin } from "../../hooks/useSpin";

export default function RouletteWheel({size}) {

	const { cells, getGoal, goal } = useContext(WheelContext);
	const { wheelSpin, annimation } = useSpin();

	useEffect(() => {
		if (goal)
			wheelSpin()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goal]);

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
				index={index}
			/>
		))}
	  </animated.div>
	);
  }

