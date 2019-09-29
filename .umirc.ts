import { IConfig } from 'umi-types';

const config: IConfig = {
  treeShaking: true,
  disableCSSModules: true,
  exportStatic: {
    htmlSuffix: true,
  },

  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      }
    });
  },

  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr:true
      },
      pwa:true,
      chunks: ['vendors', 'umi'],
      dynamicImport: false,
      title: 'Website-React',
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
};

export default config;
