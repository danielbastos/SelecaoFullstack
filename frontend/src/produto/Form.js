import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      ...this.getInitData()
    };
  }

  componentDidMount() {
    this.setPropByState();
    this.refs.nome.focus();
  }

  getInitData() {
    return { id: null, nome: '', valor: 0 };
  }

  setPropByState() {
    if (this.props.model) {
      let data = {
        ...this.getInitData(),
        ...this.props.model
      }

      this.setState(data);
    }
  }

  setNome = (ev) => {
    this.setState({ nome: ev.target.value });
  }

  setValor = (ev) => {
    let val = parseFloat(ev.target.value.replace(/[^0-9]/g, ''))/100;
    this.setState({ valor: val });
  }

  cancel = (ev) => {
    ev.preventDefault();
    if (this.props.onClose) this.props.onClose(null);
  }

  save = (ev) => {
    ev.preventDefault();
    let self = this;
    let prom = null;

    let rec = {
      nome: this.state.nome,
      valor:this.state.valor
    };

    if (this.state.id === null) prom = axios.post('/produto', rec);
    else prom = axios.patch('/produto/' + this.state.id, rec);

    prom.then(function (response) {
      if (self.props.onClose) self.props.onClose(response.data);
    })

    prom.catch(function (er) {
      self.setState({
        errorMessage: er.response.data.code === 'E_UNIQUE' ? 'Este nome já foi cadastrado' : ''
      })
    });
  }

  render() {
    return (
      <div className="form">
        <div>{this.state.errorMessage}</div>
        <form>
          <label>
            Nome:
            <input type="text" ref="nome" value={this.state.nome} onChange={this.setNome} ></input>
          </label>

          <label>
            Valor:
            <input type="text" step="0.1" value={this.state.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} onChange={this.setValor} ></input>
          </label>

          <button onClick={this.cancel}>Cancelar</button>
          <button onClick={this.save}>Salvar</button>
        </form>
      </div>
    );
  }
}

export default Form;