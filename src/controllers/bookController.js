let Books = require('../../models/books');
const debug = require('debug')('app:bookController');
const express = require('express');


function bookController(bookService,nav) {
    function getIndex(req, res){
        Books.find()
            .then(Books => res.render(
                'bookListView',
                {
                    nav,
                    title: 'Library',
                    books: Books
                }
            ))
            .catch(error => res.status(400).json('Error:' + error))
    }
   async function getById(req, res){ 
        Books.findById(req.params.id)
            .then( async book => {
                //Fetch book id from the database 
                // and based on that id fetch book details from good read service. 
                book.details = await bookService.getBookById(book.bookId);
                res.render(
                    'bookView',
                    {
                        nav,
                        title: 'Library',
                        book: book,
                        bookDetails: book.details
                    }
                )
            })
            .catch(error => res.status(400).json('Error:' + error))
        
    }
    function middleWare(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
    
    return{
        getIndex,
        getById,
        middleWare
    }
}
module.exports = bookController;