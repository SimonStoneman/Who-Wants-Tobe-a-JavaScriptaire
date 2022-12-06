
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
questionsBlk.innerHTML = `
    <h2 id="question-title">${questions[currentQuestionIndex].question}</h2>
    <div id="choices" class="choices">
        <ul></ul>
 `;
var questionUL = questionsBlk.querySelector('ul');
var optionsArr = questions[currentQuestionIndex].options;

for (var option of optionsArr){
    questionUL.insertAdjacentHTML('beforeend', `<li>${option}</li>`)
} 

questionsBlk.addEventListener('click', function(event){
     var userAns = event.target.innerText;
     var correctAns = questionsList[currentQuestionIndex].answer;

     if (userAns == correctAns){
        console.log("Correct Answer");
     } else {
        console.log ("Wrong Answer");
     };
})