
  module.exports =  function randGoal(cells) {
    const randWeight = Math.floor(
      Math.random() *
        cells.reduce((sum, cell) => sum + cell.weight, 0)
    );
    var goal = 0;
    var weight = cells[goal].weight;
    while (weight < randWeight) {
      weight += cells[goal + 1].weight;
      goal++;
    }
    return goal;
    return { goal, description: cells[goal].description };
  };
