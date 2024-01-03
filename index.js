import readlineSync from "readline-sync"; //Module for prompt interaction
import open from "open"; //Module for open an app or browser
import chalk from 'chalk'; //Module for color terminal

import startScraping from "./controllers/scrapingProcess.js";

import config from "./config.js";


const startApp = async () => {

    console.log(chalk.bold.cyanBright("\n|| Scraping a form ||"));
    console.log(chalk.bold.whiteBright("Demonstration of web scraping in Google Forms using random data"));
    console.log("(for demonstrative purposes) // https://github.com/Heladit000 \n\n");

    //--Define headless mode or exit prompt--
    let headlessMode = await readlineSync.keyInYN(
        "Preview the process in the Browser? ( press other key to exit )",
        { caseSensitive: false }
    )

    if (typeof headlessMode !== "boolean") {
        //Exit program
        console.log("See you!")
        process.exit(1);

    } else {
        await startScraping(headlessMode);
    }



    //--Define view answers or exit prompt--
    let viewAnswers = await readlineSync.keyInYN(
        "Open the table of answers in Google sheets to see the last answer? ( press other key to exit )",
        { caseSensitive: false }
    )

    if (typeof viewAnswers !== "boolean" || !viewAnswers) {
        //Exit program
        console.log("See you!")
        process.exit(1);
    } else {
        await open(config.tableOfAnswersLink, { wait: true });
        process.exit(1);
    }
}

startApp();



