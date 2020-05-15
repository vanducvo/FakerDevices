const {describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

const publisher = require('../services/publisher');

describe('Test Publisher', () => {

    it('should call publisher interval' , function(){
        this.clock = sinon.useFakeTimers();
        let topic = 'test';
        let message = {test: "hello"};
        let time = 1000;
        let client = {publish: function(){}}

        let spy = sinon.spy(client, "publish");
        let devices = [{id: 1, toJSON: () => message}];

        publisher(client, topic, devices, time);
        this.clock.tick(time*2);

        let payload = Buffer.from(JSON.stringify(message));
        expect(spy.calledTwice).to.be.true
        expect(spy.alwaysCalledWithMatch(topic, payload)).to.be.true
    });
});