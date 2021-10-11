const inputParcelas = document.querySelector(".input-parcelas");
const inputValor = document.querySelector(".input-valor");
const valorPago = document.querySelector(".main-info h2");
const taxaAoMes = document.querySelector(".wrapper .content .taxa");
const tarifaAoMes = document.querySelector(".wrapper .content .tarifa");
const displayValor = document.querySelector(".slider span .display-valor");
const displayParcelas = document.querySelector(
  ".slider span .display-parcelas"
);

const simulador = new Simulador(12, "Elo", 1000);

simulador.calcularPorcentagemDeJuros();
simulador.calcularJurosSobreValor();
renderizarSimulação();

inputParcelas.addEventListener("change", (e) => {
  simulador.setNumeroDeParcelas(e.target.value);
  simulador.calcularPorcentagemDeJuros();
  simulador.calcularJurosSobreValor();

  console.log(e.target.value);
  renderizarSimulação();
});

inputValor.addEventListener("change", (e) => {
  simulador.setValor(conversorDeRangeParaValor[e.target.value]);
  simulador.calcularPorcentagemDeJuros();
  simulador.calcularJurosSobreValor();

  renderizarSimulação();
});

function renderizarSimulação() {
  valorPago.innerHTML = `${simulador.numeroDeParcelas}x R$${(
    (simulador.valor + simulador.jurosEmReais) /
    simulador.numeroDeParcelas
  ).toFixed(2)}`;

  taxaAoMes.innerHTML = `${(
    simulador.jurosEmPorcentagem / simulador.numeroDeParcelas
  ).toFixed(2)}%`;
  tarifaAoMes.innerHTML = `R$${String((
    simulador.jurosEmReais / simulador.numeroDeParcelas
  ).toFixed(2)).replace('.', ',')}`;

  displayParcelas.innerHTML = `${simulador.numeroDeParcelas}x`;
  displayValor.innerHTML = `R$${String(simulador.valor.toFixed(2)).replace(
    ".",
    ","
  )}`;
}

const conversorDeRangeParaValor = {
  5: 300,
  10: 500,
  15: 1000,
  20: 1500,
  25: 2000,
  30: 2500,
  35: 3000,
  40: 3500,
  45: 4000,
  50: 4500,
  55: 5000,
  60: 5500,
  65: 6000,
  70: 7000,
  75: 8000,
  80: 9000,
  85: 10000,
  90: 12000,
  95: 15000,
  100: 20000,
};
