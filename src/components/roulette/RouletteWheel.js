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
				// reward={reward ? reward : undefined}
				index={index}
			/>
		))}
	  </animated.div>
	);
  }

