/* eslint-disable import/no-extraneous-dependencies */
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

require('core-js/stable');
require('regenerator-runtime/runtime');

enzyme.configure({ adapter: new Adapter() });
