const Settings = require("../mongo_models/Settings");

async function getCells() {
  
  const sheetName = await Settings.findOne({ key: "sheetName" });
  const RANGE = sheetName.value + "!A2:O";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${RANGE}?key=${process.env.APIGOOGLE_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cells = data.values.map((cell) => ({
      name: cell[0],
      weight: parseInt(cell[1], 10),
      img: cell[2],
      alt: cell[3],
      color: cell[4],
      description: cell[5],
      particles: cell[6],
      reward: {
        coalitionPoints: cell[7],
        coalitionTo: cell[8],
        evaluationPoint: cell[9],
        intraTag: cell[10],
        altarianDollar: cell[11],
        peperotig: cell[12],
        achievement: cell[13],
        intraLog: cell[14]
      }
    }));
    return cells;
    
  } catch (error) {
    console.error("No data found in the Google Sheet named " + sheetName.value);
    return [];
  }
}

module.exports = getCells;
