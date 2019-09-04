let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

function calculoimc(peso, altura){
  return peso / (altura*altura);
}

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calculoimc(peso.value, altura.value)
  console.log("Baitado");
  console.log(imc.toFixed(1));
});
