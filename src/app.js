const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return response.status(201).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0)
    return response.status(400).json({ error: "Repositorie does not exists." });

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes,
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorie < 0)
    return response.status(400).json({ error: "Repositorie does not exists." });

  repositories.splice(repositorie, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0)
    return response.status(400).json({ error: "Repositorie dos not exists." });

  let { title, url, techs, likes } = repositories[repositorieIndex];

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: likes + 1,
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

module.exports = app;
