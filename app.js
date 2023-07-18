const mainForm = document.querySelector("#mainForm");
const main = document.querySelector("#main");
const ul = document.createElement("ul");
function createButton() {
  lock = document.createElement("button");
  lock.classList.add("is-success", "button");
  lock.innerText = "LOCK";
  lock.style.justifySelf = "flex-end";

  lock.addEventListener("click", (e) => {
    if (
      event.target.parentElement.innerText.split("\n")[0] ==
      data.data.results[qno].correct_answer
    ) {
      score++;
    }
    qno++;
    createQuestion(data);
  });
}
function createQuestion(data) {
  if (qno == 10) {
    ul.remove();
    const restart = document.createElement("button");
    restart.classList.add("button", "has-text-white");
    restart.style.backgroundColor = "#f4a261";
    restart.innerText = "RESTART";
    restart.style.border = "none";
    restart.addEventListener("click", (e) => {
      para.remove();
      restart.remove();
      main.appendChild(mainForm);
    });
    const para = document.createElement("h1");
    para.classList.add("is-size-2", "has-text-white", "has-text-centered");
    para.innerText = `Score : ${score}/10`;

    main.appendChild(para);
    main.appendChild(restart);
  }
  let str = [];
  ul.innerHTML = data.data.results[qno].question;
  ul.classList.add("has-text-white", "is-size-5");
  for (let item of data.data.results[qno].incorrect_answers) {
    const li = document.createElement("li");
    li.innerHTML = item;
    li.style.display = "flex";
    li.style.flexDirection = "column";
    li.style.marginBottom = "1em";
    createButton();
    li.append(lock);
    ul.appendChild(li);
  }
  const li = document.createElement("li");
  li.innerHTML = data.data.results[qno].correct_answer;
  li.style.display = "flex";
  li.style.flexDirection = "column";
  createButton();
  li.append(lock);
  ul.appendChild(li);
  main.appendChild(ul);
}

async function startGame(category) {
  data = await axios.get(
    `https://opentdb.com/api.php?amount=10&category=${category}`
  );
  qno = 0;
  score = 0;
  createQuestion(data);
}
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = mainForm.elements.subject.value;
  startGame(category);
  mainForm.remove();
});
