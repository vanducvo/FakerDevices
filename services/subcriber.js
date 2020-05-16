function subcriber(client, devices, condition, extractor){
    client.on('message', function (topic, message){
        try{
            let payload = JSON.parse(message.toString());
            let id = condition(payload, topic);
            let device = devices.get(id);
            if(device){
                device.setValue(...extractor(payload));
            }
        } catch(err) {
            console.log('error:', err.message);
            console.log('with payload:', message.toString());
        }
    });
}

module.exports = subcriber;