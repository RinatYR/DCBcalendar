import path from 'path';
import { RuleSetRule } from 'webpack';

const tsLoader = (test: RegExp, extraPreset?: string) => {
    const presets = ['@babel/preset-env', '@babel/preset-typescript'];
    const plugins: unknown[] = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
    ];

    if (extraPreset) {
        presets.push(extraPreset);
    }

    const use = {
        loader: 'babel-loader',
        options: {
            plugins,
            presets,
        },
    };

    return {
        test,
        use,
        include: [path.resolve('./src')],
    };
};

const styleLoader = (test: RegExp, extraLoader?: string) => {
    const use: (RuleSetRule | string)[] = ['thread-loader', 'style-loader'];

    if (extraLoader) {
        use.push({
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]__[hash:base64:5]',
                    exportLocalsConvention: 'camelCase',
                },
            },
        });
        use.push(extraLoader);
    } else {
        use.push('css-loader');
    }

    return {
        test,
        use,
    };
};

const rules = [
    tsLoader(/\.(j|t)s$/),
    tsLoader(/\.(j|t)sx$/, '@babel/preset-react'),
    styleLoader(/\.css$/),
    styleLoader(/\.less$/, 'less-loader'),
];

export default rules;
