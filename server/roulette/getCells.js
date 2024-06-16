const RANGE = "SOURCE!B2:E";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${RANGE}?key=${process.env.APIGOOGLE_KEY}`;

async function getCells() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cells = data.values.map((cell) => ({
      name: cell[0],
      weight: parseInt(cell[1], 10),
      description: cell[2],
      img: cell[3],
    }));
    return cells;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or handle error as needed
  }
}

module.exports = getCells;
