'use client';

import React from 'react';
import { RandomFactCTA } from './RandomFactCTA';

interface PostBodyProps {
    content: string;
}

export function PostBody({ content }: PostBodyProps) {
    // Basic parser to inject React components into the HTML string
    // We look for the marker [[FACT_CTA]] and replace it with the component

    if (content.includes('[[FACT_CTA]]')) {
        const parts = content.split('[[FACT_CTA]]');
        return (
            <div className="prose prose-invert prose-lg max-w-4xl mx-auto blog-content w-full">
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        <div dangerouslySetInnerHTML={{ __html: part }} />
                        {index < parts.length - 1 && <RandomFactCTA />}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    return (
        <div
            className="prose prose-invert prose-lg max-w-4xl mx-auto blog-content w-full"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
