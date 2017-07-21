// import _ from 'lodash';

require('./styles/common/common.scss');
require('./styles/writer.scss');
require('./styles/index.scss');
let _ = require('lodash');

console.error = (function() {
    var error = console.error

    return function(exception) {
        if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
            error.apply(console, arguments)
        }
    }
})();