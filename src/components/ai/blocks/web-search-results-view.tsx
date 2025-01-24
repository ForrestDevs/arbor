"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  date: string;
  source: string;
}

interface WebSearchResultsViewProps {
  message: string;
  data?: {
    query: string[];
    totalResults: number;
    results: SearchResult[];
  };
}

export const WebSearchResultsView: React.FC<WebSearchResultsViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Web Search Results</h3>

        {data ? (
          <div className="space-y-6">
            {/* Search Summary */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {data.query.map((term, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {term}
                  </span>
                ))}
              </div>
              <div className="text-gray-600">
                Found {data.totalResults.toLocaleString()} results
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-6">
              {data.results.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-blue-600 hover:underline"
                    >
                      {result.title}
                    </a>
                    <span className="text-sm text-gray-500">
                      ({result.source})
                    </span>
                  </div>
                  <p className="text-gray-600">{result.snippet}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{new Date(result.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 truncate max-w-md"
                    >
                      {result.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-600">{message}</div>
        )}
      </CardContent>
    </Card>
  );
}; 