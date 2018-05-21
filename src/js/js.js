const questions = [{
    enquiry: "tresc pytania 1",
    answers: ["odp1", "odp2", "odp3", "odp4"],
    correctAns: "odp3",
}, {
    enquiry: "tresc pytania 2",
    answers: ["ans1", "ans2", "ans3", "ans4"],
    correctAns: "ans2",
}, {
    enquiry: "tresc pytania 3",
    answers: ["ansodp1", "ansodp2", "ansodp3", "ansodp4"],
    correctAns: "ansodp2",
}, {
    enquiry: "tresc pytania 3",
    answers: ["ansodp1", "ansodp2", "ansodp3", "ansodp4"],
    correctAns: "ansodp2",
}, {
    enquiry: "tresc pytania 3",
    answers: ["ansodp1", "ansodp2", "ansodp3", "ansodp4"],
    correctAns: "ansodp2",
}, {
    enquiry: "tresc pytania 3",
    answers: ["ansodp1", "ansodp2", "ansodp3", "ansodp4"],
    correctAns: "ansodp2",
}];

function Quiz(questions) {
    this.current = 0;
    this.numOfQuestions = questions.length;
    this.questions = questions.map(obj => { return obj.enquiry });
    this.answers = questions.map(obj => { return obj.answers });
    this.correctAns = questions.map(obj => { return obj.correctAns });
    this.userAnswers = [];
    this.error = null;
    this.score = null;
};
Quiz.prototype.next = function() {
    this.addAnswers();
    this.error = null;
    if (this.numOfQuestions === this.current + 1) {
        this.error = 'nie mozesz przejsc dalej, to ostatnie pytanie';
    } else {
        this.current += 1
    }
    if ((this.numOfQuestions) != this.userAnswers.length) {
        this.changeQuestion();
    };


    sendMsg(this.error, msgBox);
};

Quiz.prototype.prev = function() {
    this.error = null;
    this.current === 0 ? this.error = 'nie mozesz cofnac, to jest pierwsze pytanie' : this.current--;
    quizzz.removeAnswers();
    quizzz.changeQuestion();
    sendMsg(this.error, msgBox);
};

Quiz.prototype.addAnswers = function() {
    let ans = document.querySelector("input[type='radio']:checked") ? document.querySelector("input[type='radio']:checked").value : null;
    (this.userAnswers.length < this.numOfQuestions) && (this.userAnswers = [...this.userAnswers, ans]);
    (this.userAnswers.length == this.numOfQuestions) && (this.userAnswers[this.current]=ans);
}
Quiz.prototype.validate = function() {
    this.score = this.correctAns.map((current, index) => { return current === this.userAnswers[index] ? 1 : 0; }).reduce((a, b) => { return a + b })
    return this.score;
}
Quiz.prototype.removeAnswers = function() {
    this.userAnswers.splice(this.current ,this.current +1)
}
Quiz.prototype.changeQuestion = function() {
    question.innerText = this.questions[this.current];
    info.innerText = `pytanie numer ${this.current+1}`
    let newAnswers = this.answers[this.current].map((ans, index) => {
        return `<li>
                <input type='radio' name='answer' id='ans${index+1}' value='${ans}'>
                <label for='ans${index+1}'>${ans}</label>
            </li>`
    }).join(" ");
    answers.innerHTML = newAnswers;
}

const quizzz = new Quiz(questions);

//hooks to navigation
const submit = document.querySelector(".navigation__btn--submit");
const prev = document.querySelector(".navigation__btn--prev");
const next = document.querySelector(".navigation__btn--next");
//adding listeners for navigation 
next.addEventListener("click", handleNext);
prev.addEventListener("click", handlePrev);
submit.addEventListener("click", handleSubmit);
//hooks for questions and answers
const info = document.querySelector(".quiz__info");
const question = document.querySelector(".quiz__question");
const answers = document.querySelector(".quiz__answers");
const msgBox = document.querySelector(".quiz__msg");


function handleSubmit() {
    if (quizzz.userAnswers.length < quizzz.numOfQuestions) {
        this.error = "dokoncz test";
    } else {
        this.error = `twoj  wynik to ${quizzz.validate()} na ${quizzz.numOfQuestions}`
    }
    sendMsg(this.error, msgBox);

}

function handlePrev() {
    quizzz.prev();
}

function handleNext() {
    quizzz.next();
}
const init = () => {
    quizzz.changeQuestion();
}
init();
const sendMsg = (content, container) => {
    container.innerText = content;
}