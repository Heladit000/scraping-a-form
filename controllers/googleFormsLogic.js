const writeInInputQuestion = async (page, questionTitle, answer) => {

    //----The next logic is designed to write in input with the tag logic reference that uses google forms----


    //get the span element that contain the title of the question
    const questionSpanName = await page.waitForSelector(`span::-p-text(${questionTitle})`);

    //get the parent of title that contains the "question id" marked with i(questionNumber). example i1, i2, i3.
    const questionId = await questionSpanName?.evaluate(element => element.parentNode.id);

    //every input have the aria-labelledby attribute that contains the "question id" same that the id of the parent of span title
    //this allows to select the correct input and write the answer in it
    await page.locator(`input[aria-labelledby="${questionId}"]`).fill(`${answer}`);

    //---------------------------------------------------------------------------------------------------------
}

const selectBooleanQuestion = async (page, questionTitle, answer) => {

    //----The next logic is designed to select boolean question with the tag logic reference that uses google forms----


    //get the span element that contain the title of the question
    const questionSpanName = await page.waitForSelector(`span::-p-text(${questionTitle})`);

    //get the parent of title that contains the "question id" marked with i(questionNumber). example i1, i2, i3.
    const questionId = await questionSpanName?.evaluate(element => element.parentNode.id);

    //every container of answers spans have the aria-labelledby attribute that contains the "question id" same that the id of the parent of span title
    //select the span that contains the text of answer using the container id to choose the option in correct question
    await page.locator(`div[aria-labelledby="${questionId}"] span::-p-text(${answer ? "yes" : "no"})`).click();

    //------------------------------------------------------------------------------------------------------------------
}

const clickSendButton = async (page) => {

    //----The next logic is for click the send button----

    //the send button of google form have the (data-should-execute-invisible-captcha-challenge="false") attribute
    //this because the send word can be in different languages
    await page.locator(`div[data-should-execute-invisible-captcha-challenge="false"] span:first-child`).click()

    //----------------------------------------------------
}


export {
    writeInInputQuestion,
    selectBooleanQuestion,
    clickSendButton
}