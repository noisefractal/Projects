const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');
const expenseSection = document.getElementById('expense-section');
const firstRegisterSection = document.getElementById('first-register-section');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const logoutBtn = document.getElementById('logout-btn');

let users = JSON.parse(localStorage.getItem('users')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function showSection(section) {
    firstRegisterSection.style.display = 'none';
    registerSection.style.display = 'none';
    loginSection.style.display = 'none';
    expenseSection.style.display = 'none';
    section.style.display = 'block';
}
document.getElementById('first-register-btn').addEventListener('click', () => {
    showSection(registerSection);
});
document.getElementById('go-to-register-btn').addEventListener('click', () => {
    showSection(registerSection);
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (users.some(user => user.email === email)) {
        alert('Usuário já cadastrado!');
        return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    registerForm.reset();
    showSection(loginSection);
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login bem-sucedido!');
        loginForm.reset();
        showSection(expenseSection);
        displayExpenses();
    } else {
        alert('Credenciais inválidas!');
    }
});
logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        showSection(loginSection);
    });
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value).toFixed(2);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    expenses.push({ name, amount, category, date, user: loggedInUser.email });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    expenseForm.reset();
});
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-date').value = expense.date;

    deleteExpense(index);
}
function displayExpenses() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    expenseList.innerHTML = '';

    expenses
        .filter(expense => expense.user === loggedInUser.email)
        .forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - R$${expense.amount} - ${expense.category} - ${expense.date}
                <button onclick="deleteExpense(${index})">Excluir</button>
                <button onclick="editExpense(${index})">Editar</button>
            `;
            expenseList.appendChild(li);
        });
}
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}
window.addEventListener('load', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showSection(expenseSection);
        displayExpenses();
    } else {
        showSection(firstRegisterSection);
    }
});