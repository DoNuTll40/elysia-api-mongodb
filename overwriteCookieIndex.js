const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, './src/index.ts'); // ปรับเส้นทางไปยังไฟล์ที่คุณต้องการคัดลอก
const targetFile = path.join(__dirname, './node_modules/@elysiajs/cookie/src/index.ts');

fs.copyFile(sourceFile, targetFile, (err) => {
    if (err) {
        console.error('Error copying file:', err);
    } else {
        console.log('File copied successfully!');
    }
});
