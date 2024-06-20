import { easings, useSpring } from "react-spring";
import { useError } from "./useError";
import { useContext, useState } from "react";
import { WheelContext } from "../contexts/WheelContext";


export const useSpin = () => {

	const { setReward, goal, cells } = useContext(WheelContext);
	
	const getRandomDuration = (min, max) => {
		return getRandom(min, max) * 1000;
	}

	const getRandom = (min, max) => {
		return (Math.random() * (max - min) + min);
	}
	
	const randomStart = getRandom(0, 360);

	const	{ showSuccess } = useError();

	const [annimation, annimationApi] = useSpring(() => ({
		from: { rotate: randomStart },
	}));

	const wheelSpin = () => {
		console.log(goal)
		setReward(null);
		annimationApi.start({
			from: {
				rotate: randomStart,
			},
			to: {
				rotate: 360 * 10 + (360 - (360/cells.length) * goal.goal) + getRandom((-360/cells.length)/2.5, (360/cells.length)/2.5),
			},
			config: {
				duration: getRandomDuration(10, 15),
				easing: easings.easeOutCubic,
			},
			onRest: () => {
				setReward(goal)
				showSuccess("Congratulations!")
			},
		})
	}

	return { annimation, wheelSpin };
};