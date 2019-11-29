const express = require('express');
const debug = require('debug')('app:authorRoutes');
let Books = require('../../models/books');
const authorRouter = express.Router();


function router(nav) {
    authorRouter.route('/')
    .get((req,res) =>{
        Books.find()
            .then(Books => res.render(
                'authorView',
                {
                    nav,
                    title: 'Authors',
                    books: Books
                }
            ))
            .catch(error => res.status(400).json('Error:' + error))
    })
    return authorRouter;

}


module.exports = router;
