const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req),
    ].join(" ");
  })
);
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

app.get("/info", (request, response) => {
  response.setHeader("content-type", "text/html");
  return response.end(`
      <div>
        <p>Phonebook has info for ${persons.length} people</p>
        ${new Date().toLocaleString()}
      </div>
    `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return response.status(404).end("Person not found");
  }
  return response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  return response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: Math.floor(Math.random() * 1000000) + "",
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  return response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(unknownEndpoint);
