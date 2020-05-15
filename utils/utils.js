const ramdom = require('random');

function generateValueSoilMoisture(){
	return [ramdom.int(0, 1023)];
}

function generateValueGPS(){
	return [ramdom.int(0, 360), ramdom.int(0, 360)];
}

exports.generateValueSoilMoisture = generateValueSoilMoisture;
exports.generateValueGPS = generateValueGPS