const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoose works")
    })
    .catch(err => {
        console.log("oh no error")
    })
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    engine: String,
    horsepower: Number,
    imageUrl: String
});

const Car = mongoose.model('Car', carSchema);
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.render('cars.ejs', { cars });
    } catch (error) {
        console.error("Error fetching cars from MongoDB:", error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.render('home.ejs', { cars });
    } catch (error) {
        console.error("Error fetching cars from MongoDB:", error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error("Error fetching cars from MongoDB:", error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/cars', async (req, res) => {
    const car = new Car(req.body);
    await car.save();
    res.redirect('/cars');
});
app.post('/deleteCar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Car.findByIdAndDelete(id);
        res.redirect('/cars');
    }
    catch (error) {
        console.error("Error fetching cars from MongoDB:", error);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
});



