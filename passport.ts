const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('./models/user');
// const User = mongoose.model('users');
const config = require('./config');
// dotenv.config();

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;

module.exports = (passport: { use: (arg0: any) => void }) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload: { id: any }, done: (arg0: null, arg1: boolean) => any) => {
			User.findById(jwt_payload.id)
				.then((user: any) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch((err: any) => console.log(err));
		})
	);
};
