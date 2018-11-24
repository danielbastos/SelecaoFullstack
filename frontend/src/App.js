import React, { Component } from 'react';
import './App.css';
import Form from './produto/Form';
import Grid from './produto/Grid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 'search',
      model: null
    };
  }

  onFormClose = (model) => {
    console.log('onFormClose', model);
    this.setState({ model: model }, () => this.setState({ current: 'search' }));
  }

  onAdd = () => {
    this.setState({ current: 'form', model: null });
  }

  onEdit = (model) => {
    this.setState({ current: 'form', model: model });
  }

  render() {
    let view;
    if (this.state.current === 'search') {
      view = ''
    } else {
      view = <Form model={this.state.model} onClose={this.onFormClose} ></Form>
    }

    return (
      <div className="App">
        {view}
        <div className={this.state.current === 'search' ? '' : 'hidden'} >
          <Grid model={this.state.model} onAdd={this.onAdd} onEdit={this.onEdit}></Grid>
        </div>
      </div>
    );
  }

}

export default App;
