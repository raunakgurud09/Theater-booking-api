export default {
  port: 1337,
  host: 'localhost',
  dbUri: 'mongodb://localhost:27017/typescript-rest-api',
  dbUriCloud:`mongodb+srv://raunak09:raunak09@cluster0.fl4iz.mongodb.net/typescript-express?retryWrites=true&w=majority`,
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
};
