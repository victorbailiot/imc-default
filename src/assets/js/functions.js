let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

function calculoimc(peso, altura){
  return peso / (altura*altura);
}

let tabela = document.querySelector('.table');
function addTabela(nome, peso, altura, imc, indice){
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;

  let colunaImc = document.createElement('td');
  colunaImc.innerHTML = imc.toFixed(1);

  let colunaDeletar = document.createElement('td');
  let btnDeletar = document.createElement('button');
  btnDeletar.innerHTML="<img src='assets/images/delete.svg'>";
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');
  colunaDeletar.appendChild(btnDeletar);

  btnDeletar.addEventListener("click", (event) => {
    event.preventDefault();
    deletarLinha(indice);
  });

  let linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaImc);
  linha.appendChild(colunaDeletar);
  tabela.appendChild(linha);
}

function limparFormulario(){
  nome.value = '';
  peso.value = '';
  altura.value = '';
  nome.focus();
}

function addLocalStorage(nome, peso, altura, imc){
  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if (localStorage.getItem("listaIMC")){
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  
  } else {
    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }
  
  mostrarMensagem("IMC cadastrado!", "add");
}

function limparTabela(){
  let qtdLinhas = tabela.rows.length;
  for (let i = qtdLinhas - 1; i > 0; i--){
    tabela.deleteRow(i);
  }
}

function carregarLocalStorage(){
  limparTabela();

  if (localStorage.getItem("listaIMC")){
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    })
  } else {
    mostrarMensagem("Nenhum IMC a ser exibido", "table");
  }
}

function deletarLinha(index){
  
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(index, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();
  mostrarMensagem("IMC deletado!", "delete");
}

let mensagem = document.querySelector("#mensagem");

function mostrarMensagem(msg, tipo){
  mensagem.innerHTML = msg;
  mensagem.classList.remove('d-none');
  
  if (tipo == "add"){
    mensagem.classList.add('alert-success');
  } else if (tipo == "delete"){
    mensagem.classList.add('alert-danger');
  } else if (tipo == "table"){
    mensagem.classList.add('alert-warning');
  }

  setTimeout(() => {
    mensagem.innerHTML = "";
    mensagem.classList.remove('alert-danger');
    mensagem.classList.remove('alert-success');
    mensagem.classList.remove('alert-warning');
    mensagem.classList.remove('d-none');
  }, 2000);
}

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calculoimc(peso.value, altura.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc);
  // addTabela(nome.value, peso.value, altura.value, imc);
  carregarLocalStorage();
  limparFormulario();
  console.log("Done");
});
