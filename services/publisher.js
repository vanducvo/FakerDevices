function publisher(client, topic, devices, time){
    let intervals = new Map();
    for (let device of devices){
        let timerid = setInterval(() => {
            let message  = device.toJSON();
            let payload = Buffer.from(JSON.stringify(message));
            client.publish(topic, payload);
        }, time); 
        intervals.set(device.id, timerid)
    }

    return intervals;
}

module.exports = publisher;