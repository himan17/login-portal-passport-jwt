const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

console.log(ExtractJwt.fromAuthHeaderAsBearerToken());

passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}, function(jwt_payload, done) {

    console.log(jwt_payload.id);
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log("user",user)
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
