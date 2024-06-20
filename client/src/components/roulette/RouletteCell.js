import { useContext, useEffect } from "react";
import { useSpring, animated, easings } from "react-spring";
import { usePrize } from "../../hooks/usePrize";
import { WheelContext } from "../../contexts/WheelContext";

export default function RouletteCell({data, rotate, angle, size, index, ...props}) {

	const { reward } = useContext(WheelContext);
	const { annimation, togglePrize } = usePrize();

	const rad = angle / 2 * (Math.PI / 180);

	useEffect(() => {
		togglePrize()
	}, [reward]);

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
			{reward && reward.goal === index ?
				<animated.span
					className="RouletteCellReward"
					style={{
						transform: `translateY(-50%)`,
						borderTop: `calc(sin(${rad}) * (${size} / 1.8) / cos(${rad})) solid transparent`,
						borderBottom: `calc(sin(${rad}) * (${size} / 1.8) / cos(${rad})) solid transparent`,
						borderRight: `calc(${size} / 1.8) solid white`,
						...annimation
					}}
				/> : ''}
	  	</div>
	);
  }