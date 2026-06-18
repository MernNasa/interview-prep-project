import questions from "./cssquestions.json" with {type:"json"}

let current = 0;
let completed = new Set();

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const progressEl = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const percentage = document.getElementById("percentage");
const badge = document.getElementById("badge");
const questionList = document.getElementById("questionList");

function renderQuestion(){

    completed.add(current);

    const q = questions[current];

    questionEl.textContent = q.question;
    answerEl.textContent = q.answer;

    badge.textContent =
    `Question ${current + 1} of ${questions.length}`;

    const percent =
    ((current + 1) / questions.length) * 100;

    progressEl.style.width =
    percent + "%";

    progressText.textContent =
    `${current + 1}/${questions.length} Completed`;

    percentage.textContent =
    Math.round(percent) + "%";

    renderList();
}

function renderList(){

    questionList.innerHTML="";

    questions.forEach((q,index)=>{

        const li = document.createElement("li");

        li.textContent =
        `${index + 1}. ${q.question}`;

        if(index === current){

            li.classList.add("active");

            setTimeout(() => {
                li.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }, 0);
        }

        if(completed.has(index))
            li.classList.add("completed");

        li.onclick = () => {
            current = index;
            renderQuestion();
        }

        questionList.appendChild(li);
    });
}

function nextQuestion(){

    if(current < questions.length - 1){
        current++;
        renderQuestion();
    }
}

function prevQuestion(){

    if(current > 0){
        current--;
        renderQuestion();
    }
}
function toggleSidebar(){
    document
    .getElementById("sidebar")
    .classList
    .toggle("show");
}


document
    .getElementById("prevBtn")
    .addEventListener("click", prevQuestion);

document
    .getElementById("nextBtn")
    .addEventListener("click", nextQuestion);

document
    .getElementById("toggleBtn")
    .addEventListener("click", toggleSidebar);



renderQuestion();