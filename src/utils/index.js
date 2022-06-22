const { Collection } = require("mongodb");

exports.addFilm = async (collection, filmObj) => {
  try {
    const addEntry = await collection.insertOne(filmObj);
    console.log(addEntry);
  } catch (error) {
    console.log(error);
  }
};

exports.listFilms = async (collection) => {
  try {
    const filmList = await collection.find().toArray();
    console.log(filmList);
  } catch (error) {
    console.log(error);
  }
};

exports.updateFilm = async (collection, criteria, changes) => {
  try {
    // Using collection, call the in-built updateOne command using criteria as the first variable
    // And then modifying the second variable to { $set : {[Key/Value pairs to change]}}
    const updated = await collection.updateOne(criteria, { $set: changes });
    // console.log(updated);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteFilm = async (collection, criteria) => {
  try {
    const deleted = await collection.deleteOne(criteria);
  } catch (error) {
    console.log(error);
  }
};
