const getCells = require('./getCells')
const md5 = require('js-md5');

var rouletteCells = { cells: [], hash: ""};
module.exports.rouletteCells = rouletteCells;

module.exports.rouletteInterval = async function rouletteInterval() {
	rouletteCells.cells = await getCells();
	rouletteCells.hash = getRouletteSoftHash(rouletteCells.cells);
	rouletteCells.witness = getRouletteHardHash(rouletteCells.cells);
	setInterval(async () => {
		const cells =  await getCells();
		const hash = getRouletteSoftHash(cells);
		const witness = getRouletteHardHash(cells);
		if (witness !== rouletteCells.witness)
		{
			rouletteCells.cells = cells;
			rouletteCells.hash = hash;
			rouletteCells.witness = witness;
			console.log('WHEEL UPDATE');
		}
	}, 3000)
}

function getRouletteSoftHash(cells) {
	var dup = structuredClone(cells);
	dup.forEach(element => {
		delete element.weight;
	});
	return md5(JSON.stringify(dup));
}

function getRouletteHardHash(cells) {
	return md5(JSON.stringify(cells));
}
