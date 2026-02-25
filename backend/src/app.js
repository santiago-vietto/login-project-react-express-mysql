const app = require("./server/server");
require('dotenv').config();

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))