class Conversor {
  constructor() {
    this._$ = document.querySelector.bind(document);
    this._valor1 = this._$('#numero1');
    this._conversao = this._$('#conversao');
    this._fromCurrency = this._$('#moeda1');
    this._toCurrency = this._$('#moeda2');
    this._rate = this._$('#rate');
  }

  _adicionarConversao() {
    this._converter();
  }

  _converter() {
    fetch(
      `https://api.exchangerate-api.com/v4/latest/${this._fromCurrency.value}`
    )
      .then(res => res.json())
      .then(res => {
        const rate = res.rates[this._toCurrency.value];
        this._conversao.innerHTML = (this._valor1.value * rate).toFixed(2);
        this._rate.textContent = `1 ${this._fromCurrency.value} = ${rate} ${
          this._toCurrency.value
        }`;
      });
  }

  _trocarValores() {
    const primeiroValor = this._fromCurrency.value;
    this._fromCurrency.value = this._toCurrency.value;
    this._toCurrency.value = primeiroValor;
    this._converter();
  }
}

const conversor = new Conversor();
