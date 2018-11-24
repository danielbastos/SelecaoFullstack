module.exports = {
  inputs: {
    id : {
      type: 'string',
      required: true
    },
    nome: {
      type: 'string',
      required: true
    },
    valor: {
      type: 'number',
      required: false
    }
  },

  exits: {
    success: {
      description: 'Created'
    }
  },

  fn: async function (inputs, exits) {
    let res = await Produto.update({ id: inputs.id }).set({
      nome: inputs.nome,
      valor: inputs.valor1
    }).fetch();

    return exits.success(res[0]);
  }
};
