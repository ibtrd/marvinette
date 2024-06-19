import { useEffect } from "react";
import { useSpring, animated, easings } from "react-spring";

export default function RouletteCell({data, rotate, angle, size, reward, index, ...props}) {

	const rad = angle / 2 * (Math.PI / 180);

	useEffect(() => {
		if (reward && reward.goal === index)
		{
			rewardApi.start({
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
		}
		else {
			rewardApi.stop()
		}
		// else if (reward)
		// {
		// 	rewardApi.start({
		// 		from: {
		// 			opacity: 0,
		// 		},
		// 		to: {
		// 			opacity: 0.8
		// 		},
		// 		config: {
		// 			duration: 1000
		// 		},
		// 	})
		// }
	}, [reward])

	const [rewardAnnimation, rewardApi] = useSpring(() => ({
		from: { opacity: 0 },
	}))

	return (
		<div
			className='RouletteCell'
			style={{
				transform: `translateY(-50%) rotate(${rotate}deg)`,
				borderTop: `calc(sin(${rad}) * (${size} / 1.8) / cos(${rad})) solid transparent`,
				borderBottom: `calc(sin(${rad}) * (${size} / 1.8) / cos(${rad})) solid transparent`,
				borderRight: data.color ? `calc(${size} / 1.8) solid ${data.color}` : '',
			}}
			{...props}
		>
			{data.img ? <img className="RouletteIcon" src={data.img} alt={data.alt}
				style={{
					left: `calc(${size} / 2 / 1.3)`,
					height: `calc((sin(${rad}) * (${size} / 1.8) / cos(${rad}) / 1.2))`
				}}
			/> : ''}
			<span
				className="RouletteCellBorder"
				style={{
					transform: `translateY(-50%) rotate(${angle/2}deg)`,
					width: `calc(${size} / 1.8)`
				}}
			/>
			<animated.span
				className="RouletteCellReward"
				style={{
					transform: `translateY(-50%)`,
					borderTop: `calc(sin(${rad}) * (${size} / 1.8) / cos(${rad})) solid transparent`,
					borderBottom: `calc(sin(${rad}) * (${size} / 1.8) / cos(${rad})) solid transparent`,
					borderRight: `calc(${size} / 1.8) solid ${reward && reward.goal === index ? 'white' : 'white'}`,
					...rewardAnnimation
				}}
			/> 
	  	</div>
	);
  }