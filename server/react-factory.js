'use strict';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import util from 'util';

function getElement(_class, props) {
  const el = React.createElement(_class, props);
  if (!React.isValidElement(el)) {
    console.log('getElement error: ' + util.inspect(p, {showHidden: true, depth: null}));
  }
  return el;
}

function renderMarkup(_static) {
  let method = 'renderToString';
  if (_static) {
    method = 'renderToStaticMarkup';
  }
  return function (element) {
    return ReactDOMServer[method](element);
  };
}
module.exports = {
  getElement: getElement,
  render(_class, props, _static) {
    return renderMarkup(_static)(this.getElement(_class, props));
  }
};
