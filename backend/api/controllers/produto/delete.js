module.exports = {
  inputs: {
    id : {
      type: 'string',
      required: true
    }
  },

  exits: {
    acepted: {
      statusCode: 202
    }
  },

  fn: async function (inputs, exits) {
    let res = await Produto.destroyOne({ id: inputs.id });

    return exits.acepted();
  }
};
