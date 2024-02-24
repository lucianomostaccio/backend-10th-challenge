import passport from "passport";
import { getDaoUsers } from "../daos/users/users.dao.js"
import GitHubStrategy from "passport-github2";
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./config.js";

const initializeGithubPassport = () => {
  passport.use(
    'github',
    // @ts-ignore
    new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID, // Replace with your GitHub client ID
      clientSecret: GITHUB_CLIENT_SECRET, // Replace with your GitHub client secret
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const usersDao = getDaoUsers();
        const user = await usersDao.readOne({ email: profile._json.email });

        if (!user) {
          let newUser = {
            first_name: profile._json.name,
            last_name: '', // Ask the user for the last name once logged in
            email: profile._json.email,
            age: '', // Ask the user once logged in
            password: '', // Ask the user to set a password once logged in
            profile_picture: profile._json.avatar_url,
          };
        
          let result = await usersDao.create(newUser);
          // Ensure that result has an _id property
          done(null, result);
        } else {
          done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
};


passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usersDao = getDaoUsers();
    // Wrap the id in an object with the _id key
    const user = await usersDao.readOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});


export default initializeGithubPassport;
