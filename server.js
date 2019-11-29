const express = require('express');
const mongoose = require('mongoose');
const chalk =  require('chalk');
const debug = require('debug')('app');
const morgan =  require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret : 'library'}));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', "./src/views");
app.set('view engine', 'pug');
app.set('view engine', 'ejs');


// mongoDB config
const uri = require('./setup/myurl').mongoURL
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

// Connect to Database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established sucessfully");
})


const nav = [
    {link: '/books',title: 'Books'},
    {link: '/author',title: 'Authors' }
];



// Serving a static html file
app.get('/index',(req,res) => {
    res.sendFile(path.join(__dirname,'views/index.html'));
});

// render a pug file
app.get('/pug', (req, res) => {
    res.render('index.pug',{
        heading:'Book Library App',
        list:['a','b']
    });
});

//render a ejs file
app.get('/ejs',(req,res)=>{
    res.render('indexEjs.ejs', {
        heading: 'Book Library App',
        list: ['a', 'b']
    });
});

//render a bootstrap template file
app.get('/', (req, res) => {
    res.render('bookHome', {
        title: 'Book Library',
        heading: 'Book Library App',
        nav: [
            {
                link: '/books',
                title: 'Books'
            },
            {
                link: '/author',
                title: 'Authors'
            }
        ]
    });
});


//Routes for user sign up
const authRouter = require('./src/routes/authRoutes')(nav);
app.use('/auth', authRouter);
 

//Routes for books
const bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/books',bookRouter);

//Routes for Author
const authorRouter = require('./src/routes/authorRoutes')(nav);
app.use('/author', authorRouter);


//Routes for admin inserting books
const adminRouter = require('./src/routes/adminRoutes')(nav);
app.use('/admin', adminRouter);

app.listen(port,() => {debug(`Server is up and running on port : ${chalk.green(port)}`)});
