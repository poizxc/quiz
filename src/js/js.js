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
}];

function Quiz(questions) {
    this.current = 0;
    this.numOfQuestions = questions.length;
    this.questions = questions.map(obj => { return obj.enquiry });
    this.answers = questions.map(obj => { return obj.answers });
    this.correctAns = questions.map(obj => { return obj.correctAns });
    this.userAnswers = [];
    this.error = null;
};

function clearError() {
    this.error = null;
}

Quiz.prototype.next = function() {
     this.error = null;
     debugger;
     this.numOfQuestions === this.current && this.userAnswers.length === this.numOfQuestions ? this.error = 'jestem zbyt wysoko' : this.current++;
    sendMsg(this.error,msgBox);
};

Quiz.prototype.prev = function() {
    this.error = null;
    this.current === 0 ? this.error = 'jestem zbyt nisko' : this.current--;
    sendMsg(this.error,msgBox);
};

Quiz.prototype.addAnswers = function(ans) {
    (this.userAnswers.length < this.numOfQuestions) && (this.userAnswers = [...this.userAnswers, ans])
}
Quiz.prototype.validate = function() {
    console.log(this.correctAns)
    console.log(this.userAnswers)
    let score = this.correctAns.map((current, index) => { return current === this.userAnswers[index] ? 1 : 0; }).reduce((a, b) => { return a + b })
    return score;
}
Quiz.prototype.removeAnswers = function(ans) {
    this.userAnswers.pop();
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
submit.addEventListener("click",handleSubmit);
//hooks for questions and answers
const info = document.querySelector(".quiz__info");
const question = document.querySelector(".quiz__question");
const answers = document.querySelector(".quiz__answers");
const msgBox = document.querySelector(".quiz__msg");
let msg = ""

function handleSubmit() {

    if (obj.userAnswers.length < obj.numOfQuestions  ) {
        msg = `dokończ test`
    } else {
        msg = `twoj  wynik to ${obj.validate()} na ${obj.numOfQuestions}`
    }
   sendMsg(msg,msgBox);

}

function handlePrev() {
  quizzz.prev();
  quizzz.removeAnswers();
  quizzz.changeQuestion();
}

function handleNext() {
    quizzz.next();
    let radio = document.querySelector("input[type='radio']:checked") ? document.querySelector("input[type='radio']:checked").value : null;
    console.log(radio)
    quizzz.addAnswers(radio);
    quizzz.changeQuestion();
    // 
    // if (obj.current <= obj.numOfQuestions && obj.userAnswers.length < obj.numOfQuestions ) { obj.addAnswers(radio); }
    // if (obj.current + 1 < obj.numOfQuestions) {
    //     obj.current += 1
    //     obj.changeQuestion()
    // } else { msg = "nie mozesz przejsc dalej to juz ostatnie pytanie"; }

    // sendMsg(msg,msgBox)

}
const init = () => {
    quizzz.changeQuestion();
}
init();
const sendMsg=(content,container)=>{
    container.innerText = content;
    msg = "";
}
