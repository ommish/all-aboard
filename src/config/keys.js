module.exports = process.env.NODE_ENV === "production" ? require('./pro') : require('./dev');
