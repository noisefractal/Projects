let user = null;

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    user = username;
    localStorage.setItem('currentUser', user);
    showBoard();
  } else {
    alert('Por favor, preencha usuário e senha.');
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

function showBoard() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('board-page').style.display = 'block';
  loadPostIts();
}

function addPostIt() {
  const board = document.getElementById('board');

  const color = document.getElementById('color-select').value;
  const postIt = {
    id: Date.now(),
    title: '',
    text: '',
    color,
    done: false
  };

  const postIts = getPostIts();
  postIts.push(postIt);
  savePostIts(postIts);
  renderPostIts(postIts);
}

function getPostIts() {
  // Corrigido para usar template literals corretamente
  return JSON.parse(localStorage.getItem(`postits_${user}`)) || [];
}

function savePostIts(postIts) {
  // Corrigido para usar template literals corretamente
  localStorage.setItem(`postits_${user}`, JSON.stringify(postIts));
}

function loadPostIts() {
  const postIts = getPostIts();
  renderPostIts(postIts);
}

function renderPostIts(postIts) {
  const board = document.getElementById('board');
  board.innerHTML = '';

  postIts.forEach(postIt => {
    const div = document.createElement('div');
    div.className = `postit ${postIt.color}`;
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Título';
    titleInput.value = postIt.title;
    titleInput.className = 'postit-title';
    titleInput.onchange = () => {
      postIt.title = titleInput.value;
      updatePostIt(postIt);
    };

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Descrição...';
    textarea.value = postIt.text;
    textarea.onchange = () => {
      postIt.text = textarea.value;
      updatePostIt(postIt);
    };

    // MODIFICAÇÃO: Criando um container para o checkbox e o label
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = postIt.done;
    checkbox.id = `done_${postIt.id}`;
    checkbox.onchange = () => {
      postIt.done = checkbox.checked;
      updatePostIt(postIt);
    };

    const labelCheckbox = document.createElement('label');
    labelCheckbox.htmlFor = `done_${postIt.id}`;
    labelCheckbox.textContent = 'Concluído';

    // Adiciona o checkbox e o label ao container deles
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(labelCheckbox);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Excluir';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deletePostIt(postIt.id);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';
    actionsDiv.appendChild(delBtn);

    div.appendChild(titleInput);
    div.appendChild(textarea);
    div.appendChild(checkboxContainer); // Adiciona o container em vez dos elementos separados
    div.appendChild(actionsDiv);

    board.appendChild(div);
  });
}

function updatePostIt(updatedPostIt) {
  const postIts = getPostIts().map(p => p.id === updatedPostIt.id ? updatedPostIt : p);
  savePostIts(postIts);
  // Não é necessário renderizar tudo de novo, para melhor performance
  // mas para simplicidade, vamos manter assim.
}

function deletePostIt(id) {
  const postIts = getPostIts().filter(p => p.id !== id);
  savePostIts(postIts);
  renderPostIts(postIts);
}

window.onload = () => {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    user = savedUser;
    showBoard();
  }
};