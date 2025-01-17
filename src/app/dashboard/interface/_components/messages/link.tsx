"use client";

import React from "react";

interface Props {
  url: string;
  children: React.ReactNode;
}

const Link: React.FC<Props> = ({ url, children }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-600 hover:underline"
    >
      {children}
    </a>
  );
};

export default Link;
