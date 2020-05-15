class SoilMoisture{
    constructor(id){
        this.id = id;
        this.status = 0;
        this.moisture = 0;
    }

    setValue(moisture, status=1){
        this.moisture = moisture;
        this.status = status;
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