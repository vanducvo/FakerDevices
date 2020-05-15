const ramdom = require('random');

function generateValueSoilMoisture(){
	return [ramdom.int(0, 1023)];
}

exports.generateValueSoilMoisture = generateValueSoilMoisture;