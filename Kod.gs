function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Dosya Yükleme Arayüzü')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function uploadImageToTelegraph(fileData, fileName, mimeType) {
  // Base64'ten Blob'a çevir
  var blob = Utilities.newBlob(Utilities.base64Decode(fileData), mimeType, fileName);
  
  var uploadUrl = 'https://telegra.ph/upload';
  
  var form = {
    'file': blob
  };
  
  var options = {
    'method': 'post',
    'payload': form
  };
  
  var uploadResponse = UrlFetchApp.fetch(uploadUrl, options);
  var result = JSON.parse(uploadResponse.getContentText());
  
  if (result && result[0] && result[0].src) {
    return {
      link: 'https://telegra.ph' + result[0].src,
      path: result[0].src
    };
  } else {
    throw new Error('Yükleme başarısız oldu veya beklenmeyen yanıt alındı.');
  }
}
