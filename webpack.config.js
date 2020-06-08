 // webpack.config.js
 const HTMLWebpackPlugin = require('html-webpack-plugin');
 const LiveReloadPlugin = require('webpack-livereload-plugin');
 const WriteFilePlugin = require('write-file-webpack-plugin');
 const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');


 require("babel-polyfill");


 const {
   join,
 } = require('path');
 const {
   HotModuleReplacementPlugin
 } = require('webpack');


 module.exports = (env, argv) => {
   const isDevelopment = argv.mode === 'development';

   return ({
     mode: argv.mode,
     devtool: isDevelopment ?
       '#eval-source-map' // For development
       :
       'source-map', // For production
     entry: {
       index: join(__dirname, 'index.js'),
     },
     output: {
       path: join(__dirname, 'public/js/app'),
       publicPath: "/public/js/app/",
       filename: '[name].bundled.js',
       chunkFilename: '[name].bundle.js',
     },
     //watch: true,
     devServer: {
       //index.html: '',
       open: true,

       //hot: true,
       //https: true,
       inline: true,
       overlay: {
         warnings: true,
         errors: true
       },
       //disableHostCheck: true,
       //host: 'http://aedlive.localhost/AEDLive/',
       //port: 8877,
       publicPath: 'http://localhost:8080/public/js',
       //contentBase: join(__dirname, "http://localhost:8080/public/js/app"),
       //watchContentBase: true,
       compress: true,
       headers: {
         'Access-Control-Allow-Origin': '*'
       },
         //proxy: [{
         //    path: "/",
         //    target: "http://localhost:8080/",
         //    //"protocol": "http:",
         //    //"port":80
         //    "secure": false,
         //    "changeOrigin": true,
         //    pathRewrite: {
         //        '^/': '' // rewrite path
         //   }
         //    //host: "localhost",
         //    //protocol: "http:",
         //    //port: 8080,
         //}],
     },
     resolve: {
       alias: {
         'vue': 'vue/dist/vue.esm.js',
       }
     },
     module: {
       rules: [{
           test: /\.vue$/,
           loader: 'vue-loader',
           options: {
             hotReload: true // disables Hot Reload
           }
         },
         // this will apply to both plain `.js` files
         // AND `<script>` blocks in `.vue` files
         {
           test: /\.js$/,
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env']
           },
         },
         // this will apply to both plain `.css` files
         // AND `<style>` blocks in `.vue` files
         {
           test: /\.css$/,
           use: [
             'vue-style-loader',
             'css-loader'
           ]
         },
         {
          test: /\.s(a|c)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            //'sass-loader'
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
              // Requires sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                  indentedSyntax: true // optional
                },
              },
            },
          ]
        },
         {
           test: /\.pug$/,
           oneOf: [
             // this applies to `<template lang="pug">` in Vue components
             {
               resourceQuery: /^\?vue/,
               use: ['pug-plain-loader']
             },
             // this applies to pug imports inside JavaScript
             {
               use: ['raw-loader', 'pug-plain-loader']
             }
           ]
         },
         {
           test: /\.styl(us)?$/,
           use: [
             'vue-style-loader',
             'css-loader',
             'stylus-loader',
           ]
         }
       ]
     },
     plugins: [
       // make sure to include the plugin for the magic
       new HotModuleReplacementPlugin(),
       new BundleAnalyzerPlugin(),
       //new VuetifyLoaderPlugin(),
       //new VuetifyLoaderPlugin({
      //  /**
      //   * This function will be called for every tag used in each vue component
      //   * It should return an array, the first element will be inserted into the
      //   * components array, the second should be a corresponding import
      //   *
      //   * originalTag - the tag as it was originally used in the template
      //   * kebabTag    - the tag normalised to kebab-case
      //   * camelTag    - the tag normalised to PascalCase
      //   * path        - a relative path to the current .vue file
      //   * component   - a parsed representation of the current component
      //   */
      //  match (originalTag, { kebabTag, camelTag, path, component }) {
      //    if (kebabTag.startsWith('core-')) {
      //      return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
      //    }
      //  }
      //}),
       new LiveReloadPlugin(),
       new WriteFilePlugin(),
       new HTMLWebpackPlugin({
         showErrors: true,
         cache: true,
       }),
     ]
   })
 };