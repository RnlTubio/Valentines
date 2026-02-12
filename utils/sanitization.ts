import { UserData, RelationshipType } from '@/types';

// Configuration
const MAX_NAME_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 1000;
const ALLOWED_RELATIONSHIP_TYPES: RelationshipType[] = [
    'boyfriend', 'girlfriend', 'husband', 'wife',
    'mother', 'father', 'son', 'daughter', 'child',
    'grandma', 'grandpa', 'friend', 'best friend'
];

/**
 * Sanitize text input by removing potentially dangerous characters
 * while preserving emojis and basic punctuation
 */
export function sanitizeText(text: string): string {
    if (!text) return '';

    // Remove any HTML tags
    let sanitized = text.replace(/<[^>]*>/g, '');

    // Remove script-related patterns
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, ''); // Remove event handlers like onclick=

    // Remove null bytes and other control characters (except newlines and tabs)
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Trim whitespace
    sanitized = sanitized.trim();

    return sanitized;
}

/**
 * Validate that text contains only safe characters
 * Allows: letters, numbers, spaces, basic punctuation, and emojis
 */
export function isValidText(text: string): boolean {
    if (!text) return true; // Empty is valid

    // Check for suspicious patterns
    const dangerousPatterns = [
        /<script/i,
        /<iframe/i,
        /javascript:/i,
        /on\w+\s*=/i, // Event handlers
        /data:text\/html/i,
        /vbscript:/i,
    ];

    return !dangerousPatterns.some(pattern => pattern.test(text));
}

/**
 * Type guard to check if a string is a valid RelationshipType
 */
export function isValidRelationshipType(value: any): value is RelationshipType {
    return typeof value === 'string' && ALLOWED_RELATIONSHIP_TYPES.includes(value as RelationshipType);
}

/**
 * Validate and sanitize user data
 * Returns sanitized data or null if validation fails
 */
export function validateUserData(data: any): UserData | null {
    try {
        // Check if data is an object
        if (!data || typeof data !== 'object') {
            return null;
        }

        // Validate and sanitize recipient name
        if (typeof data.recipientName !== 'string' || !data.recipientName.trim()) {
            return null;
        }
        const recipientName = sanitizeText(data.recipientName);
        if (!isValidText(recipientName) || recipientName.length > MAX_NAME_LENGTH) {
            return null;
        }

        // Validate and sanitize sender name
        if (typeof data.senderName !== 'string' || !data.senderName.trim()) {
            return null;
        }
        const senderName = sanitizeText(data.senderName);
        if (!isValidText(senderName) || senderName.length > MAX_NAME_LENGTH) {
            return null;
        }

        // Validate relationship type
        if (!isValidRelationshipType(data.relationshipType)) {
            return null;
        }

        // Validate and sanitize optional message
        let message: string | undefined = undefined;
        if (data.message) {
            if (typeof data.message !== 'string') {
                return null;
            }
            message = sanitizeText(data.message);
            if (!isValidText(message) || message.length > MAX_MESSAGE_LENGTH) {
                return null;
            }
            // Only include message if it's not empty after sanitization
            if (!message.trim()) {
                message = undefined;
            }
        }

        return {
            recipientName,
            senderName,
            relationshipType: data.relationshipType,
            message,
        };
    } catch (error) {
        console.error('Error validating user data:', error);
        return null;
    }
}

/**
 * Generate a safe filename from user input
 * Removes special characters and limits length
 */
export function generateSafeFilename(recipientName: string, senderName: string): string {
    // Sanitize names
    const safeTo = sanitizeText(recipientName).replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const safeFrom = sanitizeText(senderName).replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);

    // Generate timestamp
    const timestamp = Date.now();

    // Create filename
    return `love-letter-${safeTo}-from-${safeFrom}-${timestamp}.png`;
}

/**
 * Validate encoded data size to prevent DoS attacks
 */
export function isValidEncodedDataSize(encoded: string): boolean {
    // Limit encoded data to 10KB (should be more than enough for our use case)
    const MAX_ENCODED_SIZE = 10 * 1024;
    return encoded.length <= MAX_ENCODED_SIZE;
}

// Export constants for use in components
export const VALIDATION_LIMITS = {
    MAX_NAME_LENGTH,
    MAX_MESSAGE_LENGTH,
} as const;
