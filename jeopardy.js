const modalHeader = document.querySelector(".card-modal-header");
const modalBody = document.querySelector(".card-modal-body");
const modalFooter = document.querySelector(".card-modal-footer");
const modalInner = document.querySelector(".card-modal-inner");
const modal = document.querySelector(".card-modal");
const startButton = document.querySelector(".btn");
const restartButton = document.querySelector(".center");
const baseUrl = "https://jservice.io";

let categories = [];
let click = 0;

modalInner.addEventListener("click", function () {
  modalFooter.classList.remove("hidden");
  if (categories.length !== 0) {
    click += 1;
    if (click === 2) {
      click = 0;
      fillCard();
      modalFooter.classList.add("hidden");
    }
  } else {
    alert("Game Over. Please Reload.");
  }
});
function getCategoryIds() {
  for (let i = 0; i < 6; i++) {
    categories.push(Math.floor(Math.random() * 28163));
  }
  return categories;
}

function getCategory(catId) {
  const response = axios({
    method: "GET",
    url: `${baseUrl}/api/category?id=${catId}`,
  });
  catId.shift();
  return response;
}

async function fillCard() {
  let response = await getCategory(categories);
  modalHeader.innerHTML = "";
  modalBody.innerHTML = "";
  modalFooter.innerHTML = "";
  modalHeader.innerHTML = `<h3>${response.data.title}</h3>`;
  modalBody.innerHTML = response.data.clues[0].question;
  modalFooter.innerHTML = response.data.clues[0].answer;
}

async function setupAndStart() {
  modal.classList.add("visible");
  getCategoryIds();
  await fillCard();
}

startButton.addEventListener("click", function () {
  setupAndStart();
});
restartButton.addEventListener("click", function () {
  modal.classList.remove("visible");
  categories = [];
  modalHeader.innerHTML = "";
  modalBody.innerHTML = "";
  modalFooter.innerHTML = "";
  modalFooter.classList.add("hidden");
});
