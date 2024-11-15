document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem(username, password);
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "login.html";
});

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (localStorage.getItem(username) === password) {
        sessionStorage.setItem("loggedUser", username);
        window.location.href = "messageBoard.html";
    } else {
        alert("Credenciais inválidas!");
    }
});
function checkAuth() {
    if (!sessionStorage.getItem("loggedUser")) {
        alert("Faça login para acessar esta página!");
        window.location.href = "login.html";
    }
}
function logout() {
    sessionStorage.removeItem("loggedUser");
    alert("Logout realizado com sucesso!");
    window.location.href = "index.html";
}
const messages = [];

function addMessage(content) {
    messages.push({ content, user: sessionStorage.getItem("loggedUser") });
    displayMessages();
}

function displayMessages() {
    const messagesContainer = document.getElementById("messages");
    if (messagesContainer) {
        messagesContainer.innerHTML = messages
            .map((msg, index) => `<div>${msg.user}: ${msg.content} <a href="messageDetail.html" onclick="viewMessage(${index})">Ver</a></div>`)
            .join("");
    }
}

function viewMessage(index) {
    sessionStorage.setItem("currentMessage", JSON.stringify(messages[index]));
}

function displayMessageDetail() {
    const message = JSON.parse(sessionStorage.getItem("currentMessage"));
    document.getElementById("messageDetail").innerText = `${message.user}: ${message.content}`;
}
if (document.getElementById("messages")) checkAuth();
if (document.getElementById("messageDetail")) displayMessageDetail();
