const graphql = require("graphql");
const express = require("express");
//const bookCollection = require("./models/book");
//const Author = require("./models/author");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
/*const path = require("path");
const dbPath = path.join(__dirname, "booksData.db");*/
const database = new sqlite3.Database("./booksData_copy.db");
let db = null;
const ConnectDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("SQLite Database connected");
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
var bok = [
  {
    book_id: 1,
    title: "Harry Potter and the Sorcerers Stone",
    description:
      "Harry Potters life is miserable. His parents are dead and hes stuck with his heartless relatives.",
    rating: 4.48,
    price: 750,
  },
  {
    book_id: 2,
    title: "Harry Potter and the Deathly Hallows",
    description: "Harry Potter is leaving Privet Drive for the last time.",
    rating: 4.62,
    price: 800,
  },
  {
    book_id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    description:
      "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black.",
    rating: 4.57,
    price: 900,
  },
  {
    book_id: 4,
    title: "Harry Potter and the Chamber of Secrets",
    description: "Ever since Harry Potter had come home for the summer.",
    rating: 4.43,
    price: 850,
  },
];
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLID,
  GraphQList,
} = graphql;
const _ = require("lodash");

const AuthorType = new GraphQLObjectType({
  name: "authors",
  fields: () => ({
    author_id: { type: GraphQLInt },
    author_name: { type: GraphQLString },
    birth_place: { type: GraphQLString },

    follower_count: { type: GraphQLInt },
    about_author: { type: GraphQLString },
  }),
});

const BookType = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    book_id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    rating: { type: GraphQLString },
    price: { type: GraphQLInt },
    author_id: { type: GraphQLInt },
  }),
});

const BookQuery = new GraphQLObjectType({
  name: "BookQueryType",
  fields: {
    book: {
      type: BookType,
      args: { book_id: { type: GraphQLInt } },
      resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all(
            `SELECT * FROM book WHERE book_id=${args.book_id};`,
            function (err, rows) {
              if (err) {
                reject(["hi"]);
              }
              resolve();
            }
          );
        });
      },
    },
    /*author: {
      type: AuthorType,
      args: { author_id: { type: GraphQLInt } },
      resolve(parent, args) {
        const re = _.find(author, { author_id: args.book_id });
        console.log(re);
        return re;
      },
    },*/
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        author_id: { type: GraphQLInt },
        author_name: { type: GraphQLString },
        birth_place: { type: GraphQLString },
        follower_count: { type: GraphQLInt },
        about_author: { type: GraphQLString },
      },
      resolve(parent, args) {
        let author = new Author({
          author_id: args.author_id,
          author_name: args.author_name,
          birth_place: args.birth_place,
          follower_count: args.follower_count,
          about_author: args.about_author,
        });
        author.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: BookQuery,
  //query: Mutation,
});
