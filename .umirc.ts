import { IConfig } from 'umi-types';

const config: IConfig = {
  treeShaking: true,
  disableCSSModules: true,
  exportStatic: {
    htmlSuffix: true,
  },
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr:true
      },
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
