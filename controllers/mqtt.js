const mqtt = require('mqtt');
const logger = require('../utils/logger');

let client = null;
/**
 * @param {String} url 
 * @param {Array.<String>} topics  topic[0] is subcribe, topic[1] is publisher
 * @param {string} username 
 * @param {string} password
 * @returns Broker Object
 * @description Connect To EMQX Broker
 */
function connect(url, topics, AppID, username, password){
    client = mqtt.connect(url, {
        clientId: AppID,
        username: username,
        password: password
    });

    for (let topic of topics){
        client.subscribe(topic, function(err){
            if(err){
                logger.error(err);
            }
        });
    }

    return client;
}

/**
 * @description Get Broker Object
 * @returns Broker Object
 */
function getBroker(){
    if(client){
        return client;
    }

    logger.error('Not Connect to Borker! Please connect before get');
}

module.exports = getBroker;
module.exports.connect = connect;
module.exports.getBroker = getBroker