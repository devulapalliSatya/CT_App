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
        async products(_, __, contextValue) {
            try {
                const { query } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query });
                return data.products;
            } catch (error) {
                console.log(error);
                throw error; // Re-throw the error to propagate it to the client
            }
        },

        async product(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.product;
            } catch (error) {
                console.log(error);
                throw error; // Re-throw the error to propagate it to the client
            }
        },
    },
    Mutation: {
        createProduct: async (root, args, context, info) => {
            try {
                const createdProduct = await data.products.create({
                    reviewRatingStatistics: [{
                        highestRating: args.highestRating,
                        lowestRating: args.lowestRating,
                    }]
                });
                return createdProduct;
            } catch (error) {
                console.log(error);
                throw error; // Re-throw the error to propagate it to the client
            }
        },

        addProduct_returns_object: async (root, args, context, info) => {
            try {
                const createdProductId = await data.products.create({
                    reviewRatingStatistics: [{
                        highestRating: args.highestRating,
                        lowestRating: args.lowestRating,
                    }]
                });
                const createdProduct = await data.products.get(createdProductId);
                return createdProduct;
            } catch (error) {
                console.log(error);
                throw error; // Re-throw the error to propagate it to the client
            }
        }
    }
};


module.exports = { resolvers };