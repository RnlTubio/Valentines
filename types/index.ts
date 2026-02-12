export type RelationshipType =
    | 'boyfriend'
    | 'girlfriend'
    | 'husband'
    | 'wife'
    | 'mother'
    | 'father'
    | 'son'
    | 'daughter'
    | 'child'
    | 'grandma'
    | 'grandpa'
    | 'friend'
    | 'best friend';

export interface UserData {
    recipientName: string;
    senderName: string;
    relationshipType: RelationshipType;
    message?: string;
}

export interface LoveLetter {
    greeting: string;
    body: string;
    closing: string;
}
