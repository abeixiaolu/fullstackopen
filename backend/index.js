require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
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

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end("Person not found");
      }
      return response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      return response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  Person.find({ name: body.name })
    .then((result) => {
      console.log("result: ", result);
      if (result.length > 0) {
        return response.status(400).json({
          error: "name must be unique",
        });
      } else {
        const person = new Person(body);
        person.save().then((savedPerson) => {
          response.json(savedPerson);
        });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;
  const id = request.params.id;
  Person.findByIdAndUpdate(id, body, { new: true })
    .then((newPerson) => {
      if (newPerson) {
        response.json(newPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// 需要放在最后，所有路由需要在它之前注册
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
