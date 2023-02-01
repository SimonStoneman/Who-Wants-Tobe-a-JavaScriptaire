
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
var stdDeducVal = 1;
var badansDeducVal = 10;
var startScreenBlk = document.querySelector('#start-screen');
var questionsBlk= document.querySelector('#questions');
var feedbackBlk = document.querySelector('#feedback');
var endScreen = document.querySelector('#end-screen');
var questionsListLgth = questionsList.length;
var currentTime = 0;
var currentQuestionIndex = 0;
var currentQuestion = questionsList[currentQuestionIndex];
var questionUL = '';
var choicesClickCnt = 0;
var introClickCnt = 1;


//Sounds Vars Start

var soundCnt = 1;
var sound = '';

const soundsPath = 'assets/sfx/';
const introSnd = 'maintheme.mp3';
const startSnd = 'letsplay.mp3';
const correctAnsSnd = 'correctanswer.mp3';
const wrongAnsSnd = 'wronganswer.mp3';

//Sounds Vars Start

////////////Global Vars End


////////////Functions Start


//Function to add the question, choices and detect user input
function addQuestion () {
    //Insert Question from Questions array (questions.js)

    // console.log (questionsBlk);
    
    currentQuestion = questionsList[currentQuestionIndex];

    //var currentQuestion = currentQ[currentQuestionIndex].question
    var questionsBlkHeader = questionsBlk.querySelector('#question-title')

    var currentQuestionName = currentQuestion.question

    // console.log (questionsBlkHeader);

    //Set inner text to current question name
    questionsBlkHeader.innerText = `${currentQuestionName}`;


    //Add ul after div with id choices 
    var ulEl = document.createElement('ul')
    var questionChoicesEl = questionsBlk.querySelector('#choices');

    // console.log (questionChoicesEl);
    
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

        timerStart = timerStart - stdDeducVal;

        if (timerStart == 0) {
            window.location = './highscores.html';
            clearInterval(currentTime);
        }
    }, 1000);

};

function deductTimer () {

        var timeEl = document.querySelector('#time')

        timerStart = timerStart - badansDeducVal;

        timeEl.innerText = timerStart;
        
};

function soundOutputnControl(action, type) {

    switch (type) {
        case 'intro':
                        if (soundCnt === 1) {
                            console.log(`first play ${type}`)
                            sound = new Audio(soundsPath + introSnd);
                            soundCnt++
                        }
                        break;
        case 'start':
                        sound = new Audio(soundsPath + startSnd);
                        break;
        case 'correct':
                        sound = new Audio(soundsPath + correctAnsSnd);
                        break;
        case 'wrong':
                        sound = new Audio(soundsPath + wrongAnsSnd);
                        break;
    };

    if (action === 'play') {
        console.log(`play audio (${type})`);
        sound.play();
    } else {
        console.log(`pause audio (${type})`);
        sound.pause();
    };
};

//Functions End

//Main Start

var htmlTimerVal = document.querySelector('#time');

//Set timer value to start value
htmlTimerVal.innerText = timerStart;
currentTime = timerStart;

document.querySelector('html').addEventListener('click', function() {
    console.log(introClickCnt);
    if (introClickCnt === 1) {
        soundOutputnControl('play', 'intro');
        introClickCnt++;
    }
});

// Action a click event in the startscreenblk for start button
startScreenBlk.addEventListener('click', function (event){
    buttonPress = event.target.tagName;
    //DEBUG: console.log('Element selected is: ' + buttonPress);

    // console.log('currentQuestionIndex in startblk: ' + currentQuestionIndex);

    if (buttonPress === 'BUTTON'){
        //DEBUG: console.log('Button pressed!!!')
        soundOutputnControl('stop', 'intro');
        soundOutputnControl('play', 'start');
        countDown();
        //while ( currentTime > 0 ) {
        hideHtml(startScreenBlk);
        addQuestion();
    };
});

// console.log (questionsBlk);

questionsBlk.querySelector('#choices').addEventListener ('click', function(event) {
        var userAnsRaw = event.target.innerText;
        var userAns = userAnsRaw.substr(3,);
        var correctAns = currentQuestion.answer;

        // console.log(userAns);
        // console.log(correctAns);
        // console.log('currentQuestionIndex in qblk: ' + currentQuestionIndex);
        if (choicesClickCnt === 0) {
            choicesClickCnt = 1;
        } else{
            choicesClickCnt++;
        };
        
        console.log(`choicesClickCnt value on initalising: ${choicesClickCnt}`);

        if (choicesClickCnt === 1) {

            console.log(`Passed through choicesClickCnt check, ${choicesClickCnt}`);


            // Check if the users answer matches the correct answer from current question
            if (userAns == correctAns){

                soundOutputnControl('play', 'correct');

                console.log("Correct Answer");
                // Show the feedback block (tag) below the list of answers, by removing the .hide from the class list
                showHtml(feedbackBlk);
                // Add a new html block (for the result) below the feedback div tag
                feedbackBlk.insertAdjacentHTML('beforeend', `<h2>CORRECT!!!</h2>`)
  
                currentQuestionIndex++;
                
            } else {
                
                // console.log ("Wrong Answer");

                // As the wrong answer has been selected we need to create a penalty by deducting the time count by 10 seconds
                deductTimer()

                soundOutputnControl('play', 'wrong');

                // Display the feedback area
                showHtml(feedbackBlk);

                // Add the feedback for the user selected answer to the feedback block
                feedbackBlk.insertAdjacentHTML('beforeend', `<h2>WRONG!!!</h2>`)
                
                // Increase the question index to move to the next question and answer data
                currentQuestionIndex++;

            };

            // use a timeout func to wrap around items that clear the screen ready for the new question
            setTimeout(()=> {
        
                if (currentQuestionIndex < questionsListLgth) {
                    
                    // Create short target for selection of h2 tag under feedbackblock html section
                    var h2El = feedbackBlk.querySelector('h2');
                    
                    // Screen clear down function calls and add new question title
                        // Remove the h2 element from the feedback area
                        removeHtmlEl(h2El);
                        // Remove the choices elements from the choices area
                        removeHtmlEl(questionUL);
                        // Add the new question title to the page
                        addQuestion();
                    
                } else {
                    // as we have got to the end of the questions, we need to change the window object location to the highscores page
                    window.location = './highscores.html'
                };

                choicesClickCnt = 0;
            }, 500);
        };
});


 
//Main End