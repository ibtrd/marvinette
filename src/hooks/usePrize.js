import { useSpring } from "react-spring";

export const usePrize = () => {
	
	const [annimation, annimationApi] = useSpring(() => ({
		from: { opacity: 0 },
	}));

	const togglePrize = (reward) => {
		if (reward)
			annimationApi.start({
				from: {
					opacity: 0,
				},
				to: [
					{opacity: 0.4},
					{opacity: 0}
				],
				config: {
					duration: 500
				},
				loop: true,
			})
		else
			annimationApi.stop();
	}

	return { annimation, togglePrize };
};