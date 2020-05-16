const {EventEmitter} = require('events');
/**
 * SoilMoisture device
 */
class SoilMoisture extends EventEmitter{
    constructor(id){
        super();
        this.id = id;
        this.status = 0;
        this.moisture = 0;
    }

    setValue(moisture, status=1){
        this.moisture = moisture;
        this.status = status;
        this.emit('change', this.toJSON());
    }

    toJSON(){
        return {
            "device_id": "id7_" + String(this.id),
            "value": [
                String(this.status), 
                String(this.moisture)
            ]
        };
    }
}

module.exports = SoilMoisture;