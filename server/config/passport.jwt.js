import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import config from './main';

// Setting JWT strategy options
const jwtOptions = {
    // check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // find the secret
    secretOrKey: config.secret

    // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // payload._id, payload.doc._id or payload.document._id
    process.nextTick(() => {
        User.findById(payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
});

export default jwtLogin;