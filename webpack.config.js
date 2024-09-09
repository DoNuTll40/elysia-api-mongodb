const path = require('path');

module.exports = {
  entry: './src/server.ts', // เปลี่ยนเป็นไฟล์เริ่มต้นของคุณ
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // ไฟล์เอาท์พุต
    path: path.resolve(__dirname, 'dist'), // โฟลเดอร์ที่ต้องการให้เก็บไฟล์
  },
  mode: 'production', // หรือ 'development' ขึ้นอยู่กับที่คุณต้องการ
};
