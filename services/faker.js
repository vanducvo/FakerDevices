function faker(devices, generate, time){
    let intervals = new Map();
    for (let device of devices){
        let timerid = setInterval(() => {
            device.setValue(...generate());
        }, time); 
        intervals.set(device.id, timerid)
    }
    return intervals;
}

module.exports = faker;