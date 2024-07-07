const RANGE = "[PRIZES]!A2:D";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${RANGE}?key=${process.env.APIGOOGLE_KEY}`;

module.exports = async function getDefaultPrizes() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const prizes = data.values.map((row) => {
      return {
        id: row[0],
        category: row[1],
        title: row[2],
        message: row[3],
      };
    });
    return prizes;
  } catch (err) {
    console.error(err);
    return null;
  }
};
