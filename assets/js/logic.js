
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
var currentTime = 0;
////////////Global Vars End


////////////Functions Start


//Function to add the question, choices and detect user input
function addQuestion () {
    //Insert Question from Questions array (questions.js)
    var currentQuestionIndex = 0;

    var startScreen = document.querySelector('#start-screen');
    var questionsBlk = document.querySelector('#questions');
    var endScreen = document.querySelector('#end-screen');

    var currentQuestion = questionsList[currentQuestionIndex].question
    questionsBlk.innerHTML = `
        <h2 id="question-title">${currentQuestion}</h2>
        <div id="choices" class="choices">
            <ul></ul>
    `;

    //Set readable value to reference ul object
    var questionUL = questionsBlk.querySelector('ul');
    //Set readable value to reference current question options array
    var optionsArr = questionsList[currentQuestionIndex].options;

    //for loop to iter through each element in optionsArr and inset as a list item in the unordered list
    for (var option of optionsArr){
        questionUL.insertAdjacentHTML('beforeend', `<button><li>${option}</li></button>`)
    } 

    showHtml(questionsBlk);

    //event handler to detect user intraction with multi-options under questionsBlk (tag with id #questions), taking avantage of event bubbling (Propergation)
    questionsBlk.addEventListener('click', function(event){
        var userAns = event.target.innerText;
        var correctAns = questionsList[currentQuestionIndex].answer;

        if (userAns == correctAns){
            console.log("Correct Answer");
        } else {
            console.log ("Wrong Answer");
        };
    })

};

function hideHtml (htag) {
    let htagToHide = htag;
    htagToHide.classList.add('hide')
};

function showHtml (htag) {
    let htagToShow = htag;
    htagToShow.classList.remove('hide')
};

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

//Functions End

//Main Start

var htmlTimerVal = document.querySelector('#time');

//Set timer value to start value
htmlTimerVal.innerText = timerStart;
currentTime = timerStart;

startScreenBlk.addEventListener('click', function (event){
    buttonPress = event.target.tagName;
    //DEBUG: console.log('Element selected is: ' + buttonPress);
    if (buttonPress === 'BUTTON'){
        //DEBUG: console.log('Button pressed!!!')
        countDown();
        //while ( currentTime > 0 ) {
            hideHtml(startScreenBlk);
            addQuestion();
        //}
    }
})



 
//Main End