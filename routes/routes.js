'use strict';
module.exports = function(app) {
    var routeController   = require('../controller/routeController')

    app.route('/authorization')
    	.get(routeController.authorization)

    app.route('/index.html')
        .get(routeController.loadHome)

};