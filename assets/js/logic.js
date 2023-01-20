
//when 'Start Quiz' button clicked game starts
    //Start Screen disappears
    //Timer Starts
    //Screen replaced with question and multi choice answers with space to show if correct or not
    //User interaction captured
    //User choice evaluated with correct answer
    //Message shown if correct or not (below mult-choice list)
    //timer de-ducted if wrong or left if correct
    //Check timer val
    //Issue new question
    //On completion show highscore page

    //CONDITIONS
    //if answer is correct move to next question
    //if answer in incorrect doc timer of x secs and move to next question
    //if timer runs out end the quiz and display the highscore page

////////////Global Vars Start
var timerStart = 100;
var wrongAnsDeduc = 10;
var startScreenBlk = document.querySelector('#start-screen');
var questionsBlk= document.querySelector('#questions');
var feedbackBlk = document.querySelector('#feedback');
var endScreen = document.querySelector('#end-screen');
var questionsListLgth = questionsList.length;
var currentTime = 0;
var currentQuestionIndex = 0;
var currentQuestion = questionsList[currentQuestionIndex];
var questionUL = '';
////////////Global Vars End


////////////Functions Start


//Function to add the question, choices and detect user input
function addQuestion () {
    //Insert Question from Questions array (questions.js)

    console.log (questionsBlk);
    
    currentQuestion = questionsList[currentQuestionIndex];

    //var currentQuestion = currentQ[currentQuestionIndex].question
    var questionsBlkHeader = questionsBlk.querySelector('#question-title')

    var currentQuestionName = currentQuestion.question

    console.log (questionsBlkHeader);
    //Set inner text to current question name
    questionsBlkHeader.innerText = `${currentQuestionName}`;


    //Add ul after div with id choices 
    var ulEl = document.createElement('ul')
    var questionChoicesEl = questionsBlk.querySelector('#choices');

    console.log (questionChoicesEl);
    
    questionChoicesEl.appendChild(ulEl);

    //Set readable value to reference ul object
    questionUL = questionChoicesEl.querySelector('ul');
    //Set readable value to reference current question options array
    var optionsArr = currentQuestion.options;

    //for loop to iter through each element in optionsArr and inset as a list item in the unordered list
    var optionCnt = 1
    for (var option of optionsArr){
        questionUL.insertAdjacentHTML('beforeend', `<button>${optionCnt}. ${option}</button>`);
        optionCnt++;
    } 

    showHtml(questionsBlk);

    //event handler to detect user intraction with multi-options under questionsBlk (tag with id #questions), taking avantage of event bubbling (Propergation)
        // questionsBlk.addEventListener ('click', function(event) {
        //     var userAnsRaw = event.target.innerText;
        //     var userAns = userAnsRaw.substr(3,);
        //     var correctAns = currentQuestion.answer;

        //     console.log(userAns);
        //     console.log(correctAns);

        //     if (userAns == correctAns){
        //         console.log("Correct Answer");
        //         showHtml(feedbackBlk);
        //         feedbackBlk.insertAdjacentHTML('beforeend', `<h2>CORRECT!!!</h2>`)
        //         delay();
        //         currentQuestionIndex++;
        //         if (currentQuestionIndex < questionsListLgth) {
        //             var h2El = feedbackBlk.querySelector('h2');
        //             console.log('h2El is: ' + h2El);
        //             removeHtmlEl(h2El);
        //             removeHtmlEl(questionUL);
        //         }
        //     } else {
        //         console.log ("Wrong Answer");
        //         showHtml(feedbackBlk);
        //         feedbackBlk.insertAdjacentHTML('beforeend', `<h2>WRONG!!!</h2>`)
        //         delay();
        //         currentQuestionIndex++;
        //         if (currentQuestionIndex < questionsListLgth) {
        //             var h2El = feedbackBlk.querySelector('h2');
        //             removeHtmlEl(h2El);
        //             removeHtmlEl(questionUL);
        //         }
        //     };
        // })
};

function hideHtml (htag) {
    let htagToHide = htag;
    htagToHide.classList.add('hide')
};

// Changed the class list to remove the static .hide class from the passed in tag
function showHtml (htag) {
    let htagToShow = htag;
    htagToShow.classList.remove('hide')
};

function removeHtmlEl(htag){
    var htagToDel = htag;
    htagToDel.remove()
}

function countDown () {
    currentTime = setInterval(function () {
        var timeEl = document.querySelector('#time')
        
        timeEl.innerText = timerStart;
        timerStart = timerStart - wrongAnsDeduc;

        if (timerStart < 0) {
            clearInterval(currentTime)
        }
    }, 1000);
};

function delay (){
    setInterval(function () {},1000);
};

//Functions End

//Main Start

var htmlTimerVal = document.querySelector('#time');

//Set timer value to start value
htmlTimerVal.innerText = timerStart;
currentTime = timerStart;


startScreenBlk.addEventListener('click', function (event){
    buttonPress = event.target.tagName;
    //DEBUG: console.log('Element selected is: ' + buttonPress);

    console.log('currentQuestionIndex in startblk: ' + currentQuestionIndex);

    if (buttonPress === 'BUTTON'){
        //DEBUG: console.log('Button pressed!!!')
        countDown();
        //while ( currentTime > 0 ) {
        hideHtml(startScreenBlk);
        addQuestion();
    }
})

console.log (questionsBlk);

questionsBlk.addEventListener ('click', function(event) {
        var userAnsRaw = event.target.innerText;
        var userAns = userAnsRaw.substr(3,);
        var correctAns = currentQuestion.answer;

        console.log(userAns);
        console.log(correctAns);
        console.log('currentQuestionIndex in qblk: ' + currentQuestionIndex);

        // Check if the users answer matches the correct answer from current question
        if (userAns == correctAns){
            console.log("Correct Answer");
            // Show the feedback block (tag) below the list of answers, by removing the .hide from the class list
            showHtml(feedbackBlk);
            // Add a new html block (for the result) below the feedback div tag
            feedbackBlk.insertAdjacentHTML('beforeend', `<h2>CORRECT!!!</h2>`)
            // delay();
            currentQuestionIndex++;
            // if (currentQuestionIndex < questionsListLgth) {
            //     var h2El = feedbackBlk.querySelector('h2');
            //     console.log('h2El is: ' + h2El);
            //     removeHtmlEl(h2El);
            //     removeHtmlEl(questionUL);
            //     addQuestion();
            // }
            
        } else {
            console.log ("Wrong Answer");
            showHtml(feedbackBlk);
            feedbackBlk.insertAdjacentHTML('beforeend', `<h2>WRONG!!!</h2>`)
            // delay();
            currentQuestionIndex++;
            // if (currentQuestionIndex < questionsListLgth) {
            //     var h2El = feedbackBlk.querySelector('h2');
            //     removeHtmlEl(h2El);
            //     removeHtmlEl(questionUL);
            //     addQuestion();
            // }
        };

        // use a timeout func to wrap around items that clear the screen ready for the new question
        setTimeout(()=> {
    
            if (currentQuestionIndex < questionsListLgth) {
                var h2El = feedbackBlk.querySelector('h2');
                removeHtmlEl(h2El);
                removeHtmlEl(questionUL);
                addQuestion();
            }

        }, 1000);

    })



 
//Main End