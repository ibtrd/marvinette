const getCells = require('./getCells')

var rouletteCells = { cells: [], lastUpdate: Date.now()};
module.exports.rouletteCells = rouletteCells;

module.exports.rouletteInterval = async function rouletteInterval() {
	rouletteCells.cells = await getCells();
	setInterval(async () => {
		const cells =  await getCells();
		if (JSON.stringify(cells) !== JSON.stringify(rouletteCells.cells))
		{
			rouletteCells.cells = cells;
			rouletteCells.lastUpdate = Date.now();
			console.log(`Wheel updated:`, rouletteCells);
		}
	}, 30000)
}
