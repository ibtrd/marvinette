const getCells = require('./getCells')
const md5 = require('js-md5');

var rouletteCells = { cells: [], hash: ""};
module.exports.rouletteCells = rouletteCells;

module.exports.rouletteInterval = async function rouletteInterval() {
	rouletteCells.cells = await getCells();
	setInterval(async () => {
		const cells =  await getCells();
		const hash = md5(JSON.stringify(cells));
		if (hash !== rouletteCells.hash)
		{
			rouletteCells.cells = cells;
			rouletteCells.hash = hash; 
			console.log(`Wheel updated:`, rouletteCells);
		}
	}, 5000)
}
