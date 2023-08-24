const { DEV_PROJECT_KEY, DEV_API_URL } = require("../config/config");
const axios = require("axios");

const commerceToolsApiUrl = `${DEV_API_URL}/${DEV_PROJECT_KEY}/graphql`;

const { getAccessToken } = require("../middleware/token");

async function getDataFromCommerceTool({ query, variables }) {
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

const resolvers = {
    Query: {
        async customers(_, __, contextValue) {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.customers;
            } catch (error) {
                console.log(error);
            }
        },

        async customer(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.customer;
            } catch (error) {
                console.log(error);
            }
        },

    }
};

module.exports = { resolvers };