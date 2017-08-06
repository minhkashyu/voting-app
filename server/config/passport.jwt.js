import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './../models/user';
import config from './main';

// Setting JWT strategy options
const jwtOptions = {
    // check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // find the secret
    secretOrKey: config.secret
    // TO-DO: Add issuer and audience checks
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    process.nextTick(() => {
        User.findById(payload.id, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { error: 'There is no user information to create token'});
            }
            return done(null, user)
        });
    });
});

export default jwtLogin;