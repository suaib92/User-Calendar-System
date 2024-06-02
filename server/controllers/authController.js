const { google } = require('googleapis');
const User = require('../models/User');

const authGoogle = (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
  res.redirect(url);
};

const authGoogleCallback = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
  const userInfo = await oauth2.userinfo.get();

  let user = await User.findOne({ email: userInfo.data.email });
  if (!user) {
    user = new User({
      email: userInfo.data.email,
      googleId: userInfo.data.id,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
    await user.save();
  } else {
    user.accessToken = tokens.access_token;
    user.refreshToken = tokens.refresh_token;
    await user.save();
  }

  res.send('Authentication successful! You can close this tab.');
};

module.exports = {
  authGoogle,
  authGoogleCallback,
};
