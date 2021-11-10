import React from 'react';

const AutoParagraph = ({ content }) => {
  const html = content
    .split(/\n+/)
    .filter(part => !!part.trim())
    .map(part => `<p>${part}</p>`)
    .join('');
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default AutoParagraph;
