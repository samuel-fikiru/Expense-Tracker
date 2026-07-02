const addButton = document.querySelector('.js-add-btn');
const textInput = document.querySelector('.js-expense-text');

addButton.addEventListener('click', ()=>{

    console.log(textInput.value);
    textInput.value = '';
})