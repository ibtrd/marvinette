import { easings, useSpring } from "react-spring";
import { useContext, useState } from "react";
import { WheelContext } from "../contexts/WheelContext";
import { Howl } from 'howler';


export const useSpin = () => {

	const { setReward, goal, cells } = useContext(WheelContext);
	
	const getRandomDuration = (min, max) => {
		return getRandom(min, max) * 1000;
	}

	const getRandom = (min, max) => {
		return (Math.random() * (max - min) + min);
	}
	
	const [randomStart, setRandomStart] = useState(getRandom(0, 360));

	const [annimation, annimationApi] = useSpring(() => ({
		from: { rotate: randomStart },
	}));

	// const tick = new Howl({
	// 	src: ['/sounds/tick.mp3']
	// });
	  
	// var lastCell = 0;
	const wheelSpin = () => {
		annimationApi.start({
			from: {
				rotate: randomStart,
			},
			to: {
				rotate: 360 * 7 + (360 - (360/cells.length) * goal.goal) + getRandom((-360/cells.length)/2.5, (360/cells.length)/2.5),
			},
			config: {
				duration: getRandomDuration(10, 15),
				easing: easings.easeOutCubic,
			},
			onRest: () => {
				setRandomStart(annimation.rotate.get() % 360);
				setReward(goal);
			},
			// onChange: (result) => {
			// 	const cell = Math.floor((result.value.rotate + ((360 / cells.length) / 2)) / (360 / cells.length));
			// 	if (cell !== lastCell) {
			// 		tick.play();
			// 		lastCell = cell;
			// 	}
			// }
		})
	}

	return { annimation, wheelSpin };
};