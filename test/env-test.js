require('dotenv').config();

const {describe, it} = require('mocha');
const {expect} = require('chai');

describe('Test Enviroment Variable', () => {
    it('Shoud have substring tcp and mqtt in MQTT_SERVER', () => {
        expect(process.env.MQTT_SERVER).to.match(/^tcp:\/\/.*?\/mqtt$/)
    });

    it('Shoud have App ID', () => {
        expect(process.env.APP_ID).not.null;
    });

    it('Shoud have Client ID', () => {
        expect(process.env.APP_ID).not.null;
    });

    it('Shoud have Client Name', () => {
        expect(process.env.CLIENT_NAME).not.null;
    });

    it('Shoud have Client Password', () => {
        expect(process.env.CLIENT_PASSWORD).not.null;
    });
});