const {describe, it} = require('mocha');
const {expect} = require('chai');

const GPS = require('../devices/GPS');

describe('Test Device', () => {
    describe('GPS', () => {
        
        it('should have init value', () => {
            let gps = new GPS(1);
            expect(gps.id).is.equal(1);
            expect(gps.latitude).is.equal(0);
            expect(gps.longtitude).is.equal(0);
            expect(gps.latitude).is.equal(0);
        });
        
        it('should set valid value to device', () => {
            let gps = new GPS(1);
            gps.setValue(100.1001, 100.2020);
            expect(gps.id).is.equal(1);
            expect(gps.latitude).is.equal(100.2020);
            expect(gps.longtitude).is.equal(100.1001);
            expect(gps.status).is.equal(1);
        });

        it('should toJSON equal template', () => {
            let gps = new GPS(1);
            expect(gps.toJSON()).deep.equal({
                "device_id": "id4_1",
                "value": [
                    "0",
                    "0",
                    "0"
                ]
            });
        });
        

    });
});