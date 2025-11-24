import query from "../models/db";

async function init() {
  return await query(`
    START TRANSACTION;
    DROP TABLE IF EXISTS usuario;
    CREATE TABLE IF NOT EXISTS usuario (
      id serial PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      telefone VARCHAR(20) NOT NULL,
      data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    COMMIT;
  `);
}

init()
  .then((r) => console.log(r))
  .catch((e) => console.log(e));