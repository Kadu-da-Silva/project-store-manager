const generateDate = () => new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

module.exports = generateDate;