const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    }
  }),
  // function for our authenticated routes
  // authMiddleware: function (req, res, next) {
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    // let token = req.query.token || req.headers.authorization;
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      return req;
    }

    // verify token and get user data out of it
    try {
      // const { data } = jwt.verify(token, secret, { maxAge: expiration });
      const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });
      // req.user = data;
      req.user = authenticatedPerson;
    } catch {
      console.log('Invalid token');
      // return res.status(400).json({ message: 'invalid token!' });
    }
    return req;
    // send to next endpoint
    // next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
