module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: ['react-native-paper/babel'],
            },
        },
        plugins: [
            "react-native-reanimated/plugin",
            [
              'module-resolver',
              {
                alias: {
                  src: './src',
                  '@assets': './assets',
                  '@pages': './src/pages',
                  '@data': './src/data',
                  '@function': './src/function',
                  '@components': './src/components',
                  '@utils': './src/utils',
                  '@api': './src/api',
                  '@routes': './src/routes',
                  '@store': './src/store',
                  '@hooks': './src/hooks',
                },
              },
            ],
          ],
    };
};
