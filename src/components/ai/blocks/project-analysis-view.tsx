"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectAnalysisViewProps {
  message: string;
  data?: {
    repository: {
      name: string;
      description: string;
      stars: number;
      forks: number;
      lastUpdated: string;
    };
    activity: {
      commits: number;
      contributors: number;
      openIssues: number;
      openPRs: number;
    };
    security: {
      score: number;
      vulnerabilities: number;
      lastAudit?: string;
    };
    codeQuality: {
      score: number;
      testCoverage?: number;
      mainLanguages: string[];
    };
  };
}

export const ProjectAnalysisView: React.FC<ProjectAnalysisViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Analysis</h3>

        {data ? (
          <div className="space-y-6">
            {/* Repository Overview */}
            <div>
              <h4 className="text-xl font-semibold">{data.repository.name}</h4>
              <p className="text-gray-600 mt-1">{data.repository.description}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-sm text-gray-500">
                  ⭐ {data.repository.stars.toLocaleString()} stars
                </span>
                <span className="text-sm text-gray-500">
                  🔄 {data.repository.forks.toLocaleString()} forks
                </span>
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(data.repository.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Commits</div>
                <div className="text-lg font-semibold mt-1">
                  {data.activity.commits.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Contributors</div>
                <div className="text-lg font-semibold mt-1">
                  {data.activity.contributors}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Open Issues</div>
                <div className="text-lg font-semibold mt-1">
                  {data.activity.openIssues}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Open PRs</div>
                <div className="text-lg font-semibold mt-1">
                  {data.activity.openPRs}
                </div>
              </div>
            </div>

            {/* Security & Code Quality */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">Security</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Security Score</span>
                    <span
                      className={`font-medium ${
                        data.security.score >= 80
                          ? "text-green-600"
                          : data.security.score >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.security.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Vulnerabilities</span>
                    <span className="font-medium">
                      {data.security.vulnerabilities}
                    </span>
                  </div>
                  {data.security.lastAudit && (
                    <div className="text-sm text-gray-500 mt-2">
                      Last audited: {new Date(data.security.lastAudit).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">Code Quality</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Quality Score</span>
                    <span
                      className={`font-medium ${
                        data.codeQuality.score >= 80
                          ? "text-green-600"
                          : data.codeQuality.score >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.codeQuality.score}/100
                    </span>
                  </div>
                  {data.codeQuality.testCoverage !== undefined && (
                    <div className="flex justify-between items-center mt-2">
                      <span>Test Coverage</span>
                      <span className="font-medium">
                        {data.codeQuality.testCoverage}%
                      </span>
                    </div>
                  )}
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">Main Languages</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {data.codeQuality.mainLanguages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 rounded text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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