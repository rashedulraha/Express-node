import { app, port } from "./app";

const main = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
