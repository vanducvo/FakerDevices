require('dotenv').config();

const express = require('express');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

// Template
app.set('view engine', 'ejs');
app.use('/public', serveStatic(path.resolve(__dirname, 'public')));

const {connect, getBroker} = require('./controllers/mqtt');
const faker = require('./services/faker');
const publisher = require('./services/publisher');
const subcriber = require('./services/subcriber');

const SoilMoisture = require('./devices/SoilMoisture');
const GPS = require('./devices/GPS');
const Motor = require('./devices/Motor');
const utils = require('./utils/utils');

// Enviroment
let url = process.env.MQTT_SERVER;
let topics = [process.env.PUBLISH_TOPIC, process.env.SUBCRIBE_TOPIC];
let clientID = process.env.CLIENT_ID;
let clientName = process.env.CLIENT_NAME;
let clientPassword = process.env.CLIENT_PASSWORD
let timeChange = Number(process.env.TIME_CHANGE);
let timeSend = Number(process.env.TIME_SEND);

// Server
connect(url, topics[1], clientID, clientName, clientPassword);

// SoilMoisture
let sM = new Map();
let nSM = Number(process.env.SOIL_MOISTURE);

for(let i = 1; i <= nSM; i++){
    let device = new SoilMoisture(i);
    device.on('change', data => io.emit('smchange', data));
    sM.set(i, device);
}

faker(sM.values(), utils.generateValueSoilMoisture, timeChange);

publisher(getBroker(), topics[0], sM.values(), timeSend);

// GPS
let gps = new Map();
let nGps = Number(process.env.GPS);

for(let i = 1; i <= nGps; i++){
    let device = new GPS(i);
    device.on('change', data => io.emit('gchange', data));
    gps.set(i, device);
}

faker(gps.values(), utils.generateValueGPS, timeChange);

publisher(getBroker(), topics[0], gps.values(), timeSend);

// Motor
let motor = new Map();
let nMotor = Number(process.env.MOTOR);

for(let i = 1; i <= nMotor; i++){
    let device = new Motor(i);
    device.on('change', data => io.emit('mchange', data));
    motor.set(i, device);
}

subcriber(getBroker(), motor, utils.conditionMotor, utils.extractorMotor);

app.get('/', function(req, res){
    res.render('index.ejs', {
        g_devices: gps.values(),
        sm_devices: sM.values(),
        m_devices: [...motor.values()]
    });
});

app.post('/control', bodyParser.json(), function(req, res){
    let data = req.body;
    let device = motor.get(data.id);
    device.setValue(data.level, data.status);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(8888, () => {
    console.log('http://localhost:8888')
});