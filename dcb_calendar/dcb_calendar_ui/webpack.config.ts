import path from 'path';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import {filename, isProd} from './tools/webpack/consts';
import rules from './tools/webpack/rules';
import optimization from './tools/webpack/optimization';
import plugins from './tools/webpack/plugins';

const SHORT_COMMIT_HASH_LENGTH = 11;

const config: webpack.Configuration = {
    devtool: 'source-map',
    optimization: optimization(isProd),
    target: ['web', 'es5'],
    module: {
        rules,
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: filename('js'),
        libraryTarget: 'umd',
        clean: true,
        publicPath: `/`,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    devServer: {
        port: 3003,
        static: {
            directory: path.resolve(__dirname, 'out'),
            publicPath: `/`,
        },
    },
    plugins: plugins.concat(
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            BUILD_VERSION: JSON.stringify(process.env.BUILD_VERSION || 'DEV_BUILD_VERSION'),
            LATEST_COMMIT_HASH: JSON.stringify(
                process.env.LATEST_COMMIT_HASH?.substr(0, SHORT_COMMIT_HASH_LENGTH) || 'DEV_COMMIT_HASH',
            ),
        }),
    ),
};

export default process.env.SMP === 'OFF' ? config : new SpeedMeasurePlugin().wrap(config);
