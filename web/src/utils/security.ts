
// @ts-ignore
import CryptoJS from 'crypto-js';  

export function encrypt(text:string, secretKey:string) {
    let encryptStr = CryptoJS.AES.encrypt(text, secretKey).toString();  

    let encyptData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptStr))
    return encyptData
}

export function decrypt(text:string, secretKey:string) {
    let decData = CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
    
    return CryptoJS.AES.decrypt(decData, secretKey).toString(CryptoJS.enc.Utf8);  
}