export default function RouletteCell({data, rotate, angle, ...props}) {

	const rad = angle / 2 * (Math.PI / 180);

	return (
		<div
			className='RouletteCell'
			style={{
				transform: `translateY(-50%) rotate(${rotate}deg)`,
				borderTop: `calc(sin(${rad}) * 40vh / cos(${rad})) solid transparent`,
				borderBottom: `calc(sin(${rad}) * 40vh / cos(${rad})) solid transparent`,

			}}
			{...props}
		>
			<div className='RouletteCellText'>
				{data.name}
			</div>
	  	</div>
	);
  }