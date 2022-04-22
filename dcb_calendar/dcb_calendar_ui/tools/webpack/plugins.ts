import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import {isProd} from './consts';

const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new HTMLWebpackPlugin({
        template: './public/index.template.html',
        minify: {
            collapseWhitespace: isProd,
        },
    }),
    new CopyPlugin({
        patterns: [
            {
                from: './src/assets',
                to: './',
            },
        ],
    }),
];

if (isProd) {
    plugins.push(new CompressionPlugin());
}

export default plugins;
