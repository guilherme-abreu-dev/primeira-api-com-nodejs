const express = require("express");
const { tasks } = require("../database/tasks");

// Cria um objeto router para definir rotas
const router = express.Router();

// Rota para buscar uma tarefa pelo ID
router.get("/buscar/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskFound = tasks.find((task) => task.id === taskId);

  return res.json(taskFound);
});

// Rota para listar todas as tarefas
router.get("/listar", (req, res) => {
  return res.json(tasks);
});

// Rota para criar uma nova tarefa
router.post("/criar", (req, res) => {
  const { description } = req.body;

  tasks.push({
    id: tasks.length + 1,
    description,
  });

  return res.status(201).json({ message: "Tarefa criada com sucesso" });
});

// Rota para remover uma tarefa pelo ID
router.delete("/remover/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskFound = tasks.find((item) => item.id === taskId);

  if (!taskFound) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tasks.splice(tasks.indexOf(taskFound), 1);
  return res.json({ message: "Tarefa removida com sucesso" });
});

// Rota para atualizar uma tarefa pelo ID
router.put("/atualizar/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description } = req.body;

  const taskToUpdate = tasks.find((task) => task.id === taskId);

  if (!taskToUpdate) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  taskToUpdate.description = description;
  return res.json({
    message: "Tarefa atualizada com sucesso",
    task: taskToUpdate,
  });
});

// Exporta as rotas configuradas para serem utilizadas em outros arquivos
module.exports = router;
