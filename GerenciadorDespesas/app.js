// Capturando elementos do DOM
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Armazenamento local para as despesas
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Função para exibir as despesas na lista
function displayExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - R$${expense.amount} - ${expense.category} - ${expense.date}
            <button onclick="deleteExpense(${index})">Excluir</button>
        `;
        expenseList.appendChild(li);
    });
}

// Função para adicionar uma nova despesa
// Função para adicionar uma nova despesa (atualizada para incluir o usuário logado)
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

    // Limpa o formulário após a adição
    expenseForm.reset();

// Função para excluir uma despesa
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Adiciona o evento de submissão ao formulário
expenseForm.addEventListener('submit', addExpense);

// Exibe as despesas ao carregar a página
displayExpenses();
// Capturando elementos do DOM para cadastro e login
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Função para registrar o usuário
function registerUser(e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário já existe
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('Usuário já cadastrado!');
        return;
    }

    // Adiciona o novo usuário
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

    // Verifica se o usuário existe
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        alert('Login bem-sucedido!');
        // Armazena o usuário logado
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        // Redirecionar ou exibir o gerenciador de despesas
        displayExpenses();
    } else {
        alert('Credenciais incorretas!');
    }

    loginForm.reset();
}

// Adicionando eventos para os formulários
registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);

// Função para verificar se o usuário está logado
function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Usuário está logado, exibe a lista de despesas
        displayExpenses();
    } else {
        // Usuário não está logado, exibe o formulário de login
        document.getElementById('expense-form').style.display = 'none';
        document.getElementById('expense-list').style.display = 'none';
        alert('Por favor, faça login para acessar o gerenciador de despesas.');
    }
}

// Verifica o status do login ao carregar a página
checkLoginStatus();
