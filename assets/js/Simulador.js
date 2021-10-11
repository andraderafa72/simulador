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
  // 5, 5000
  calcularPorcentagemDeJuros() {
    console.log('n', this.numeroDeParcelas);
    if(this.numeroDeParcelas < 3){
      console.log('passou');
      this.jurosEmPorcentagem = taxasPorValor[this.valor];
      return;
    }

    let somaDeJurosDaEmpresaPorParcela = 0;
    for (let i = 3; i <= this.numeroDeParcelas; i++) {
      somaDeJurosDaEmpresaPorParcela += juros[i];
    }

    const chaveDaBandeira =
      "Elo" || "American Express" || "Hipercard" ? "Elo" : "Visa";
    const jurosDaBandeira = bandeira[chaveDaBandeira][this.numeroDeParcelas];

    let jurosEmPorcentagem =
      taxasPorValor[this.valor] +
      somaDeJurosDaEmpresaPorParcela +
      jurosDaBandeira;

    console.log(
      jurosEmPorcentagem,
      taxasPorValor[this.valor],
      somaDeJurosDaEmpresaPorParcela,
      jurosDaBandeira
    );

    this.jurosEmPorcentagem = jurosEmPorcentagem;
  }

  calcularJurosSobreValor() {
    const jurosEmReais = (this.valor * this.jurosEmPorcentagem) / 100;

    this.jurosEmReais = jurosEmReais;
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
  Elo: {
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
  },
};
