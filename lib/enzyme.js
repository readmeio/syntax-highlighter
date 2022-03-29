/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const enzyme = require('enzyme');

let Adapter;
if (process.env.REACT_VERSION && process.env.REACT_VERSION == '16') {
  Adapter = require('enzyme-adapter-react-16');
} else {
  Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
}

require('core-js/stable');
require('regenerator-runtime/runtime');

enzyme.configure({ adapter: new Adapter() });
