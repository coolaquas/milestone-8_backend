const express = require ('express');
const helmet = require('helmet');
require ('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const expressValidator = require ('express-validator');
const cors = require('cors');

const app= express();
app.use(helmet());

const authRoutes = require ('./routes/auth');
const userRoutes = require ('./routes/user');
const categoryRoutes = require ('./routes/category');
const productsRoutes = require ('./routes/product');




//++++++++++++++MongoDB Connection+++++++++++++++++++++++++++++++++++
const uri = `mongodb+srv://${process.env.username}:${process.env.password}@firstcluster-9xjfk.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=> console.log("DataBase Connection successful"))
.catch((err)=>console.log(err));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//++++++++++Middlewares++++++++++++++++++++++++++++++++++++++++++++
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productsRoutes);







const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});