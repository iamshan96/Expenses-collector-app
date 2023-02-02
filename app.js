import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const expensesContainer = document.getElementById("expenses-container");
const inputTextBox = document.getElementById("input-text-box");
const inputAmountBox = document.getElementById("input-amount-box");

let expensesListArray = [];

const dataFromLocalStorage = JSON.parse(
  localStorage.getItem("expensesListArray")
);

if (dataFromLocalStorage) {
  expensesListArray = dataFromLocalStorage;
  render();
  clearExpensesContainer();
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.remove) {
    removeItemClick(e.target.dataset.remove);
  } else if (e.target.id === "input-btn") {
    inputBtnHandleClick();
  }
});

function removeItemClick(tweetId) {
  const targetObj = expensesListArray.filter(function (expense) {
    return expense.uuid === tweetId;
  })[0];

  const checkIndex = expensesListArray.indexOf(targetObj);
  expensesListArray.splice(checkIndex, 1);
  localStorage.setItem("expensesListArray", JSON.stringify(expensesListArray));
  render();
  clearExpensesContainer();
}

function inputBtnHandleClick() {
  if (inputTextBox.value && inputAmountBox.value) {
    expensesListArray.push({
      name: inputTextBox.value,
      amount: inputAmountBox.value,
      uuid: uuidv4(),
    });
    localStorage.setItem(
      "expensesListArray",
      JSON.stringify(expensesListArray)
    );

    render();
  }
  inputTextBox.value = "";
  inputAmountBox.value = "";
}

function clearExpensesContainer() {
  if (expensesListArray.length === 0) {
    expensesContainer.innerHTML = "";
  }
}

function getExpensesHtml() {
  let count = 0;
  let totalExpenses = 0;
  let expensesHtml = "";
  expensesListArray.forEach(function (expense) {
    totalExpenses += Number(expense.amount);
    count++;
    expensesHtml += `
        <div class='expenses-list-item'>
          <div class='list-item-left'>
            ${count}) ${expense.name}
            <i class="remove-item fa-solid fa-xmark" data-remove='${expense.uuid}'></i>
          </div>
            Rs. ${expense.amount}
        </div>`;
  });

  return `
  <div id="expenses-list" class="expenses-list">
    ${expensesHtml}
  </div>
  <div class='total-expenses'>
    <span>
      Total:
    </span>
    <span>
      Rs. ${totalExpenses}
    </span>
  </div>
  `;
}

function render() {
  expensesContainer.innerHTML = getExpensesHtml();
}
