const { DEV_PROJECT_KEY, DEV_API_URL } = require("../config/config");
const axios = require("axios");
const { getDataFromCommerceTool} = require('../service/resolver.service')



const resolvers = {
    Query: {
        products: async (_, __, contextValue) => {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.products;
            } catch (error) {
                throw error; // Re-throw the error to propagate it to the client
            }
        },


        product: async (_, args, contextValue) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.product;
            } catch (error) {
                throw error; // Re-throw the error to propagate it to the client
            }
        },

        productTypes: async (_, __, contextValue) => {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.productTypes;
            } catch (error) {
                throw error; // Re-throw the error to propagate it to the client
            }
        },

        productType: async (_, __, contextValue) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.productType;
            } catch (error) {
                throw error; // Re-throw the error to propagate it to the client
            }
        },
    },

    Mutation: {
        createProductType: async (_, __, contextValue) => {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.createProductType;
            } catch (error) {
                throw error; // Re-throw the error to propagate it to the client
            }
        },

        createProduct: async (_, __, contextValue) => {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.createProduct;
            } catch (error) {
                throw error; // Re-throw the error to propagate it to the client
            }
        },

    }
};


module.exports = { resolvers };