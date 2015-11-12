'use strict';
import factory from './react-factory';
import getModule from './react-require';

function prepareName(name) {
    return [
        name.substr(0, 1).toUpperCase(),
        name.substr(1).toLowerCase()
    ].join('');
}

function getName(pattern) {
    return function (name) {
        return prepareName(name.replace(pattern, '$1'));
    };
}

const getCmpName = getName(/.*\/(.*)\..*/i);

const processor = {
    getComponent(cmpUrl, assets, callback) {
        const cmpPath = [
            assets.toLowerCase(),
            cmpUrl
        ].join('');
        
        getModule.import(cmpPath, cmp => {
            if (typeof cmp === 'object') {
                cmp = cmp[getCmpName(cmpUrl)];
            }
            callback(cmp);
        });
    },
    run(getProperty, callback) {
        let response = null, cmp = getProperty('cmp'), data = getProperty('params'), assets = getProperty('assets');
        if (data) {
            data = JSON.parse(data);
        }
        this.getComponent(cmp, assets, _component => {
            if (_component) {
                response = factory.render(_component, data, +getProperty('static'));
            }
            return callback(response);
        });
    }
};
module.exports = processor;