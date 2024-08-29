"use client";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface SafeHTMLProps {
  html: string;
}

const SafeHTML: React.FC<SafeHTMLProps> = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 sm:px-6"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default SafeHTML;
