const expSchema = {
  properties: {
    title: {
      type: 'string',
      required: true
    },
    organization: {
      type: 'string',
      required: true
    },
    location: {
      type: 'string',
      required: true
    },
    dates: {
      type: 'string',
      required: true
    },
  }
}

module.exports = {
  expSchema
};