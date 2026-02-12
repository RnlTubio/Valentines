'use client';

import { useState } from 'react';
import { UserData, RelationshipType } from '@/types';

interface InputFormProps {
    onSubmit: (data: UserData) => void;
    initialData?: UserData | null;
}

const relationshipOptions: { value: RelationshipType; label: string }[] = [
    { value: 'boyfriend', label: 'Boyfriend' },
    { value: 'girlfriend', label: 'Girlfriend' },
    { value: 'husband', label: 'Husband' },
    { value: 'wife', label: 'Wife' },
    { value: 'mother', label: 'Mother' },
    { value: 'father', label: 'Father' },
    { value: 'son', label: 'Son' },
    { value: 'daughter', label: 'Daughter' },
    { value: 'child', label: 'Child' },
    { value: 'grandma', label: 'Grandma' },
    { value: 'grandpa', label: 'Grandpa' },
    { value: 'friend', label: 'Friend' },
    { value: 'best friend', label: 'Best Friend' },
];

export default function InputForm({ onSubmit, initialData }: InputFormProps) {
    const [recipientName, setRecipientName] = useState(initialData?.recipientName || '');
    const [senderName, setSenderName] = useState(initialData?.senderName || '');
    const [relationshipType, setRelationshipType] = useState<RelationshipType>(initialData?.relationshipType || 'girlfriend');
    const [message, setMessage] = useState(initialData?.message || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (recipientName.trim() && senderName.trim()) {
            onSubmit({
                recipientName: recipientName.trim(),
                senderName: senderName.trim(),
                relationshipType,
                message: message.trim() || undefined,
            });
        }
    };

    return (
        <div className="form-container fade-in">
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                <h1 className="script-font" style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    background: 'var(--gradient-love)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Love Letter
                </h1>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: 'var(--rose-gold)',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    padding: '0 0.5rem'
                }}>
                    Create a personalized message for someone special ❤️
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="recipientName" className="input-label">
                            To (Recipient's Name)
                        </label>
                        <input
                            type="text"
                            id="recipientName"
                            className="input-field"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Enter their name..."
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="senderName" className="input-label">
                            From (Your Name)
                        </label>
                        <input
                            type="text"
                            id="senderName"
                            className="input-field"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="Enter your name..."
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="relationshipType" className="input-label">
                            They are my...
                        </label>
                        <select
                            id="relationshipType"
                            className="select-field"
                            value={relationshipType}
                            onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
                        >
                            {relationshipOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="message" className="input-label">
                            Your Message (Optional)
                        </label>
                        <textarea
                            id="message"
                            className="input-field"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your own message here, or leave empty for a surprise..."
                            style={{
                                minHeight: '120px',
                                resize: 'vertical',
                                fontFamily: "'Poppins', sans-serif"
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Create Love Letter 💕
                    </button>
                </form>
            </div>
        </div>
    );
}
