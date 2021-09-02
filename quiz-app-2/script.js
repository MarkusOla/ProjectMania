const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");


let QuestionNr = 0;
let score = 0;
let QuizLength = 5;


getRandomQuestion()

async function getRandomQuestion() {
    deselectAnswers();
    const resp = await fetch(
        "https://opentdb.com/api.php?amount=1"
    );
    const ResponseData = await resp.json();
    const RandomQuestion = ResponseData.results[0]

    questionEl.innerText = RandomQuestion.question
    a_text.innerText = RandomQuestion.incorrect_answers[0]
    b_text.innerText = RandomQuestion.incorrect_answers[1]
    c_text.innerText = RandomQuestion.incorrect_answers[2]
    d_text.innerText = RandomQuestion.correct_answer
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}
submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();
    console.log(answer)

    if (answer) {
        if (answer === "d") {
            score++;
        }

        QuestionNr++;
        if (QuestionNr < QuizLength) {
            getRandomQuestion();
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${QuestionNr} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});