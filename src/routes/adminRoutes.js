const express = require('express');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
let Books = require('../../models/books');
const books = [
  {
    bookId: 656,
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    bookId: 24280,
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    bookId: 656,
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    bookId: 656,
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    bookId: 656,
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    bookId: 656,
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  { 
    bookId: 656,
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  { 
    bookId: 656,
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      Books.insertMany(books)
        .then(() => res.json(books))
        .catch(error => res.status(400).json('Error:' + error))
    });
  return adminRouter;
}

module.exports = router;
