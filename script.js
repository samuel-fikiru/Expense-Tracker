let transactionArray = []
transactionArray = JSON.parse(localStorage.getItem('transactionArray')) || [];


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
    if (transactionArray === null) {
        transactionArray = [];
    }
    pushNewTransaction();
    localStorage.setItem('transactionArray', JSON.stringify(transactionArray));
})

formatButton.addEventListener('click', () => {
    localStorage.clear();
    transactionArray = [];
    renderHistoryHtml();
    renderexpenseIncomeHtml();
    alert('Full transactions history are succesfuly formatted. u see changes on page update :)');
})


let totalExpense = 0;
let totalIncome = 0;
let totalBalance = 0;


function pushNewTransaction() {

    const newExpense = textInput.value;
    const newPrice = Number(priceInput.value);

    textInput.value = '';
    priceInput.value = '';

    const newobj = {
        expense: newExpense,
        price: newPrice
    };
    if (newPrice >= 0 || newPrice < 0) {
        const recurringBalance = newPrice + totalBalance;
        if (totalBalance <= 0 && newPrice < 0 || recurringBalance < 0) {
            alert("insufficient balance");
        } else {
            transactionArray.push(newobj);
            renderHistoryHtml();
            renderexpenseIncomeHtml();
        }
    }
    else {
        alert('Please Insert Number Only!');
    }
}

renderHistoryHtml();
function renderHistoryHtml() {
    let compiledCode = '';
    if (transactionArray === null) {
        transactionArray = [];
    }
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

renderexpenseIncomeHtml();
function renderexpenseIncomeHtml() {
    let expenseAmount = 0;
    let incomeAmount = 0;
    if (transactionArray != null) {
        for (let n = 0; n < transactionArray.length; n++) {
            const currentPrice = transactionArray[n].price;
            if (currentPrice < 0) {
                expenseAmount += currentPrice;
            } else {
                incomeAmount += + currentPrice;
            }
        }
    }

    const boxCode =
        `<div class="income-container align-center">
            <p>INCOME</p>
            <p class="income-amount"> $${incomeAmount}</p>
        </div>
        <hr class="vertical-hr">
        <div class="expense-container align-center">
            <p>EXPENSE</p>
            <p class="expense-amount js-expense-amount">$${Math.abs(expenseAmount)}</p>
        </div>`;
    incomeExpenseContainer.innerHTML = boxCode;

    totalExpense = expenseAmount;
    totalIncome = incomeAmount;
    renderTotalBalance();

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

