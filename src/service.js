const { PORT } = require('./');
const app = require('./server.js');

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
