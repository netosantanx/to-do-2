const input = document.querySelector('#task-name'); // seleciona a área de input
const buttonAdd = document.querySelector('#add-task'); // seleciona a área do botão de adicionar
const list = document.querySelector('#task-list'); // seleciona a estrutura da lista OL
const rmvFinalizados = document.querySelector('#remove-completed'); // seleciona botão para remover todos as tarefas finalizadas

const removerSelecionado = document.querySelector('#remove-selected'); // seleciona botão para remover tarefa selecionada

// adicionar uma tarefa OK
function adicionarTarefa() {
  const tarefa = input.value; // seleciona o texto escrito na área de input
  const novaLi = document.createElement('li');
  novaLi.innerText = tarefa;
  list.appendChild(novaLi);
  input.value = '';
}

buttonAdd.addEventListener('click', adicionarTarefa);


// selecionar elemento +/-
// https://stackoverflow.com/questions/70126131/classlist-validation-for-unique-selected-item
// ideia veio da Bruna Büttenbender
// https://developer.mozilla.org/pt-BR/docs/Web/API/Element/classList
function selecionar(event) {
  const items = document.getElementsByTagName('li');
  for (let index = 0; index < items.length; index += 1) {
    items[index].style.background = 'white';
  }
  // eslint-disable-next-line no-param-reassign
  event.target.style.background = 'grey';
}

list.addEventListener('click', selecionar);

// apaga tudo OK
const botaoApagaTudo = document.getElementById('clear-all');
function apagaTudo() {
  list.innerHTML = '';
}

botaoApagaTudo.addEventListener('click', apagaTudo);

// completar OK
function completar(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}
list.addEventListener('dblclick', completar);

// excluir selecionado |-> Obrigado Mateus Fukuya, só lendo o seu código eu percebi que devia declarar a const dentro da function, até então, só tava quebrando a cabeça
function excluirSelecionado() {
  const items = document.querySelectorAll('li');
  for (let index = 0; index < items.length; index += 1) {
    if (items[index].style.background !== 'white') {
      items[index].parentNode.removeChild(items[index]);
    }
  }
}
removerSelecionado.addEventListener('click', excluirSelecionado);

// remover finalizados |-> Obrigado Mateus Fukuya, só lendo o seu código eu percebi que devia declarar a const dentro da function, até então, só tava quebrando a cabeça
function removerFinalizados() {
  const items = document.querySelectorAll('li');
  for (let index = 0; index < items.length; index += 1) {
    if (items[index].classList.contains('completed')) {
      items[index].parentNode.removeChild(items[index]);
    }
  }
}

rmvFinalizados.addEventListener('click', removerFinalizados);

// storage | -> paula ribeiro salvou a minha vida com o storage
const salvarTarefas = document.querySelector('#save-tasks');
function salvar() {
  const list = document.querySelector('#task-list');
  let itemsToSave = localStorage.setItem('list', JSON.stringify(list.innerHTML));
}

function salvarItens() {
  const savedItens = JSON.parse(localStorage.getItem('list'));
  list.innerHTML = savedItens;
}

window.onload = function () {
  salvarItens();
};

salvarTarefas.addEventListener('click', salvar);
