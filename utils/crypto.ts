import crypto from "crypto";

export const decrypt = (secret: string, data: string): string => {
    const key = Buffer.from(secret, 'hex');

    const decipher = crypto.createDecipheriv('des-ecb', key, null);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

export const encrypt = (secret: string, data: string): string => {
    const key = Buffer.from(secret, 'hex');

    const cipher = crypto.createCipheriv('des-ecb', key, null);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}