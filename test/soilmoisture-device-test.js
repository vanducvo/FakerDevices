const {describe, it} = require('mocha');
const {expect} = require('chai');

const SoilMoisture = require('../devices/SoilMoisture');

describe('Test Device', () => {
    describe('SoilMoisture', () => {
        
        it('should have init value', () => {
            let soilmoisture = new SoilMoisture(1);
            expect(soilmoisture.id).is.equal(1);
            expect(soilmoisture.moisture).is.equal(0);
            expect(soilmoisture.status).is.equal(0)
        });
        
        it('should set valid value to device', () => {
            let soilmoisture = new SoilMoisture(1);
            soilmoisture.setValue(25);
            expect(soilmoisture.id).is.equal(1);
            expect(soilmoisture.moisture).is.equal(25);
            expect(soilmoisture.status).is.equal(1)
        });

        it('should toJSON equal template', () => {
            let soilmoisture = new SoilMoisture(1);
            expect(soilmoisture.toJSON()).deep.equal({
                "device_id": "id7_1",
                "value": [
                    "0",
                    "0"
                ]
            });
        });
        

    });
});