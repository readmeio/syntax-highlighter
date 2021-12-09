/* eslint-disable import/no-extraneous-dependencies */
const Adapter = require('enzyme-adapter-react-16');
const enzyme = require('enzyme');

require('core-js/stable');
require('regenerator-runtime/runtime');

enzyme.configure({ adapter: new Adapter() });
