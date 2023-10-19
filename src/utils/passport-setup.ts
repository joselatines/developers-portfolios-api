import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { envConfig } from '../dotenv/config';
import { User } from '../database/models/user.model';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: envConfig.GITHUB_CLIENT_ID,
      clientSecret: envConfig.GITHUB_CLIENT_SECRET,
      callbackURL: `${envConfig.PRODUCTION_URL}/api/v1/auth/github/callback`,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const userProfile = {
          email: profile._json.email,
          username: profile.username,
          github: profile.profileUrl,
          profilePic: profile.photos[0].value,
          provider: profile.provider,
        };

        const user = await User.findOne({
          raw: true,
          where: { email: profile._json.email },
        });

        if (!user) {
          console.info('creating user to db from github...');
          await User.create(userProfile);
        }

        return done(null, profile);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    },
  ),
);
