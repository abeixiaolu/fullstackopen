const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const contactName = process.argv[3];
const contactNumber = process.argv[4];

const url = `mongodb+srv://xiaoluabei:${password}@cluster0.jgfjy.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (contactName && contactNumber) {
  const person = new Person({
    name: contactName,
    number: contactNumber,
  });

  person.save().then((result) => {
    console.log("result: ", result);
    console.log(`added ${contactName} number ${contactNumber} to phoneBook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
