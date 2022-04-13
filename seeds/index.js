const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection eror: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            //YOUR USER ID
            author: '6251e60d6772372df4517036',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident iusto sequi ipsam facere in quas illum aperiam, minima assumenda aliquid repudiandae exercitationem non nisi mollitia ducimus accusantium ut. Alias, aperiam?',
            price,
            geometry: {
                type: "Point",
                coordinates:
                    [
                        cities[random1000].longitude,
                        cities[random1000].latitude,
                    ]

            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ivanstudyapi/image/upload/v1649698045/YelpCamp/to71urasb6wcrwofjary.jpg',
                    filename: 'YelpCamp/to71urasb6wcrwofjary',

                },
                {
                    url: 'https://res.cloudinary.com/ivanstudyapi/image/upload/v1649697107/YelpCamp/pmxow6elzqjcnfj1iznl.jpg',
                    filename: 'YelpCamp/pmxow6elzqjcnfj1iznl',

                }
            ]

        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
        console.log('database close')
    })