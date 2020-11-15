const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1890ff",
              "@switch-color": "@success-color",
              "@text-color": "#000000",
              "@border-radius-base": "5px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
