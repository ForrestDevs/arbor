"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Tweet {
  id: string;
  author: {
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
  };
  sentiment: "positive" | "negative" | "neutral";
}

interface TwitterResultsViewProps {
  message: string;
  data?: {
    query: string[];
    totalMentions: number;
    sentimentSummary: {
      positive: number;
      negative: number;
      neutral: number;
    };
    topTweets: Tweet[];
  };
}

export const TwitterResultsView: React.FC<TwitterResultsViewProps> = ({
  message,
  data,
}) => {
  const getSentimentColor = (sentiment: Tweet["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Twitter Analysis</h3>

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
                {data.totalMentions.toLocaleString()} total mentions
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                Sentiment Analysis
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-green-600 font-medium">
                    {Math.round(data.sentimentSummary.positive)}%
                  </div>
                  <div className="text-sm text-gray-500">Positive</div>
                </div>
                <div>
                  <div className="text-gray-600 font-medium">
                    {Math.round(data.sentimentSummary.neutral)}%
                  </div>
                  <div className="text-sm text-gray-500">Neutral</div>
                </div>
                <div>
                  <div className="text-red-600 font-medium">
                    {Math.round(data.sentimentSummary.negative)}%
                  </div>
                  <div className="text-sm text-gray-500">Negative</div>
                </div>
              </div>
            </div>

            {/* Top Tweets */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                Top Tweets
              </h4>
              <div className="space-y-4">
                {data.topTweets.map((tweet) => (
                  <div
                    key={tweet.id}
                    className="p-4 bg-gray-50 rounded-lg space-y-2"
                  >
                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={tweet.author.avatarUrl}
                        alt={tweet.author.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">
                          {tweet.author.displayName}
                        </div>
                        <div className="text-gray-500 text-sm">
                          @{tweet.author.username}
                        </div>
                      </div>
                      <div
                        className={`ml-auto text-sm font-medium ${getSentimentColor(
                          tweet.sentiment
                        )}`}
                      >
                        {tweet.sentiment}
                      </div>
                    </div>

                    {/* Tweet Content */}
                    <p className="text-gray-800">{tweet.content}</p>

                    {/* Tweet Metrics */}
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>
                        {formatNumber(tweet.metrics.likes)} likes
                      </span>
                      <span>
                        {formatNumber(tweet.metrics.retweets)} retweets
                      </span>
                      <span>
                        {formatNumber(tweet.metrics.replies)} replies
                      </span>
                      <span className="ml-auto">
                        {new Date(tweet.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-600">{message}</div>
        )}
      </CardContent>
    </Card>
  );
}; 