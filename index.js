const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app = express();
const exphbs = require('express-handlebars');
const members = require('./Members.js');

// app.get('/', (req,res)=> {
//     // res.send('Hello World');
//     res.sendFile(path.join(__dirname,'public','index.html'))
// });



//Init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));//handle form submissions


//HOmePage Route will showcase the bootstrap page whereas the static will be showcased by the latter one
//HomePage Route
app.get('/',(req,res) => {
    res.render('index',{
        title : 'Member App',
        members: members
    });
})
//Set static folder
app.use(express.static(path.join(__dirname,'public')));





app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port '+ PORT));


// https://ide.codingblocks.com/s/231833