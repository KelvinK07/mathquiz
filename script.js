const problems = [
    {question: "What is 2 + 2?", options: ["3","4","5","6"], answer:1},
    {question: "What is 6 * 3?", options: ["16","18","21","12"], answer:1},
    {question: "What is 12 - 5?", options: ["6","8","7","9"], answer:2},
    {question: "What is 12 * 12?", options: ["122","132","134","144"], answer:3},
    {question: "What is 15 / 3?", options: ["5","6","7","8"], answer:0}
]

const questionText = document.getElementById("questionValue");
const scoreText = document.getElementById("scoreValue");
const options = document.getElementById('options');
const numOfQuestions = problems.length;

let qNumber = 0;
let currentQuiz;
let currentQuestion = '';
let score = 0;
let problem;
let optionButton;
let result;


// setTimeout(()=>{
//     screen.style.opacity = 1;
// },500);

// startButton.addEventListener('click', () =>{
//     screen.style.opacity = 0;
//     quizContainer.style.display = 'flex';
//     setTimeout(() =>{
//         quizContainer.style.opacity = 1;
//         screen.style.display = "none";
//     },1000)
// })

const loadProblem = (num) =>{
    problem = problems[num];
    console.log(problem);
    const correctAnswer = problem.options[problem.answer];
    currentQuestion = problem.question;
    questionText.textContent = currentQuestion;
    console.log(correctAnswer);
    questionText.innerHTML = problem.question;
    options.innerHTML = '';
    
    for(let i = 0 ; i < 4 ; i++){
        optionButton = document.createElement("button");
        optionButton.className =  'button';
        optionButton.textContent = problem.options[i];
        optionButton.onclick = () =>{
            checkAnswer(i);
        }
        options.appendChild(optionButton);
    }
};

const checkAnswer = (answer) =>{
    if (answer === problem.answer) {
        score++;
        scoreText.innerHTML = score;
        options.children[answer].classList.add("correctAnswer");
    } else {
        // console.log('Incorrect!');
        options.children[answer].classList.add('wrongAnswer');
    }
    disableChoices();
    setTimeout(() => {
        qNumber++;
        if(qNumber < numOfQuestions) {
            loadProblem(qNumber);
            enableChoices();
        } else {
            endQuiz();
        }
    }, 3000);
};

const disableChoices = () => {
    for (let i = 0; i < problem.options.length; i++) {
        options.children[i].disabled = true;
        options.children[i].classList.add('disabled');
    }
}

const enableChoices = () => {
    for (let i = 0; i < problem.options.length; i++) {
        options.children[i].disabled = false;
        options.children[i].classList.remove('disabled');
        options.children[i].classList.remove('correctAnswer');
        options.children[i].classList.remove('wrongAnswer');
    }
}

const endQuiz = () =>{
    result = score*20;
    questionText.textContent = `Your Final Result Is ${result}/100`;
    options.innerHTML = "" ;
}

loadProblem(qNumber);

