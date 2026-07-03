let transactionArray = []

const savedData = JSON.parse(localStorage.getItem('transactionArray'));
transactionArray = (transactionArray === null) ? [] : savedData;
/* `    {
        expense: 'Marriage expense',
        price: 500
    },
    {
        expense: 'Shopping expense',
        price: 2000
    }`
*/

localStorage.setItem('transactionArray', JSON.stringify(transactionArray));



const addButton = document.querySelector('.js-add-btn');
const textInput = document.querySelector('.js-expense-text');
const priceInput = document.querySelector('.js-expense-price');
const historycontainer = document.querySelector('.js-expense-history-container');
const incomeExpenseContainer = document.querySelector('.js-income-expense-container')
const totalBalanceContainer = document.querySelector('.js-balance-container');

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

renderHistoryHtml();

addButton.addEventListener('click', () => {
    pushNewTransaction();
    renderHistoryHtml();
    renderexpenseIncomeHtml();
    renderTotalBalance();

    localStorage.setItem('transactionArray', JSON.stringify(transactionArray));

})



function renderHistoryHtml() {
    let compiledCode = '';

    for (let n = 0; n < transactionArray.length; n++) {
        const expensePrice = transactionArray[n].price;
        const expenseText = transactionArray[n].expense;

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
    transactionArray.push(newobj);

}

let totalExpense = 0;
let totalIncome = 0;
let totalBalance = 0;


renderexpenseIncomeHtml();
function renderexpenseIncomeHtml() {
    let expenseAmount = 0;
    let incomeAmount = 0;
    for (let n = 0; n < transactionArray.length; n++) {
        const currentPrice = transactionArray[n].price;
        if (currentPrice < 0) {
            expenseAmount += currentPrice;
        } else {
            incomeAmount += '+' + currentPrice;
        }
    }

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
