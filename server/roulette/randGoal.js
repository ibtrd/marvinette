
  function randGoal(cells) {
	const randWeight = Math.floor(Math.random() * cells.reduce((sum, cell) => sum + Math.abs(cell.weight), 0));
    var goal = 0;
    var	weight = Math.abs(cells[goal].weight);
    while (weight < randWeight)
    {
        weight += Math.abs(cells[goal + 1].weight);
        goal++;
    }
	return ({goal, description: cells[goal].description});
}

module.exports = randGoal;