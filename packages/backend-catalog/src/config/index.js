module.exports = {
  steam: true,
  xbox: true,
  psn: true,
  getActive: function() {
    return Object.keys(this).filter(key => key !== 'getActive' && this[key])
  },
}
