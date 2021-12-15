const { open } = require("sqlite");
const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "booksData.db");
const app = express();

let db;
var bok = [
  {
    book_id: 1,
    title: "Harry Potter and the Sorcerers Stone",
    description:
      "Harry Potters life is miserable. His parents are dead and hes stuck with his heartless relatives.",
    rating: 4.48,
    price: 750,
    author_id: 1,
  },
  {
    book_id: 2,
    title: "Harry Potter and the Deathly Hallows",
    description: "Harry Potter is leaving Privet Drive for the last time.",
    rating: 4.62,
    price: 800,
    author_id: 1,
  },
  {
    book_id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    description:
      "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black.",
    rating: 4.57,
    price: 900,
    author_id: 1,
  },
  {
    book_id: 4,
    title: "Harry Potter and the Chamber of Secrets",
    description: "Ever since Harry Potter had come home for the summer.",
    rating: 4.43,
    price: 850,
    author_id: 1,
  },
  {
    book_id: 5,
    title: "Harry Potter and the Goblet of Fire",
    description:
      "Harry Potter is midway through his training as a wizard and his coming of age.",
    rating: 4.56,
    price: 900,
    author_id: 1,
  },
  {
    book_id: 6,
    title: "A Study in Scarlet",
    description:
      "A Study in Scarlet is the first published story of one of the most famous literary detectives of all time, Sherlock Holmes.",
    rating: 4.15,
    price: 850,
    author_id: 2,
  },
  {
    book_id: 7,
    title: "The Hound of the Baskervilles",
    description:
      "We owe The Hound of the Baskervilles (1902) to Arthur Conan Doyles good friend Fletcher.",
    rating: 4.12,
    price: 750,
    author_id: 2,
  },
  {
    book_id: 8,
    title: "The Adventures of Sherlock Holmes",
    description:
      "The Adventures of Sherlock Holmes is the series of short stories that made the fortunes of the Strand magazine.",
    rating: 4.3,
    price: 900,
    author_id: 2,
  },
  {
    book_id: 9,
    title: "The Complete Sherlock Holmes",
    description: "Adventures of Sherlock Holmes : A scandal in Bohemia.",
    rating: 4.47,
    price: 1000,
    author_id: 2,
  },
  {
    book_id: 10,
    title: "The Sign of Four",
    description:
      "As a dense yellow fog swirls through the streets of London, a deep melancholy has descended on Sherlock Holmes.",
    rating: 3.93,
    price: 600,
    author_id: 2,
  },
  {
    book_id: 11,
    title: "The Hobbit, or There and Back Again",
    description:
      "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole.",
    rating: 4.28,
    price: 950,
    author_id: 3,
  },
  {
    book_id: 12,
    title: "The Fellowship of the Ring",
    description:
      "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkeness bind them.",
    rating: 4.37,
    price: 750,
    author_id: 3,
  },
  {
    book_id: 13,
    title: "The Two Towers",
    description:
      "Frodo and his Companions of the Ring have been beset by danger.",
    rating: 4.45,
    price: 650,
    author_id: 3,
  },
  {
    book_id: 14,
    title: "The Return of the King",
    description:
      "In the third volume of The Lord of the Rings trilogy the good and evil forces join battle.",
    rating: 4.53,
    price: 1050,
    author_id: 3,
  },
  {
    book_id: 15,
    title: "The Lord of the Rings",
    description:
      "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power.",
    rating: 4.5,
    price: 850,
    author_id: 3,
  },
  {
    book_id: 16,
    title: "Angels & Demons",
    description:
      "World-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a cryptic symbol.",
    rating: 3.91,
    price: 950,
    author_id: 4,
  },
  {
    book_id: 17,
    title: "The Da Vinci Code",
    description:
      "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night.",
    rating: 3.87,
    price: 950,
    author_id: 4,
  },
  {
    book_id: 18,
    title: "Deception Point",
    description:
      "A shocking scientific discovery.A conspiracy of staggering brilliance.",
    rating: 3.72,
    price: 850,
    author_id: 4,
  },
  {
    book_id: 19,
    title: "Digital Fortress",
    description:
      "When the National Security Agencys invincible code-breaking machine encounters a mysterious code it cannot break.",
    rating: 3.67,
    price: 750,
    author_id: 4,
  },
  {
    book_id: 20,
    title: "The Lost Symbol",
    description:
      "In this stunning follow-up to the global phenomenon The Da Vinci Code.",
    rating: 3.72,
    price: 1050,
    author_id: 4,
  },
  {
    book_id: 21,
    title: "Romeo and Juliet",
    description:
      "In Romeo and Juliet, Shakespeare creates a violent world, in which two young people fall in love.",
    rating: 3.75,
    price: 1200,
    author_id: 5,
  },
  {
    book_id: 22,
    title: "Hamlet",
    description:
      "Among Shakespeares plays, Hamlet is considered by many his masterpiece. ",
    rating: 4.03,
    price: 980,
    author_id: 5,
  },
  {
    book_id: 23,
    title: "Macbeth",
    description:
      "One night on the heath, the brave and respected general Macbeth encounters three witches.",
    rating: 3.91,
    price: 1500,
    author_id: 5,
  },
  {
    book_id: 24,
    title: "A Midsummer Nights Dream",
    description:
      "Shakespeares intertwined love polygons begin to get complicated from the start.",
    rating: 3.95,
    price: 1100,
    author_id: 5,
  },
  {
    book_id: 25,
    title: "Twilight",
    description: "About three things I was absolutely positive.",
    rating: 3.61,
    price: 1400,
    author_id: 6,
  },
  {
    book_id: 26,
    title: "Eclipse",
    description: "Edwards soft voice came from behind me. ",
    rating: 3.7,
    price: 1050,
    author_id: 6,
  },
  {
    book_id: 27,
    title: "New Moon",
    description: "I knew we were both in mortal danger.",
    rating: 3.55,
    price: 1150,
    author_id: 6,
  },
  {
    book_id: 28,
    title: "Breaking Dawn",
    description: "I was abruptly overwhelmed by the truth of my own words.",
    rating: 3.7,
    price: 1300,
    author_id: 6,
  },
  {
    book_id: 29,
    title: "And Then There Were None",
    description:
      "First, there were ten a curious assortment of strangers summoned as weekend guests.",
    rating: 4.26,
    price: 1500,
    author_id: 6,
  },
  {
    book_id: 30,
    title: "The Mysterious Affair at Styles",
    description:
      "Agatha Christies debut novel was the first to feature Hercule Poirot.",
    rating: 3.98,
    price: 1550,
    author_id: 7,
  },
  {
    book_id: 31,
    title: "Murder on the Orient Express",
    description:
      "Just after midnight, a snowdrift stops the Orient Express in its tracks.",
    rating: 4.18,
    price: 1350,
    author_id: 7,
  },
  {
    book_id: 32,
    title: "Murder at the Vicarage",
    description: "It was a careless remark for a man of the cloth.",
    rating: 4.06,
    price: 1250,
    author_id: 7,
  },
  {
    book_id: 33,
    title: "The Immortals of Meluha",
    description:
      "1900 BC. In what modern Indians mistakenly call the Indus Valley Civilisation.",
    rating: 4.1,
    price: 1200,
    author_id: 7,
  },
  {
    book_id: 34,
    title: "The Secret of the Nagas",
    description:
      "The hunt is on. The sinister Naga warrior has killed his friend Brahaspati and now stalks his wife Sati",
    rating: 4.07,
    price: 750,
    author_id: 8,
  },
  {
    book_id: 35,
    title: "The Oath of the Vayuputras",
    description:
      "Shiva is gathering his forces. He reaches the Naga capital, Panchavati, and Evil is finally revealed.",
    rating: 3.79,
    price: 650,
    author_id: 8,
  },
  {
    book_id: 36,
    title: "Scion of Ikshvaku",
    description:
      "Ram Rajya. The Perfect Land. But perfection has a price. He paid that price.",
    rating: 3.82,
    price: 850,
    author_id: 8,
  },
  {
    book_id: 37,
    title: "The 3 Mistakes of My Life",
    description:
      "Six friends work nights at a call center in India, providing technical support for a major U.S.",
    rating: 3.03,
    price: 950,
    author_id: 9,
  },
  {
    book_id: 38,
    title: "One Night at the Call Center",
    description: "Once upon a time, there was a Bihari boy called Madhav.",
    rating: 2.51,
    price: 750,
    author_id: 9,
  },
  {
    book_id: 39,
    title: "Half Girlfriend",
    description:
      "In his latest book, What Young India Wants, Chetan Bhagat asks hard questions, demands answers and presents solutions for a better, more prosperous India.",
    rating: 3.14,
    price: 900,
    author_id: 9,
  },
  {
    book_id: 40,
    title: "What Young India Wants",
    description:
      "Love marriages around the world are simple: Boy loves girl. Girl loves boy.",
    rating: 3.27,
    price: 1000,
    author_id: 9,
  },
];

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
b();
