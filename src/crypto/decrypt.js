import CryptoJS from 'crypto-js';

const SECRET_KEY = "1234567890abcdef1234567890abcdef"; // Must be 32 characters
const IV = "0000000000000000"; // 16 characters

const decrypt = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
};

//console.log(decrypt("dIJGyBNgFChjmC+l35FM3g=="));
export { decrypt };
