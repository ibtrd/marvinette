require("dotenv").config();

const getCells = require("../../server/roulette/getCells");
const randGoal = require("../../server/roulette/randGoal");
const initSettings = require("../../server/settings/initSettings");
const mongoose = require('mongoose');


const total = 5000000;

async function main() {

    await mongoose.connect(process.env.MONGO_URI)
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
    await initSettings();
    if (!process.env.SPREADSHEET_ID || !process.env.APIGOOGLE_KEY) {
        console.error("Missing .env");
        process.exit(1);
    }


    console.log(`Simulating ${total} spins`)
    const wheel = await getCells();
    const results = []
    wheel.forEach((element) => {
        if (results.find((cell) => cell.cell === element.name) === undefined) {
            results.push({ cell: element.name, count: 0 });
        }
    });

    for (let i = 0; i < total; i++) {
        const goal = wheel[randGoal(wheel)].name;
        let target = results.find(element => element.cell === goal)
        target.count++;
    }

    results.sort((a, b) => b.count - a.count);
    results.forEach(element => {
        const percentage = ((element.count / total) * 100).toFixed(2);
        console.log(`${percentage.padStart(6, " ")}% - ${element.cell} (${element.count})`);
    })

    mongoose.connection.close();
}

main();
