import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";
    const isProd = !isDev;

    const cssLoaderForNodeModules = {
        test: /\.css$/,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
        ],
        include: /node_modules/,
    };

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:8]",
            },
        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
    };

    return [cssLoaderForNodeModules, scssLoader, assetLoader, tsLoader];
}
