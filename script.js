const startbtn = document.querySelector('.btnh');
const popup = document.querySelector('.popup');
const exitbtn = document.querySelector('.exit')
const main = document.querySelector('.main')
const continuebtn = document.querySelector('.continue')
const quizsection = document.querySelector('.quiz-section')
const quizcontainer = document.querySelector('.quiz-container')
const resultbox = document.querySelector('.result-box')
const tryagain = document.querySelector('.btn-try')
const homebtn = document.querySelector('.btn-home')

const totalQuestions = 10;


startbtn.onclick = () => {
    popup.classList.add('active');
    main.classList.add('active');
}

exitbtn.onclick = () => {
    popup.classList.remove('active');
    main.classList.remove('active');
}

continuebtn.onclick = () => {
    shuffleQuestions();
    questionCount = 0;
    showQuestions(questionCount);
    quizsection.classList.add('active');
    popup.classList.remove('active');
    main.classList.remove('active');
    quizcontainer.classList.add('active');
    questionCounter(1);
    headerScore();
}

tryagain.onclick = () => {
    quizcontainer.classList.add('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
    questionNumber=1;
    indexquestion = 1;
    userScore=0;
    
    shuffleQuestions();
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
}

homebtn.onclick = () => {
    quizsection.classList.remove('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
    questionNumber=1;
    indexquestion = 1;
    userScore=0;
    
    shuffleQuestions();
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
}

let questionCount = 0;
let questionNumber=1;
let userScore=0;
let shuffledQuestions = [];

const nextbtn = document.querySelector('.next-btn');
nextbtn.onclick = () => {
    questionCount++;
    if (questionCount < 10) {
        showQuestions(questionCount);
        questionNumber++;
        questionCounter(questionNumber);
        nextbtn.classList.remove('active');

       
    } else {
        // If all questions have been asked, reshuffle and start over
        console.log('zavrsena pitanja');
        showResultBox();
    }
}
let indexquestion=1;
const optionlist = document.querySelector('.options');

function shuffleQuestions() {
    shuffledQuestions = questions.slice(); 
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}


function showQuestions(index) {
    let showQuestion = document.querySelector('.question-text');
    showQuestion.textContent = `${indexquestion++}. ${shuffledQuestions[index].question}`;

    let optionTag = '';
    for (const option of shuffledQuestions[index].options) {
        optionTag += `<div class="option">${option}</div>`;
    }
    optionlist.innerHTML = optionTag;

    const option=document.querySelectorAll('.option')
    for(let i=0; i<option.length;i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');

    }
}

function optionSelected(answer){
    let userAnswer=answer.textContent;
    let correctAnswer = shuffledQuestions[questionCount].answer;
    let allOptions = optionlist.children.length;
    if (userAnswer==correctAnswer){
        console.log('tacno');
        answer.classList.add('correct');
        userScore+=1;
        headerScore();
    }
    else{
        console.log('netacno');
        answer.classList.add('incorrect');
        // Auto postavljam tacan
        for (let i = 0; i < allOptions; i++) {
            if (optionlist.children[i].textContent === correctAnswer) {
                optionlist.children[i].classList.add('correct');
            }
        }
        


    }

    //iskljucivanje svih opcija nakon izbora

    for(let i=0; i<allOptions;i++){
        optionlist.children[i].classList.add('disabled');
    }

    nextbtn.classList.add('active');

}

function questionCounter(index){
    const questionTotal=document.querySelector('.question-total');
    questionTotal.textContent=`${index} od 10`;
}

function headerScore(){
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent= `Rezultat ${userScore} / 10`
}

function showResultBox(){
    quizcontainer.classList.remove('active');
    resultbox.classList.add('active');

    const scoreText =document.querySelector('.score-text');
    scoreText.textContent=`Imate ${userScore} od 10`


    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    
    let progressStartValue = -1;
    let totalQuestions= 10;
    let progressEndValue = (userScore / totalQuestions) * 100;
    let speed = 20;
    
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(#020035 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
    

}