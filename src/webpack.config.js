{
    mode: production ? 'production' : 'development',
        module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            compact: false,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                },
            },
        ],
    },
    devtool: !production && 'source-map',
}
