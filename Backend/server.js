const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;
const { initializeSocket } = require('./socket')

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, "0.0.0.0",() => {
  console.log(`server running on port ${PORT}`);
});
