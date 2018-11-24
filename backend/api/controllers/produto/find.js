module.exports = {
  inputs: {
    nome: {
      type: 'string',
    },
    order: {
      type: 'string',
    },
    page: {
      type: 'number'
    }
  },

  exits: {
    ok: {
      statusCode: 200
    }
  },

  fn: async function (inputs, exits) {
    let res =  {
      data: await Produto.find({ nome: { 'contains': inputs.nome } }).sort(inputs.order+' ASC').limit(10).skip((inputs.page * 10) -10),
      count: await Produto.count({ nome: { 'contains': inputs.nome } })
    }

    return exits.ok(res)
  }
};
