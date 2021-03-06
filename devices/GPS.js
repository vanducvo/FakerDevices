const {EventEmitter} = require('events');

/**
 * GPS device
 */
class GPS extends EventEmitter{
    constructor(id){
        super()
        this.id = id
        this.latitude = 0;
        this.longtitude = 0;
        this.status = 0
    }

    setValue(longtitude, latitude, status = 1){
        this.longtitude = longtitude;
        this.latitude = latitude;
        this.status = status;
        this.emit('change', this.toJSON());
    }

    toJSON(){
        return {
            "device_id": "id4_" + String(this.id),
            "value": [
                String(this.status), 
                String(this.longtitude), 
                String(this.latitude)
            ]
        };
    }
}

module.exports = GPS;