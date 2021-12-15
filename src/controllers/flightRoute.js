import router from '../router';
import 'dotenv/config';
import { User } from "../models/User";
import { City } from "../models/City";
import { Reserve } from "../models/Reserve";
import { Flight } from "../models/Flight";
import { getConnection, MoreThanOrEqual } from 'typeorm';
import { isAdmin, checkUser, hashPassword, sendEmail } from '../middleware';
import qs from 'querystring';





const app = router();
const port = 3000;


//array of all the airlines names
const airlines = [
    'Air Canada',
    'Air France',
    'Air New Zealand',
    'Air Transat',
    'Alaska Airlines',
    'American Airlines',
    'Delta',
    'JetBlue',
    'Southwest',
    'Spirit Airlines',
    'United',
    'Virgin America'
];



const images = [
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1519058748962-d6d8a8b5c5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1516117172874-fd2c41f4a759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1522364723953-452d3431c267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1513938709626-033611b8cc03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
]

//array of cities
const cities = [
    {
        id: 1,
        name: 'Lisbon',
        country: 'Portugal'
    },
    {
        id: 2,
        name: 'Barcelona',
        country: 'Spain'
    },
    {
        id: 3,
        name: 'Madrid',
        country: 'Spain'
    },
    {
        id: 4,
        name: 'Paris',
        country: 'France'
    },
    {
        id: 5,
        name: 'London',
        country: 'UK'
    },
    {
        id: 6,
        name: 'Rome',
        country: 'Italy'
    },
    {
        id: 7,
        name: 'Milan',
        country: 'Italy'
    },
    {
        id: 8,
        name: 'Berlin',
        country: 'Germany'
    },
    {
        id: 9,
        name: 'Prague',
        country: 'Czech Republic'
    },
    {
        id: 10,
        name: 'Barcelona',
        country: 'Spain'
    },
    {
        id: 11,
        name: 'Madrid',
        country: 'Spain'
    },
    {
        id: 12,
        name: 'Paris',
        country: 'France'
    },
    {
        id: 13,
        name: 'London',
        country: 'UK'
    },
    {
        id: 14,
        name: 'Rome',
        country: 'Italy'
    },
    {
        id: 15,
        name: 'Milan',
        country: 'Italy'
    },
    {
        id: 16,
        name: 'Berlin',
        country: 'Germany'
    },
];


const flights = [
    {
        id: 1,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '10:00',
        endingTime: '12:00',
        price: 100,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],


    },
    {
        id: 2,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '13:00',
        endingTime: '15:00',
        price: 200,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],


    },
    {
        id: 3,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '17:00',
        endingTime: '19:00',
        price: 300,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    },
    {
        id: 4,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '19:00',
        endingTime: '21:00',
        price: 400,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],


    },
    {
        id: 5,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '21:00',
        endingTime: '23:00',
        price: 500,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    },
    {
        id: 6,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '23:00',
        endingTime: '01:00',
        price: 600,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    },
    {
        id: 7,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '01:00',
        endingTime: '03:00',
        price: 700,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    },
    {
        id: 8,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '03:00',
        endingTime: '05:00',
        price: 800,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    },
    {
        id: 9,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '05:00',
        endingTime: '07:00',
        price: 900,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    },
    {
        id: 10,
        origin: cities[Math.floor(cities.length * Math.random())].name,
        destination: cities[Math.floor(cities.length * Math.random())].name,
        date: '2019-10-20',
        startingTime: '07:00',
        endingTime: '09:00',
        price: 1000,
        airline: airlines[Math.floor(airlines.length * Math.random())],
        capacity: 10,
        available: 10,
        escale: [cities[Math.floor(cities.length * Math.random())].name],
    }
];


export const home = app.get('/', async (req, res) => {
    const connection = getConnection()

    // cities.map(city => {
    //     const cityCreted = new City();
    //     cityCreted.name = city.name;
    //     cityCreted.country = city.country;
    //     connection
    //         .getRepository(City)
    //         .save(cityCreted)
    //         .then(city => {
    //             console.log(city);
    //         });
    // })

    //get random date up from today





    // flights.map(async flight => {
    //     const today = new Date();
    //     const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + Math.floor(Math.random() * 30));

    //     //get random time up from now
    //     const time = new Date(date.getTime() + Math.floor(Math.random() * (24 * 60 * 60 * 1000)));
    //     const time2 = new Date(date.getTime() + Math.floor(Math.random() * (24 * 60 * 60 * 1000)));

    //     //get random price up from now
    //     const price = Math.floor(Math.random() * 10000);
    //     //get random capacity 
    //     const capacity = Math.floor(Math.random() * 800);
    //     //get random available
    //     const available = Math.floor(Math.random() * capacity);

    //     const random =  cities.length * Math.random()
    //     const random2 =  cities.length * Math.random()
    //     const random3 =  cities.length * Math.random()
    //     const origin = Math.floor(random < 1 ? 1 :random );
    //     const destination = Math.floor(random2 < 1 ? 1 :random2 );

    //     const citi = [1, 2, 3, 4].map(i => {
    //         const random =  cities.length * Math.random()
    //         const origin = Math.floor(random < 1 ? 1 :random );
    //         return origin 
    //     })
    //     console.log(citi);

    //     let city = await connection.getRepository(City).findByIds(citi)

    //     console.log(city);
    //     const flightCreted = new Flight();
    //     flightCreted.origin = origin;
    //     flightCreted.destination = destination;
    //     flightCreted.date = date;
    //     flightCreted.startingTime = time;
    //     flightCreted.endingTime = time2;
    //     flightCreted.price = price;
    //     flightCreted.airline = flight.airline;
    //     flightCreted.capacity = capacity;
    //     flightCreted.available = available;
    //     flightCreted.escale = city
    //     connection
    //         .getRepository(Flight)
    //         .save(flightCreted)
    //         .then(flight => {
    //             console.log(flight);
    //         });
    // })


    // let flight = flights[Math.floor(flights.length * Math.random())];

    // let cities = await connection.getRepository(City).findByIds([5, 6, 7, 8])

    // const flightCreted = new Flight();
    // flightCreted.origin = Math.floor(cities.length * Math.random());
    // flightCreted.destination = Math.floor(cities.length * Math.random());;
    // flightCreted.date = flight.date;
    // flightCreted.startingTime = flight.startingTime;
    // flightCreted.endingTime = flight.endingTime;
    // flightCreted.price = flight.price;
    // flightCreted.airline = flight.airline;
    // flightCreted.capacity = flight.capacity;
    // flightCreted.available = flight.available;
    // flightCreted.escale = cities
    // connection
    //     .getRepository(Flight)
    //     .save(flightCreted)
    //     .then(flight => {
    //         console.log(flight);
    //     });




    // console.log(resultFlights);

    // const post1 = new Post();
    // post1.title = "Control flow based type analysis 1";
    // post1.text = "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
    // post1.categoryId = category1.id;
    // const post2 = new Post();
    // post2.title = "Control flow based type analysis 2";
    // post2.text = "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
    // post2.categoryId = category1.id;

    // category1.posts = [post1, post2];
    // connection
    //     .getRepository(Category)
    //     .save(category1)
    //     .then(category => {
    //         console.log("Post has been saved: ", category);
    //     });

    // const flighst = await connection
    //     .getRepository(Flight)
    //     .createQueryBuilder("Flight")
    //     .leftJoinAndSelect("Flight.escale", "City")
    //     .getMany();
    // console.log(flighst);

    res.views('home', ["youssef", "ahmed"])
});
export const about = app.get('/about', (req, res) => res.views('about', ["about page"]));


export const reservation = app.get('/reservation/:id', async (req, res) => {

    const id = req.params.id;
    if (!id) return res.views('404');
    const connection = getConnection()
    let flight = await connection
        .getRepository(Flight)
        .findOne({
            relations: ['origin', 'destination', 'escale'],
            where: {
                id: id
            }
        })

    res.views('reservation', flight)
});


export const addReservation = app.post('/reservation/:id', async (req, res) => {
    const connection = getConnection()

    const id = req.params.id;
    let body = ""
    req.on('data', (data) => {
        body += data;
    }).on('end', async () => {
        var post = qs.parse(body);
        //creating the User
        let user
        const UserExist = await connection.getRepository(User).findOne({
            where: {
                email: post.email
            }
        })

        if (!UserExist) {
            let newUser = new User();
            newUser.nom = post.firstName
            newUser.prenom = post.firstName
            newUser.password = await hashPassword(post.password)
            newUser.email = post.email
            newUser.phone = post.phone
            newUser.role = "client"
            newUser.address = post.address
            user = await connection.getRepository(User).save(newUser)
        } else {
            user = UserExist
        }

        //creating the Reservation
        let reserve = new Reserve();
        reserve.user = user
        reserve.transport = post.transport ? post.transport : 0
        reserve.hotel = post.hotel ? post.hotel : 0
        reserve.restauration = post.restauration ? post.restauration : 0
        reserve.flight = await connection.getRepository(Flight).findOne({
            where: {
                id: id
            },
            relations: ['origin', 'destination', 'escale']
        })
        reserve.finalPrice = +reserve.flight.price + +reserve.hotel + +reserve.restauration + +reserve.transport
        reserve.numberOfPassengers = post.places
        reserve = await connection
            .getRepository(Reserve)
            .save(reserve)


        let FlightUpdated = await connection
            .createQueryBuilder()
            .update(Flight)
            .set({
                available: () => `available - ${post.places}`
            })
            .where("id = :id", { id: id })
            .execute();
        res.setHeader("set-cookie", `content=${JSON.stringify({ email: user.email, password: user.password })}; Path=/;`);
        res.writeHead(301, { 'Location': '/payment/' + reserve.id });
        res.end()
    });
});

export const getFlights = app.get('/flights', async (req, res) => {
    const connection = getConnection()
    let cities = await connection.getRepository(City).find({})

    let resultFlights = await connection.getRepository(Flight).find({
        relations: ['origin', 'destination', 'escale']
    })
    res.views('flights', { flights: resultFlights, cities })
});

export const admin = app.get('/admin', async (req, res) => {

    const cookie = req.headers.cookie ? JSON.parse(req.headers?.cookie.split('=')[1]) : null;
    console.log(cookie);
    if (cookie) {
        const connection = getConnection()
        const user = await connection.getRepository(User).findOne({
            where: {
                email: cookie?.email
            }
        })
        if (cookie?.password == user?.password && isAdmin(user)) {
            const connection = getConnection()
            let resultFlights = await connection.getRepository(Flight).find({
                relations: ['origin', 'destination', 'escale']
            })
            res.views('admin', { flights: resultFlights, adminName: { nom: user.nom, prenom: user.prenom } })
        } else {
            res.setHeader("set-cookie", `content='null; Path=/;`);
            res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
            res.end()
        }
    } else {
        res.setHeader("set-cookie", `content=null; Path=/;`);
        res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
        res.end()
    }
});


export const flight = app.get('/flight/:id', async (req, res) => {
    const cookie = req.headers.cookie ? JSON.parse(req.headers?.cookie.split('=')[1]) : null;
    const connection = getConnection()
    if (cookie) {
        const user = await connection.getRepository(User).findOne({
            where: {
                email: cookie?.email
            }
        })
        if (cookie?.password == user?.password && isAdmin(user)) {
            let id = req.params.id;
            const connection = getConnection()
            let resultFlight = await connection.getRepository(Flight).findOne({
                relations: ['origin', 'destination', 'escale'],
                where: {
                    id: id
                }
            })
            let cities = await connection.getRepository(City).find({})

            res.views('flight', { flight: resultFlight, cities, airlines })
        } else {
            res.setHeader("set-cookie", `content=null; Path=/;`);
            res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
            res.end()
        }
    } else {
        res.setHeader("set-cookie", `content=null; Path=/;`);
        res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
        res.end()
    }
});


export const search = app.post('/search', async (req, res) => {
    const connection = getConnection()
    let cities = await connection.getRepository(City).find({})
    let body = ""
    req.on('data', (data) => {
        body += data;
    }).on('end', async () => {
        var post = qs.parse(body);
        let searchData = await connection
            .getRepository(Flight)
            .find({
                relations: ['origin', 'destination', 'escale'],
                where: {
                    origin: { name: post.from, },
                    destination: { name: post.to, },
                    date: MoreThanOrEqual(post.Date)
                }
            });
        res.views('flights', { flights: searchData, cities })
    });
});


export const deleteFlight = app.get('/delete/:id', async (req, res) => {

    const cookie = req.headers.cookie ? JSON.parse(req.headers?.cookie.split('=')[1]) : null;
    if (cookie) {
        const connection = getConnection()
        const user = await connection.getRepository(User).findOne({
            where: {
                email: cookie?.email
            }
        })
        if (cookie?.password == user?.password && isAdmin(user)) {
            const connection = getConnection()
            let id = req.params.id;
            let flight = await connection
                .createQueryBuilder()
                .delete()
                .from(Flight)
                .where("id = :id", { id: id })
                .execute();
            res.writeHead(301, { 'Location': '/flights' });
            res.end()
        } else {
            res.setHeader("set-cookie", `content=null; Path=/;`);
            res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
            res.end()
        }
    } else {
        res.setHeader("set-cookie", `content=null; Path=/;`);
        res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
        res.end()
    }
});

export const add = app.post('/addflight', async (req, res) => {
    const connection = getConnection()
    const cookie = req.headers.cookie ? JSON.parse(req.headers?.cookie.split('=')[1]) : null;
    if (cookie) {
        const connection = getConnection()
        const user = await connection.getRepository(User).findOne({
            where: {
                email: cookie?.email
            }
        })
        if (cookie?.password == user?.password && isAdmin(user)) {
            let body = ""
            req.on('data', (data) => {
                body += data;
            }).on('end', async () => {
                var post = qs.parse(body);

                post.escale = []

                let createFlight = await connection
                    .getRepository(Flight)
                    .save(post);
                res.writeHead(301, { 'Location': '/flights' });
                res.end()
            });
        } else {
            res.setHeader("set-cookie", `content=null; Path=/;`);
            res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
            res.end()
        }
    } else {
        res.setHeader("set-cookie", `content=null; Path=/;`);
        res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
        res.end()
    }
});


export const updateFlight = app.post('/updateflight/:id', async (req, res) => {
    const connection = getConnection()

    const id = req.params.id;
    let body = ""
    req.on('data', (data) => {
        body += data;
    }).on('end', async () => {
        var post = qs.parse(body);
        let FlightUpdated = await connection
            .createQueryBuilder()
            .update(Flight)
            .set({ ...post })
            .where("id = :id", { id: id })
            .execute();
    });
    res.writeHead(301, { 'Location': '/flights' });
    res.end()
});


export const Adminlogin = app.get('/login', async (req, res) => {
    res.views('login')
});

export const submitLogin = app.post('/login', async (req, res) => {
    const connection = getConnection()
    let body = ""
    req.on('data', (data) => {
        body += data;
    }).on('end', async () => {
        var { email, password } = qs.parse(body);
        const user = await connection.getRepository(User).findOne({
            where: {
                email: email
            }
        });
        if (await checkUser(password, user.password)) {
            let cookie = JSON.stringify({ email: user.email, password: user.password })
            res.setHeader("set-cookie", `content=${cookie}; Path=/;`);
            user.role == "admin" ? res.writeHead(301, { 'Location': '/admin' }) : res.writeHead(301, { 'Location': '/flights' });
            res.end()

        } else {
            res.setHeader("set-cookie", `content=null; Path=/;`);
            res.writeHead(301, { 'Set-Cookie': null, 'Location': '/login' });
            res.end()
        }
    });

}
);
export const paymentPage = app.get('/payment/:id', async (req, res) => {
    const id = req.params.id;
    const connection = getConnection()
    const reservation = await connection.getRepository(Reserve).findOne({
        where: {
            id: id

        },
        relations: ['flight', 'user']
    })
    res.views('payment', reservation)
});


export const tickt = app.get('/ticket/:id', async (req, res) => {
    const id = req.params.id;
    const connection = getConnection()
    const reservation = await connection.getRepository(Reserve).findOne({
        where: {
            id: id

        },
        relations: ['flight', 'user', 'flight.origin', 'flight.destination']
    })

    const cookie = req.headers.cookie ? JSON.parse(req.headers?.cookie.split('=')[1]) : null;
    if (cookie) {
        const user = await connection.getRepository(User).findOne({
            where: {
                email: cookie.email
            }
        })

        if (user?.code == reservation?.user?.code) {
            sendEmail(reservation.user.email, "http://localhost:5000/ticket/" + id)
            res.views('ticket', reservation)
        } else {
            res.setHeader("set-cookie", `content=null; Path=/;`);
            res.writeHead(301, { 'Location': '/login' });
            res.end()
        }
    } else {
        res.setHeader("set-cookie", `content=null; Path=/;`);
        res.writeHead(301, { 'Location': '/login' });
        res.end()
    }
});






