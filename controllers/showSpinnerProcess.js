import ora from 'ora'; //module for show loading processes in cli
import chalk from 'chalk'; //Module for color terminal

const showSpinnerProcess = async (loadingText, completeText, callback) => {

    //process loading texts
    const spinner = ora({ spinner: "dots" });
    spinner.color = "green";

    //show loading spinner
    spinner.text = loadingText;
    spinner.start();

    //get the result of the process
    const result = await callback;

    //show completed process
    spinner.succeed(chalk.green(completeText));

    return result;
}

export default showSpinnerProcess