const express = require("express");
const pastes = require("./data/pastes-data.js");
const app = express();
const pastesRouter = require("./pastes/pastes.router");

app.use(express.json());

// TODO: Follow instructions in the checkpoint to implement ths API.
app.use("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find(paste => paste.id === Number(pasteId));

  foundPaste ? res.json({ data: foundPaste }) : next(`Paste id not found: ${pasteId}`);
});

app.use("/pastes", pastesRouter);

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
