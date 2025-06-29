import { marked } from 'marked';

export function parseMarkdown(content) {
  return marked(content || '');
}

export function parseMarkdownToText(content) {
  // Remove HTML tags to get plain text
  return marked(content || '').replace(/<[^>]*>/g, '');
} 