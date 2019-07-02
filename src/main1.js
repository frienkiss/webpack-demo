// CommonJS2
require('./main1.css')
// or 
///require('style-loader!css-loader!./main1.css')
const show = require('./show')

show('hello')

//commonJS 只能用exports导出, commonJS2多加了module.exports