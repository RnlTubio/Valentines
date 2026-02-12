import LZString from 'lz-string';
import { LoveLetter, UserData } from '@/types';

interface ShareData {
    userData: UserData;
    letter: LoveLetter;
}

export const encodeData = (data: ShareData): string => {
    const json = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(json);
};

export const decodeData = (encoded: string): ShareData | null => {
    try {
        const json = LZString.decompressFromEncodedURIComponent(encoded);
        if (!json) return null;
        return JSON.parse(json) as ShareData;
    } catch (error) {
        console.error('Error decoding share data:', error);
        return null;
    }
};
