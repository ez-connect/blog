//
// https://henriquetavares.com/babel-root-import-ts-reactjs-react-native/
//

const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ]),
);
