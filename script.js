const expenseArray = [
    {
        expense: 'Marriage expense',
        price: 500
    },
    {
        expense: 'Shopping expense',
        price: 2000
    }
]


const addButton = document.querySelector('.js-add-btn');
const textInput = document.querySelector('.js-expense-text');
const priceInput = document.querySelector('.js-expense-price');
const historycontainer = document.querySelector('.js-expense-history-container');
const incomeExpenseContainer = document.querySelector('.js-income-expense-container')
const totalBalanceContainer = document.querySelector('.js-balance-container');



renderHistoryHtml();

addButton.addEventListener('click', () => {
    pushNewTransaction();
    renderHistoryHtml();
    renderexpenseIncomeHtml();
    renderTotalBalance();
})


function renderHistoryHtml() {
    let compiledCode = '';

    for (let n = 0; n < expenseArray.length; n++) {
        const expensePrice = expenseArray[n].price;
        const expenseText = expenseArray[n].expense;

        const priceSign = expensePrice < 0 ? '' : '+';
        const code = `
        <div class="history-box">
            <p>${expenseText}</p>
            <p>${priceSign + expensePrice}</p>
        </div>
        `;
        compiledCode += code;

    }
    historycontainer.innerHTML = compiledCode;
}

function pushNewTransaction() {
    const newExpense = textInput.value;
    const newPrice = priceInput.value;

    textInput.value = '';
    priceInput.value = '';

    const newobj = {
        expense: newExpense,
        price: newPrice
    };
    expenseArray.push(newobj);

}

let totalExpense = 0;
let totalIncome = 0;
let totalBalance = 0;


renderexpenseIncomeHtml();
function renderexpenseIncomeHtml() {
    let expenseAmount = 0;
    let incomeAmount = 0;
    for (let n = 0; n < expenseArray.length; n++) {
        const currentPrice = expenseArray[n].price;
        if (currentPrice < 0) {
            expenseAmount += currentPrice;
        } else {
            incomeAmount += '+' + currentPrice;
        }
    }

    console.log(eval(expenseAmount) * eval(expenseAmount) + eval(expenseAmount))
    const boxCode =
        `<div class="income-container align-center">
            <p>INCOME</p>
            <p class="income-amount"> $${eval(incomeAmount)}</p>
        </div>
        <hr class="vertical-hr">
        <div class="expense-container align-center">
            <p>EXPENSE</p>
            <p class="expense-amount js-expense-amount">$${Math.abs(eval(expenseAmount))}</p>
        </div>`;
    incomeExpenseContainer.innerHTML = boxCode;

    totalExpense = expenseAmount;
    totalIncome = incomeAmount;

}


renderTotalBalance();
function renderTotalBalance() {
    totalBalance = eval(totalIncome) + eval(totalExpense);
    const balanceCode = 
    `
    <p class="titles"> YOUR BALANCE</p>
    <p class="total-amount">$${totalBalance}</p>
    `
    totalBalanceContainer.innerHTML = balanceCode;
}
