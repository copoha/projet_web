module.exports = {
    mongoURI: process.env.MONGODB_URI || "mongodb+srv://coralinepozzi:aUsHU41SGTH33H9i@cluster0.fwsih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    secretOrKey: process.env.SECRET || "secret",
    serpAPIKey : process.env.SERP || "6a808ef6957e37ea7f4e68c372680058d85ddee13ef6a2f995addf05c0ac1b3a",
    tmdbAPIKey : process.env.TMDB || "8ac9a2cb1174ad9d896d1d97e68a48fa" 
};

/**module.exports = key => {
    key.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };**/