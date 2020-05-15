const {describe, it} = require('mocha');
const {expect} = require('chai');

const Motor = require('../devices/Motor');

describe('Test Device', () => {
    describe('Motor', () => {
        
        it('should have init value', () => {
            let motor = new Motor(1);
            expect(motor.id).is.equal(1);
            expect(motor.level).is.equal(0);
            expect(motor.status).is.equal(0);
        });
        
        it('should set valid value to device', () => {
            let motor = new Motor(1);
            motor.setValue(3);
            expect(motor.id).is.equal(1);
            expect(motor.level).is.equal(3);
            expect(motor.status).is.equal(1);
        });

        it('should toJSON equal template when inactive', () => {
            let motor = new Motor(1);
            expect(motor.toJSON()).deep.equal({
                "device_id": "id9_1",
                "value": [
                    "0"
                ]
            });
        });
        
        it('should toJSON equal template when active', () => {
            let motor = new Motor(1);
            motor.setValue(3);
            expect(motor.toJSON()).deep.equal({
                "device_id": "id9_1",
                "value": [
                    "1",
                    "3"
                ]
            });
        });

    });
});