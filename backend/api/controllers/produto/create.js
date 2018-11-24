module.exports = {
  inputs: {
    nome: {
      type: 'string',
      required: true
    },
    valor: {
      type: 'number',
      required: true
    }
  },

  exits: {
    created: {
      statusCode: 201
    }
  },

  fn: async function (inputs, exits) {
    let res = await Produto.create({
      nome: inputs.nome,
      valor: inputs.valor
    }).fetch();

    return exits.created(res);
  }
};
