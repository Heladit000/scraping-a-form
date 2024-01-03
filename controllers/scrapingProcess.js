import puppeteer from "puppeteer";

import generateSubject from "./generateSubject.js";
import showSpinnerProcess from "./showSpinnerProcess.js";
import { writeInInputQuestion, selectBooleanQuestion, clickSendButton } from "./googleFormsLogic.js";

import config from "../config.js";
import chalk from "chalk";


const startScraping = async (PreviewProcess) => {

    const subject = await generateSubject();

    console.log(chalk.green("\n\ngenerated subject:"));
    console.table(subject);
    console.log("\n");

    //opening browser
    const browser = await showSpinnerProcess("launching browser", "browser launched",
        puppeteer.launch({ headless: PreviewProcess ? false : "new" })
    )
    
    //new blank page
    const page = await showSpinnerProcess("opening new page", "blank page opened",
        browser.newPage()
    )


    //going to the form
    await showSpinnerProcess("opening the example form", "form opened",
        page.goto(config.googleFormsLink)
    )


    //Answer first name
    await showSpinnerProcess("answering first name", "first name answered",
        writeInInputQuestion(page, "First name", subject.firstName)
    )
    //Answer last name
    await showSpinnerProcess("answering last name", "last name answered",
        writeInInputQuestion(page, "Last name", subject.lastName)
    )
    //Answer age
    await showSpinnerProcess("answering age", "age answered",
        writeInInputQuestion(page, "Age", subject.age)
    )
    //Answer email
    await showSpinnerProcess("answering email", "email answered",
        writeInInputQuestion(page, "Email", subject.email)
    )
    //Answer have credit card
    await showSpinnerProcess("answering have credit card", "have credit card answered",
        selectBooleanQuestion(page, "Have credit card?", subject.haveCreditCard)
    )


    //send form
    await showSpinnerProcess("sending form", "form submitted",
        clickSendButton(page)
    )

    console.log(chalk.bold.yellowBright("The scraping process is finished! \n\n"));

}

export default startScraping