module.exports = {
    mongoURI: process.env.MONGODB_URI || "mongodb+srv://coralinepozzi:aUsHU41SGTH33H9i@cluster0.fwsih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    secretOrKey: process.env.SECRET || "secret"
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