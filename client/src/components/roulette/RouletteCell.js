export default function RouletteCell({data, rotate, angle, ...props}) {

	const rad = angle / 2 * (Math.PI / 180);

	return (
		<div
			className='RouletteCell'
			style={{
				transform: `translateY(-50%) rotate(${rotate}deg)`,
				borderTop: `calc(sin(${rad}) * 22vw / cos(${rad})) solid transparent`,
				borderBottom: `calc(sin(${rad}) * 22vw / cos(${rad})) solid transparent`,
				borderRight: data.color ? `22vw solid ${data.color}` : ''
			}}
			{...props}
		>
			{data.img ? <img className="RouletteIcon" src={data.img} alt={'Icon for ' + data.name}/> : ''}
			<span
				className="RouletteCellBorder"
				style={{
					transform: `translateY(-50%) rotate(${angle/2}deg)`,
				}}
			/>
	  	</div>
	);
  }