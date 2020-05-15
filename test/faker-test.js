const {describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

const faker = require('../services/faker');
const SoilMoisture = require('../devices/SoilMoisture');

describe('Test Faker', () => {
    it('should change properties of devices', function(){
        this.clock = sinon.useFakeTimers();
        let time = 1000;
        let device = new SoilMoisture(1);
        let spy = sinon.spy(device, "setValue");
        faker([device], () => [1022],time);
        this.clock.tick(time*2);
        expect(spy.calledTwice).to.be.true;
        expect(spy.alwaysCalledWith(1022)).to.be.true;
        expect(device.moisture).to.be.equal(1022);
        expect(device.status).to.be.equal(1);
    });
});