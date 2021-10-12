// ESTRUTURA DO SIMULADOR
class Simulador {
  constructor(numeroDeParcelas, bandeira, valor) {
    this.numeroDeParcelas = numeroDeParcelas;
    this.bandeira = bandeira;
    this.valor = valor;
  }

  setValor(valor) {
    this.valor = valor;
  }
  setNumeroDeParcelas(numeroDeParcelas) {
    this.numeroDeParcelas = numeroDeParcelas;
  }
  setBandeira(bandeira) {
    this.bandeira = bandeira;
  }

  calcularPorcentagemDeJuros() {
    if (this.numeroDeParcelas < 3) {
      if(this.bandeira === 'Elo'){
        this.jurosEmPorcentagem = taxasPorValor[this.valor] + bandeira[this.numeroDeParcelas];
        return
      }
      this.jurosEmPorcentagem = taxasPorValor[this.valor];
      return;
    }

    let somaDeJurosDaEmpresaPorParcela = 0;
    for (let i = 3; i <= this.numeroDeParcelas; i++) {
      somaDeJurosDaEmpresaPorParcela += juros[i];
    }

    const jurosDaBandeira = this.bandeira === 'Visa' ? 0 : bandeira[this.numeroDeParcelas];

    let jurosEmPorcentagem =
      taxasPorValor[this.valor] +
      somaDeJurosDaEmpresaPorParcela +
      jurosDaBandeira;

    this.jurosEmPorcentagem = jurosEmPorcentagem;
  }

  calcularJurosSobreValor() {
    const jurosEmReais = (this.valor * this.jurosEmPorcentagem) / 100;

    this.jurosEmReais = jurosEmReais;
  }

  verificarValor(limite){
    if(this.valor > limite) {
      this.erro = true
    } else {
      this.erro = false
    }
  }
}

const taxasPorValor = {
  300: 42,
  500: 32.09,
  1000: 15.99,
  1500: 13.59,
  2000: 9.89,
  2500: 8.89,
  3000: 7.99,
  3500: 7.29,
  4000: 6.99,
  4500: 6.59,
  5000: 6.49,
  5500: 6.19,
  6000: 6.09,
  7000: 5.89,
  8000: 5.59,
  9000: 5.39,
  10000: 5.19,
  12000: 4.99,
  15000: 4.79,
  20000: 4.59,
};

const juros = {
  3: 0.34,
  4: 0.33,
  5: 0.33,
  6: 0.33,
  7: 0.91,
  8: 0.33,
  9: 0.32,
  10: 0.33,
  11: 0.32,
  12: 0.31,
};

const bandeira = {
  2: 1.19,
  3: 1.19,
  4: 1.18,
  5: 1.18,
  6: 1.17,
  7: 1.07,
  8: 1.07,
  9: 1.07,
  10: 1.05,
  11: 1.05,
  12: 1.06,
};

// APLICAÇÃO NO HTML
const inputParcelas = document.querySelector(".input-parcelas");
const inputValor = document.querySelector(".input-valor");
const radioButtons = document.querySelectorAll(".flag-radio input");
const limiteInput = document.querySelector(".limite-input");
const styleError = document.querySelector("#error-color");
const limiteDisponivel = document.querySelector(".disponivel");

const mainInfo = document.querySelector(".main-info");
const valorPago = document.querySelector(".main-info h2");
const taxaAoMes = document.querySelector(".wrapper .content .taxa");
const tarifaAoMes = document.querySelector(".wrapper .content .tarifa");
const tarifaTotal = document.querySelector(".wrapper .content .tarifa-total");
const cliente = document.querySelector(".wrapper .content .cliente");
const displayValor = document.querySelector(".slider span .display-valor");
const displayParcelas = document.querySelector(
  ".slider span .display-parcelas"
);

const simulador = new Simulador(12, "Visa", 1000);

simulador.calcularPorcentagemDeJuros();
simulador.calcularJurosSobreValor();
renderizarSimulação();

limiteInput.addEventListener("input", (e) => {
  const valor = Number(e.target.value) * 12;
  limiteDisponivel.innerHTML = `R$${valor.toFixed(2).replace(".", ",")}`;
});

inputParcelas.addEventListener("input", (e) => {
  simulador.setNumeroDeParcelas(e.target.value);
  simulador.calcularPorcentagemDeJuros();
  simulador.calcularJurosSobreValor();

  renderizarSimulação();
});

inputValor.addEventListener("input", (e) => {
  simulador.setValor(conversorDeRangeParaValor[e.target.value]);
  simulador.calcularPorcentagemDeJuros();
  simulador.calcularJurosSobreValor();

  simulador.verificarValor(limiteInput.value ? Number(limiteInput.value) * 12 : 20000);

  renderizarSimulação();
});

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    simulador.setBandeira(e.target.value);
    simulador.calcularPorcentagemDeJuros();
    simulador.calcularJurosSobreValor();

    renderizarSimulação();
  });
});

function renderizarSimulação() {
  valorPago.innerHTML = `${simulador.numeroDeParcelas}x R$${(
    (simulador.valor + simulador.jurosEmReais) /
    simulador.numeroDeParcelas
  )
    .toFixed(2)
    .replace(".", ",")}`;

  taxaAoMes.innerHTML = `${(
    simulador.jurosEmPorcentagem / simulador.numeroDeParcelas
  ).toFixed(2)}%`;
  tarifaAoMes.innerHTML = `R$${String(
    (simulador.jurosEmReais / simulador.numeroDeParcelas).toFixed(2)
  ).replace(".", ",")}`;

  cliente.innerHTML = `R$${String(
    (simulador.valor - simulador.jurosEmReais).toFixed(2)
  ).replace(".", ",")}`;

  tarifaTotal.innerHTML = `R$${String(
    simulador.jurosEmReais.toFixed(2)
  ).replace(".", ",")}`;

  displayParcelas.innerHTML = `${simulador.numeroDeParcelas}x`;
  displayValor.innerHTML = `R$${String(simulador.valor.toFixed(2)).replace(
    ".",
    ","
  )}`;

  if (simulador.erro) {
    mainInfo.style.background = "#f84e10";
    displayValor.style.color = "#f84e10";
    styleError.innerHTML = `
      input[type="range"]::-webkit-slider-thumb{
        background: #f84e10;
      }
    `;
  } else {
    styleError.innerHTML = ``;
    mainInfo.style.background = "#00c039";
    displayValor.style.color = "#00c039";
  }
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
