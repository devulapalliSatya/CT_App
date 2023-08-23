const axios = require("axios");
const { DEV_AUTH_URL, DEV_CLIENT_ID, DEV_CLIENT_SECRET, DEV_SCOPES } = require("../config/config");

module.exports = {
    getAccessToken: async () => {
        try {
            const accessTokenUrl = `${DEV_AUTH_URL}/oauth/token?grant_type=client_credentials`
            const basicAuth = Buffer.from(`${DEV_CLIENT_ID}:${DEV_CLIENT_SECRET}`).toString('base64');

            const requestBody = new URLSearchParams();
            requestBody.append('grant_type', 'client_credentials'); // Use the appropriate grant type
            requestBody.append('scope', DEV_SCOPES);

            const response = await axios.post(accessTokenUrl, requestBody, {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining access token:', error);
        }
    }
}