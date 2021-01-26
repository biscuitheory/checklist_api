const server = require('./server');
require('dotenv').config();

const PORT = process.env.PORT || process.env.DEV_API_PORT;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});
