const { PORT = 5002 } = process.env;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
