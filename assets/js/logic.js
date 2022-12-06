
//when 'Start Quiz' button clicked game starts
    //Start Screen disappears
    //Replaced with question and multi choice answers with space to show if correct or not

    //CONDITIONS
    //if answer is correct move to next question
    //if answer in incorrect doc timer of x secs and move to next question
    //if timer runs out end the quiz and display the highscore page

var currentQuestionIndex = 0;

var startScreen = document.querySelector('#start-screen');
var questionsBlk = document.querySelector('#questions');
var endScreen = document.querySelector('#end-screen');

//Insert Question from Questions array (questions.js)
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
    questionUL.insertAdjacentHTML('beforeend', `<li>${option}</li>`)
} 

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