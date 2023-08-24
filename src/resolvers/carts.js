const { DEV_PROJECT_KEY, DEV_API_URL } = require("../config/config");
const axios = require("axios");
const { getDataFromCommerceTool} = require('../service/resolver.service')



const resolvers = {
    Query: {
        async carts(_, __, contextValue) {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.carts;
            } catch (error) {
                console.log(error);
            }
        },

        async cart(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.cart;
            } catch (error) {
                console.log(error);
            }
        },

        async carts(_, args, contextValue) {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.carts;
            } catch (error) {
                console.log(error);
            }
        },

        async cart(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.cart;
            } catch (error) {
                console.log(error);
            }
        },
    }
};

module.exports = { resolvers };