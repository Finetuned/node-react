'use strict';
import path from 'path';

function importModule(module, callback) {
    callback(require(path.resolve(module)));
}
module.exports.import = importModule;
