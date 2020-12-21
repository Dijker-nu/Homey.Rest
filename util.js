const fs = require('fs');

module.exports.util = {}

module.exports.util.hasOwnPropertyCaseInsensitive = function (obj, property) {
    var props = [];
    for (var i in obj) if (obj.hasOwnProperty(i)) props.push(i);
    var prop;
    while (prop = props.pop()) if (prop.toLowerCase() === property.toLowerCase()) return true;
    return false;
}

module.exports.util.getFileSizeInBytes = function (filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}

module.exports.util.convertBase64ToFile = function (base64EncodedContent) {
    const type = base64EncodedContent.split(',')[0].split(';')[0].split(':')[1]; console.log(type);
    const byteString = atob(base64EncodedContent.split(',')[1]);

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
        type: type,
    });
    return newBlob;
}

module.exports.util.saveFile = async function (filename, base64EncodedContent, callback) {
    const type = base64EncodedContent.split(',')[0].split(';')[0].split(':')[1]; 
    console.log(type);
    const buffer = Buffer.from( base64EncodedContent.split(',')[1], 'base64');
    fs.writeFile(filename, buffer, () => callback());
}