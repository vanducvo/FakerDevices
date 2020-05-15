require('dotenv').config();

const {connect, getBroker} = require('./controllers/mqtt');
const faker = require('./services/faker');
const publisher = require('./services/publisher');

const SoilMoisture = require('./devices/SoilMoisture');
const utils = require('./utils/utils');

//Enviroment
let url = process.env.MQTT_SERVER;
let topics = [process.env.SUBCRIBE_TOPIC, process.env.PUBLISH_TOPIC];
let clientID = process.env.CLIENT_ID;
let clientName = process.env.CLIENT_NAME;
let clientPassword = process.env.CLIENT_PASSWORD
let timeChange = Number(process.env.TIME_CHANGE);
let timeSend = Number(process.env.TIME_SEND);

let sM = new Map();
let nSM = Number(process.env.SOIL_MOISTURE);

for(let i = 1; i <= nSM; i++){
    sM.set(i, new SoilMoisture(i));
}

faker(sM.values(), utils.generateValueSoilMoisture, timeChange);

connect(url, topics, clientID, clientName, clientPassword);

publisher(getBroker(), topics[0], sM.values(), timeSend);