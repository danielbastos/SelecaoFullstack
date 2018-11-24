import React from 'react';
import axios from 'axios';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      page: 1,
      order: 'nome',
      current: null,
      records: {
        data: [],
        count: 0
      }
    };
    this.search();
  }

  componentWillReceiveProps() {
    if (this.props.model && this.props.model !== this.state.current) {
      this.search();
    }
  }

  setOrder = (fieldName) => {
    this.setState({ order: fieldName }, () => this.search());
  }

  getColHeaderCssClass = (fieldName) => {
    return 'col-header col-' + fieldName + '-header ' + (this.state.order === fieldName ? 'col-order' : '');
  }

  getColCssClass = (fieldName) => {
    return 'col-cell col-' + fieldName + '-cell ';
  }

  onChangeFilder = (event) => {
    this.setState({ term: event.target.value, page: 1 }, () => this.search());
  }

  add = () => {
    if (this.props.onAdd)
      this.setState({ current: null }, () => this.props.onAdd());
  }

  edit = (rec) => {
    if (this.props.onEdit) 
      this.setState({ current: rec }, () => this.props.onEdit(rec));
  }

  remove = (rec) => {
    let prom = axios.delete('/produto/' + rec.id);

    let self = this;
    prom.then(function (response) {
      self.search()
    });
  }

  previous = (ev) => {
    if (this.state.page > 1)
      this.setState({ page: this.state.page - 1 }, () => this.search());
  }

  next = (ev) => {
    if (this.state.page * 10 < Math.ceil(this.state.records.count))
      this.setState({ page: this.state.page + 1 }, () => this.search());
  }

  search () {
    let searchParams = {
      nome: this.state.term,
      order: this.state.order,
      page: this.state.page
    };
    let prom = axios.get('/produto', { params: searchParams });

    let self = this;
    prom.then(function (response) {
      self.setState({ records: response.data });
    });

    prom.catch(function (er) {
      self.setState({ records: { data: [], count: 0 } });
    });
  }

  render() {
    return (
      <div className="grid">
        <div className='grid-header'>
          <button onClick={(e) => this.add()} type="submit">Adicionar</button>
          <input type="text" ref="finder" placeholder='Digite aqui sua pesquisa' onChange={this.onChangeFilder}></input>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={(e) => this.setOrder('id')} className={this.getColHeaderCssClass('id')}>ID</th>
              <th onClick={(e) => this.setOrder('nome')} className={this.getColHeaderCssClass('nome')}>Nome</th>
              <th onClick={(e) => this.setOrder('valor')} className={this.getColHeaderCssClass('valor')}>Valor</th>
              <th className='col-header col-acao-header'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.data.map((rec, i) =>
              <tr key={i}>
                <td className={this.getColCssClass('id')}>{rec.id}</td>
                <td className={this.getColCssClass('nome')}>{rec.nome}</td>
                <td className={this.getColCssClass('valor')}>{rec.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='col-cell col-acao-cell'>
                  <button onClick={(e) => this.edit(rec)} type="submit">Editar</button>
                  <button onClick={(e) => this.remove(rec)} type="submit">Excluir</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className='grid-footer'>
          {this.state.records.count} resultados
        <button onClick={this.previous} type="submit">Voltar</button>
          <button onClick={this.next} type="submit">Avançar</button>
        </div>
      </div>
    );
  }
}

export default Grid;