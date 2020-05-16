const {EventEmitter} = require('events');
/**
 * Motor device
 */
class Motor extends EventEmitter{
    constructor(id){
        this.id = id;
        this.level = 0;
        this.status = 0;
    }

    setValue(level, status = 1){
        this.level = level;
        this.status = status;
        this.emit('change', this.toJSON());
    }

    toJSON(){
        return {
            "device_id": "id9_" + String(this.id),
            "value": this.status ? 
                    [String(this.status), String(this.level)] : 
                    [String(this.status)]
        };
    }
}

module.exports = Motor;