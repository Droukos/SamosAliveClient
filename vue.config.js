//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const HtmlWebpackTemplate = require('html-webpack-plugin');
//const ScriptExtWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  chainWebpack: config => {
    //config
    config.plugins.delete("prefetch");
    //config.plugin("VuetifyLoaderPlugin").tap(() => [
    //  {
    //    match(originalTag, { kebabTag, camelTag, path, component }) {
    //      if (kebabTag.startsWith("core-")) {
    //        return [
    //          camelTag,
    //          `import ${camelTag} from '@/components/core/${camelTag.substring(
    //            4
    //          )}.vue'`
    //        ];
    //      }
    //    }
    //  }
    //]);

    //.plugin('bundle-analyzer-plugin')
    //  .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //  .end()
    //.plugin('html-template')
    //  .use(HtmlWebpackTemplate)
    //  .end()
    //.plugin('script-ext')
    //  .use(ScriptExtWebpackPlugin)
    //  .before('html-template');
  },
  pwa: {
    name: "SamosAlive",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW"
    //workboxOptions: {
    //  // swSrc is required in InjectManifest mode.
    //  swSrc: 'dev/sw.js',
    //  // ...other Workbox options...
    //}
  },
  devServer: {
    proxy: "http://localhost:8089/api"
  },
  css: {
    extract: { ignoreOrder: true }
  },
  //publicPath: "/public",
  transpileDependencies: ["vuetify"]
};
