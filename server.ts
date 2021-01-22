export {};
import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import config from './config';
// const expressAttack = require('express-attack');
// const requestIp = require('request-ip');
const config = require('./config');
var cors = require('cors');
require('dotenv').config();
const compression = require('compression');
import {
	user_routes,
	product_routes,
	order_routes,
	email_routes,
	batch_routes,
	expense_routes,
	feature_routes,
	promo_routes,
	affiliate_routes,
	cart_routes,
	content_routes,
	device_routes,
	log_routes
} from './routes/index';

// const htmlRoutes = require('./email_templates/html_routes');

var allowCrossDomain = function(req: any, res: any, next: any) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
};

mongoose
	.connect(config.RESTORED_MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.catch((error: { reason: any }) => console.log(error.reason));

const app = express();
// app.use(bodyParser.json());

// app.configure(function() {
// 	// app.use(express.bodyParser());
// 	// app.use(express.methodOverride());
// 	// app.use(app.router);
// 	app.use(allowCrossDomain);
// 	// app.use(express.static(path.join(application_root, "public")));
// 	// app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

app.all('*', function(req, res, next) {
	var origin = req.get('origin');
	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(allowCrossDomain);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(sslRedirect());

// // throttle request when given IP hit 50 times over 300 seconds
// function throttleByIp(req: any) {
// 	const clientIp = requestIp.getClientIp(req);

// 	return {
// 		key: clientIp,
// 		limit: 50,
// 		period: 300
// 	};
// }

// app.use(
// 	expressAttack({
// 		throttles: [ throttleByIp ]
// 	})
// );

app.use('/api/promos', promo_routes);
app.use('/api/carts', cart_routes);
app.use('/api/contents', content_routes);
app.use('/api/affiliates', affiliate_routes);
app.use('/api/expenses', expense_routes);
app.use('/api/features', feature_routes);
app.use('/api/users', user_routes);
app.use('/api/products', product_routes);
app.use('/api/orders', order_routes);
app.use('/api/emails', email_routes);
app.use('/api/devices', device_routes);
app.use('/api/logs', log_routes);
app.use('/api/all', batch_routes);

// app.use('/', htmlRoutes);
app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.PORT, () => {
	console.log('Server started at http://localhost:5000');
});
