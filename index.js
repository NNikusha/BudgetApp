const storageKey = "expenses";
const expenses = JSON.parse(localStorage.getItem(storageKey)) || [];

const filterData = (expenses, date, category, minAmount, maxAmount) => {
  let filteredExpenses = expenses;

  if (date !== "") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.date === date
    );
  }

  if (category && category !== "all") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === category
    );
  }

  if (minAmount !== "") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.total_amount >= parseFloat(minAmount)
    );
  }

  if (maxAmount !== "") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.total_amount <= parseFloat(maxAmount)
    );
  }

  return filteredExpenses;
};
const datasContainer = document.querySelector(".datas");
const form = document.getElementById("form");


const displayExpenses = () => {
  const expenses = JSON.parse(localStorage.getItem("expenses"));

  if (expenses !== null && expenses.length > 0) {
    datasContainer.innerHTML = renderPosts(expenses);
  }
};

const renderPosts = (expenses) => {
  return expenses
    .map((expense, index) => {
      return `<div class="removeField">
                <div class="category">Category:${expense.category}</div>
                <button class="remove" type="button" data-index="${index}">X</button>
              </div>
              <div class="date">Date:${expense.date}</div>
              <div class="total">Total Amount:${expense.total_amount}</div>
              <button class="edit" type="button" >Edit</button>
              `;
    })
    .join("");
};

datasContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.getAttribute("data-index");
    expenses.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(expenses));
    displayExpenses();
  }
});

window.addEventListener("load", displayExpenses);

const incomeArray = expenses.filter((expense) => expense.type === "income");
const totalIncome = incomeArray.reduce(
  (sum, income) => sum + income.total_amount,
  0
);

const expenseArray = expenses.filter((expense) => expense.type === "expense");
const totalExpense = expenseArray.reduce(
  (sum, expense) => sum + expense.total_amount,
  0
);

const difference = totalIncome - totalExpense;

const totalIncomeElement = document.querySelector(".totalNum");
totalIncomeElement.innerHTML = `Total Income: ${totalIncome}`;

const totalExpenseElement = document.querySelector(".totalExpense");
totalExpenseElement.innerHTML = `Total Expense: ${totalExpense}`;

const differenceElement = document.querySelector(".difference");
differenceElement.innerHTML = `Difference: ${difference}`;



form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateInput = document.getElementById("date");
  const dateValue = dateInput.value;
  const categoryInput = document.getElementById("category");
  const categoryValue = categoryInput.value;
  const minAmountInput = document.getElementById("min");
  const minAmount = minAmountInput.value;
  const maxAmountInput = document.getElementById("max");
  const maxAmount = maxAmountInput.value;

  const filteredExpenses = filterData(
    expenses,
    dateValue,
    categoryValue,
    minAmount,
    maxAmount
  );
  datasContainer.innerHTML = renderPosts(filteredExpenses);
});


