'use client';
import { marked } from 'marked';

export default function MarkdownRenderer({ content, className = '' }) {
  const htmlContent = marked(content || '');
  
  return (
    <div 
      className={`prose prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
} 