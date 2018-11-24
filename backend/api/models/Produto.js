module.exports = {
  attributes: {
    nome: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },

    valor: {
      type: 'number',
      required: true
    }
  },
};
