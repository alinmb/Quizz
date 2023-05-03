const questions = [
    {
        question: "En quelle année l'OM a remporté son premier titre de champion de France de Ligue 1 ?",
        answer: [
            { text: "1939", correct: false},
            { text: "2002", correct: false},
            { text: "1929", correct: true},
            { text: "1855", correct: false},
        ]
    },
    {
        question: "En quelle année l'Olympique de Marseille, descendant du Football Club de Marseille a été fondé ?",
        answer: [
            { text: "20 Septembre 1979", correct: false},
            { text: "15 Janvier 1889", correct: false},
            { text: "4 Novembre 1994", correct: false},
            { text: "31 Août 1899", correct: true},
        ]
    },
    {
        question: "Qui a fondé l'Olympique de Marseille ? ",
        answer: [
            { text: "Pape Diouf", correct: false},
            { text: "Réné Dufaure de Montmirail", correct: true},
            { text: "Jean-Michel Aulas", correct: false},
            { text: "Pierre Faure", correct: false},
        ] 
    },
    {
        question: "Quel slogan est associé au club de foot de l’OM ?",
        answer: [
            { text: "On craint dégun", correct: false},
            { text: "Aux armes", correct: false},
            { text: "Droit au but", correct: true},
            { text: "Ensemble jusqu'au sommet", correct: false},
        ]
    },
    {
        question: "En quelle année l’Olympique de Marseille remporte-t-il sa première Coupe de France ?",
        answer: [
            { text: "1924", correct: true},
            { text: "1946", correct: false},
            { text: "1968", correct: false},
            { text: "1988", correct: false},
        ]
    },
    {
        question: "Quel surnom est donné aux jeunes du centre de formation du club ?",
        answer: [
            { text: "La relève", correct: false},
            { text: "Les minots", correct: true},
            { text: "Les fadas", correct: false},
            { text: "Les nistons", correct: false},
        ]
    },
    {
        question: "Lequel de ces hommes n’a jamais été président du club ?",
        answer: [
            { text: "Pape Diouf", correct: false},
            { text: "Robert-Louis Dreyfus", correct: false},
            { text: "Jean-Claude Gaudin", correct: false},
            { text: "Marcelo Bielsa", correct: true},
        ]
    },
    {
        question: "L'Olympique de Marseille est-il le seul club Français a avoir remporté la Ligue des Champions ?",
        answer: [
            { text: "Non", correct: false},
            { text: "Oui", correct: true},
        ]
    },
    {
        question: "Quel ancien footballeur Français était entraîneur à l’OM entre 2009 et 2012 ?",
        answer: [
            { text: "Rudi Garcia", correct: false},
            { text: "Hervé Renard", correct: false},
            { text: "Didier Deschamps", correct: true},
            { text: "José Anigo", correct: false},
        ] 
    },
    {
        question: "Lequel de ces joueurs de la Coupe du Monde 1998 a été joueur à l’Olympique de Marseille ?",
        answer: [
            { text: "Christian Karembeu", correct: false},
            { text: "Zinédine Zidane", correct: false},
            { text: "Frank Leboeuf", correct: true},
            { text: "Bernard Lama", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Continuer";
    showQuestion();
}

const showQuestion = () => {

    resetState()

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer )
    })
}

const resetState = () => {
    nextButton.style.display = "none"
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display ="block";
}  

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

const handleNextButton = () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}


const showScore = () => {
    resetState()

    if (score < 3) {
        questionElement.innerHTML = `Votre score : ${score} sur ${questions.length}, félicitations vous êtes Parisien!`;
    } else if (score === 10){
        questionElement.innerHTML = `Votre score : ${score} sur ${questions.length}, félicitations et allez l'OM !`;
    } else {
        questionElement.innerHTML = `Votre score : ${score} sur ${questions.length} !`;
    }
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";
}

startQuiz()