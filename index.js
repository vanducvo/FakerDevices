require('dotenv').config();

const {connect, getBroker} = require('./controllers/mqtt');
const faker = require('./services/faker');
const publisher = require('./services/publisher');

const SoilMoisture = require('./devices/SoilMoisture');
const GPS = require('./devices/GPS');
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
    device.on('change', data => console.log('Change', data));
    sM.set(i, device);
}

faker(sM.values(), utils.generateValueSoilMoisture, timeChange);

publisher(getBroker(), topics[0], sM.values(), timeSend);

// GPS
let gps = new Map();
let nGps = Number(process.env.GPS);

for(let i = 1; i <= nGps; i++){
    let device = new GPS(i);
    device.on('change', data => console.log('Change', data));
    gps.set(i, device);
}

faker(gps.values(), utils.generateValueGPS, timeChange);

publisher(getBroker(), topics[0], gps.values(), timeSend);