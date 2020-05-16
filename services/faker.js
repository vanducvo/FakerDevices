function faker(devices, generate, time){
    devices = [...devices];
    return setInterval(() => {
        for (let device of devices){
            device.setValue(...generate());
        }
    }, time);
}

module.exports = faker;