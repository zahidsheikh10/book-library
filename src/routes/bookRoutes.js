const express = require('express');
const debug = require('debug')('app:bookRoutes');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodReadService');

function router(nav) {

    const { getIndex, getById, middleWare } = bookController(bookService,nav);

    bookRouter.use(middleWare);

    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
}


module.exports = router;
