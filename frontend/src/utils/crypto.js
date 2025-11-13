import CryptoJS from "crypto-js";

export function encryptNote(text, password) {
  try {
    return CryptoJS.AES.encrypt(text, password).toString();
  } catch (error) {
    console.error('Error', error);
    throw new Error('Could not encrypt the note');
  }
}

export function decryptNote(cipherText, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decrypted) {
      throw new Error('Note decryption failed');
    }
    
    return decrypted;
  } catch (error) {
    console.error('Error while decrypt:', error);
    throw new Error('Check your password');
  }
}
