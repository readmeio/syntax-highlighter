/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
const enzyme = require('enzyme');

let Adapter;
if (process.env.REACT_VERSION && process.env.REACT_VERSION === '16') {
  Adapter = require('enzyme-adapter-react-16');
} else {
  Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
}

require('core-js/stable');
require('regenerator-runtime/runtime');

enzyme.configure({ adapter: new Adapter() });
