const form = document.getElementById("form");
const expense = document.getElementById("expense");
const income = document.getElementById("income");

const userArr = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {};

  if (
    form.date.value.trim() !== "" &&
    (income.checked || expense.checked) &&
    form.category.value.trim() !== "" &&
    form.total.value.trim() !== ""
  ) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(form.date.value)) {
      userObj["id"] = userArr.length + 1;
      userObj["date"] = form.date.value;
      income.checked
        ? (userObj["type"] = "income")
        : (userObj["type"] = "expense");
      userObj["category"] = form.category.value;
      userObj["total_amount"] = parseFloat(form.total.value);

      userArr.push(userObj);

      saveExpenses(userObj);
    } else {
      console.log("Invalid date format, please use YYYY-MM-DD.");
    }
  } else {
    console.log("Please fill in all required fields.");
  }

  console.log(userArr);
  form.reset();
  form.elements.category.value = "";
});

income.addEventListener("change", () => {
  form.category.innerHTML =
    '<option value="salary">salary</option><option value="invoice">invoice</option>';
});

expense.addEventListener("change", () => {
  form.category.innerHTML =
    '<option value="gym">gym</option> <option value="shopping">shopping</option> <option value="family">family</option> <option value="other">other</option>';
});
console.log(expense);

const saveExpenses = (expense, storageKey = "expenses") => {
  const existingExpenses = localStorage.getItem(storageKey);

  if (existingExpenses === null) {
    const expenses = [expense];
    localStorage.setItem(storageKey, JSON.stringify(expenses));
  } else {
    const expensesParsed = JSON.parse(existingExpenses);
    expensesParsed.push(expense);
    localStorage.setItem(storageKey, JSON.stringify(expensesParsed));
  }
};

