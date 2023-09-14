const axios = require('axios')
const { DEV_PROJECT_KEY, DEV_API_URL } = require("../config/config");
const commerceToolsApiUrl = `${DEV_API_URL}/${DEV_PROJECT_KEY}/graphql`;
const { getAccessToken } = require("../middleware/token");


module.exports = {
    getDataFromCommerceTool: async ({ query, variables }) => {
        try {
            const accessToken = await getAccessToken();
            variables = variables || {};
            const data = JSON.stringify({
                query: query,
                variables: Object.keys(variables).length ? variables : {}
            });

            const config = {
                method: 'post',
                url: commerceToolsApiUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                data
            };
            const resp = (await axios(config)).data;
            return resp.data;
        } catch (error) {
            console.log(error)
        }
    }
}