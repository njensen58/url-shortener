const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                options: {
                    configFile: ".tsconfig.json",
                }
            }
            // TODO: Add styling rules
            // TODO: Add filetype rules
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8000',
            }
        }
    },
}