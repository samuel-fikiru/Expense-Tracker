let transactionArray = JSON.parse(localStorage.getItem('transactionArray')) || [];


const addButton = document.querySelector('.js-add-btn');
const textInput = document.querySelector('.js-expense-text');
const priceInput = document.querySelector('.js-expense-price');
const historycontainer = document.querySelector('.js-expense-history-container');
const incomeExpenseContainer = document.querySelector('.js-income-expense-container')
const totalBalanceContainer = document.querySelector('.js-balance-container');
const formatButton = document.querySelector('.js-format-btn');

textInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        priceInput.focus();
    }

})

priceInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        addButton.click();
        textInput.focus();
    }
})


addButton.addEventListener('click', () => {
    addTransaction();
})

formatButton.addEventListener('click', () => {
    localStorage.clear();
    transactionArray = [];
    renderHistory();
    calculateTotals();
    alert('Full transactions history are succesfuly formatted. u see changes on page update :)');
})


let totalExpense = 0;
let totalIncome = 0;
let totalBalance = 0;

function save() {
    localStorage.setItem('transactionArray', JSON.stringify(transactionArray));
}

function addTransaction() {
    const transactionTitle = textInput.value;
    const newPrice = Number(priceInput.value);

    const newobj = {
        expense: transactionTitle,
        price: newPrice
    };
    if (!(textInput.value.trim() === '' || isNaN(newPrice))) {
        transactionArray.push(newobj);
        calculateTotals();
        render();
        save();
    }
    else {
        alert('Please Insert Number Only!');
    }
    textInput.value = '';
    priceInput.value = '';
}

renderHistory();
function renderHistory() {
    let compiledCode = '';
    transactionArray.array.forEach(t => {
        const expensePrice = t.price;
        const expenseText = t.expense;

        const priceSign = expensePrice < 0 ? '' : '+';
        let code = ``;
        if (priceSign === '') {
            code = `
                    <div class="history-box redBorder">
                        <p>${expenseText}</p>
                        <p>${priceSign + expensePrice}</p>
                    </div>
                    `;
        } else {
            code = `
                    <div class="history-box">
                        <p>${expenseText}</p>
                        <p>${priceSign + expensePrice}</p>
                    </div>
                    `;
        }

        compiledCode += code;
    });
    historycontainer.innerHTML = compiledCode;
}

calculateTotals();
function calculateTotals() {
    let expenseAmount = 0;
    let incomeAmount = 0;
    for (let n = 0; n < transactionArray.length; n++) {
        const currentPrice = transactionArray[n].price;
        if (currentPrice < 0) {
            expenseAmount += currentPrice;
        } else {
            incomeAmount += + currentPrice;
        }
    }

    totalExpense = expenseAmount;
    totalIncome = incomeAmount;
    totalBalance = totalExpense + totalIncome;
    render();

}

function renderTotals() {
    const boxCode =
        `<div class="income-container align-center">
            <p>INCOME</p>
            <p class="income-amount"> $${totalIncome}</p>
        </div>
        <hr class="vertical-hr">
        <div class="expense-container align-center">
            <p>EXPENSE</p>
            <p class="expense-amount js-expense-amount">$${Math.abs(totalExpense)}</p>
        </div>`;
    incomeExpenseContainer.innerHTML = boxCode;
}

renderBalance();
function renderBalance() {
    totalBalance = eval(totalIncome) + eval(totalExpense);
    const balanceCode =
        `
    <p class="titles"> YOUR BALANCE</p>
    <p class="total-amount">$${totalBalance}</p>
    `
    totalBalanceContainer.innerHTML = balanceCode;
}

function render() {
    renderHistory();
    renderTotals();
    renderBalance();
}

