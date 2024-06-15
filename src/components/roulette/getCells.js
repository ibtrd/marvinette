const RANGE = "SOURCE!A2:B";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values/${RANGE}?key=${process.env.REACT_APP_APIGOOGLE_KEY}`;

async function getCells() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cells = data.values.map((cell) => ({
      name: cell[0],
      weight: parseInt(cell[1], 10),
    }));
    console.log("fromfunc", cells);
    return cells;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or handle error as needed
  }
}

module.exports = getCells;
