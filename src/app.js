const yargs = require("yargs");

const { connection, client } = require("./db/connection.js");
const { addFilm, listFilms, updateFilm, deleteFilm } = require("./utils");

const app = async (yargsObj) => {
  const collection = await connection();
  if (yargsObj.add) {
    await addFilm(collection, {
      title: yargsObj.title,
      actor: yargsObj.actor,
      director: yargsObj.director,
    });
    console.log("Success, entry added");
  } else if (yargsObj.list) {
    await listFilms(collection);
  } else if (yargsObj.update) {
    let criteria = { title: yargsObj.update };

    let changes = {};

    if (yargsObj.title) {
      Object.assign(changes, { title: yargsObj.title });
    }
    if (yargsObj.actor) {
      Object.assign(changes, { actor: yargsObj.actor });
    }
    if (yargsObj.rating) {
      Object.assign(changes, { rating: yargsObj.rating });
    }
    await updateFilm(collection, criteria, changes);
  } else if (yargsObj.delete) {
    let criteria = { title: yargsObj.delete };
    await deleteFilm(collection, criteria);
  } else {
    console.log("Incorrect command");
  }

  await client.close();
};

app(yargs.argv);
