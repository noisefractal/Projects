// Capturando elementos do DOM
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const expenseSection = document.getElementById('expense-section');

// Armazenamento local para despesas
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Função para exibir as despesas na lista
function displayExpenses() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    expenseList.innerHTML = '';

    // Filtrar despesas do usuário logado
    const userExpenses = expenses.filter(expense => expense.user === loggedInUser.email);

    userExpenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - R$${expense.amount} - ${expense.category} - ${expense.date}
            <button onclick="deleteExpense(${index})">Excluir</button>
        `;
        expenseList.appendChild(li);
    });
}

// Função para adicionar uma nova despesa
function addExpense(e) {
    e.preventDefault();

    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseDate = document.getElementById('expense-date').value;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const expense = {
        name: expenseName,
        amount: parseFloat(expenseAmount).toFixed(2),
        category: expenseCategory,
        date: expenseDate,
        user: loggedInUser.email
    };

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    expenseForm.reset();
}

// Função para excluir uma despesa
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Função para registrar o usuário
function registerUser(e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert('Usuário já cadastrado!');
        return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    registerForm.reset();
}

// Função para logar o usuário
function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        alert('Login bem-sucedido!');
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        expenseSection.style.display = 'block';
        displayExpenses();
    } else {
        alert('Credenciais incorretas!');
    }
    loginForm.reset();
}

// Função para verificar o status de login ao carregar a página
function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        expenseSection.style.display = 'block';
        displayExpenses();
    } else {
        expenseSection.style.display = 'none';
    }
}

// Adicionando eventos aos formulários
registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);
expenseForm.addEventListener('submit', addExpense);

// Verificar login ao carregar a página
checkLoginStatus();
