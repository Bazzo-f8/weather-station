import { ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import passport from "passport";
import User from '../entity/userModel';

const initializePassport =()=>{
    const opts = {}

    //@ts-ignore
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    //@ts-ignore
    opts.secretOrKey = "mysecret"

    //@ts-ignore
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)

        try{
            const user = User.findOne({UserId: jwt_payload._id})

            if(user){
                return done(null, user)
            }
            else{
                return done(null, user)
            }
        }catch(err){
            return done(err, false)
        }
    }))
}

export default initializePassport
