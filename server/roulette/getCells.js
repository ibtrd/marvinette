const RANGE = "SOURCE!A2:F";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${RANGE}?key=${process.env.APIGOOGLE_KEY}`;

async function getCells() {
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
    }));
    return cells;
    
  } catch (error) {
    console.error("Error fetching google sheet:", error);
    return null; // Or handle error as needed
  }
}

module.exports = getCells;
