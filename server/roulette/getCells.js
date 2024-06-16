const RANGE = "SOURCE!B2:E";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${RANGE}?key=${process.env.APIGOOGLE_KEY}`;

async function getCells() {
  console.log('Fetch data from google sheet')
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cells = data.values.map((cell) => ({
      weight: parseInt(cell[0], 10),
      name: cell[1],
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
