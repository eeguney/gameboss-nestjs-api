import CONFIG from "src/config/env.config";

const GOOGLE_SETTINGS = {
    clientID: CONFIG.GOOGLE_CLIENT_ID,
    clientSecret: CONFIG.GOOGLE_SECRET_KEY,
    callbackURL: CONFIG.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
}

export default GOOGLE_SETTINGS;