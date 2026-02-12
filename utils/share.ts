import LZString from 'lz-string';
import { UserData } from '@/types';
import { validateUserData, isValidEncodedDataSize } from './sanitization';

// Only encode user data - letter will be regenerated on recipient's side
export type ShareData = UserData;

/**
 * Encode user data for sharing
 * Validates data before encoding to prevent malicious content
 */
export const encodeData = (data: ShareData): string | null => {
    // Validate and sanitize data before encoding
    const validatedData = validateUserData(data);
    if (!validatedData) {
        console.error('Invalid data provided for encoding');
        return null;
    }

    try {
        const json = JSON.stringify(validatedData);
        const encoded = LZString.compressToEncodedURIComponent(json);

        // Verify encoded size is reasonable
        if (!isValidEncodedDataSize(encoded)) {
            console.error('Encoded data exceeds size limit');
            return null;
        }

        return encoded;
    } catch (error) {
        console.error('Error encoding share data:', error);
        return null;
    }
};

/**
 * Decode and validate shared data
 * Returns null if data is invalid or potentially malicious
 */
export const decodeData = (encoded: string): ShareData | null => {
    try {
        // Check encoded data size first to prevent DoS
        if (!isValidEncodedDataSize(encoded)) {
            console.error('Encoded data exceeds size limit');
            return null;
        }

        const json = LZString.decompressFromEncodedURIComponent(encoded);
        if (!json) {
            console.error('Failed to decompress data');
            return null;
        }

        const data = JSON.parse(json);

        // Validate and sanitize the decoded data
        const validatedData = validateUserData(data);
        if (!validatedData) {
            console.error('Decoded data failed validation');
            return null;
        }

        return validatedData;
    } catch (error) {
        console.error('Error decoding share data:', error);
        return null;
    }
};
