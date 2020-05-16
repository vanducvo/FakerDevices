const ramdom = require('random');

function generateValueSoilMoisture(){
	return [ramdom.int(0, 1023)];
}

function generateValueGPS(){
	return [ramdom.int(0, 360), ramdom.int(0, 360)];
}

function conditionMotor(payload, topic){
	if (
		!payload.value[0].match(/[0-1]/) || 
		!payload.value[1].match(/[1-3]/) || 
		topic !== 'T_4'
	){
		return 0;
	}

	let id = payload.device_id;
	let extract = id.match(/^id(\d+)_(\d+)$/);
	if(extract[1] === '9'){
		return Number(extract[2]) || 0;
	}

	return 0;
}

function extractorMotor(payload){
	return [Number(payload.value[1]), Number(payload.value[0])]
}

exports.generateValueSoilMoisture = generateValueSoilMoisture;
exports.generateValueGPS = generateValueGPS;
exports.conditionMotor = conditionMotor;
exports.extractorMotor = extractorMotor;