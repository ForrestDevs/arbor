"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherViewProps {
  message: string;
  data?: {
    location: {
      city: string;
      country: string;
    };
    current: {
      temperature: number;
      condition: string;
      icon: string;
      humidity: number;
      windSpeed: number;
      feelsLike: number;
    };
    forecast: Array<{
      day: string;
      temperature: {
        min: number;
        max: number;
      };
      condition: string;
      icon: string;
    }>;
  };
}

export const WeatherView: React.FC<WeatherViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Weather Information</h3>

        {data ? (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="text-center">
              <h4 className="text-xl font-semibold">
                {data.location.city}, {data.location.country}
              </h4>
              <div className="flex items-center justify-center mt-4">
                <img
                  src={data.current.icon}
                  alt={data.current.condition}
                  className="w-16 h-16"
                />
                <div className="ml-4">
                  <div className="text-4xl font-bold">
                    {Math.round(data.current.temperature)}°F
                  </div>
                  <div className="text-gray-600">{data.current.condition}</div>
                </div>
              </div>
            </div>

            {/* Current Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-sm text-gray-600">Feels Like</div>
                <div className="font-semibold">
                  {Math.round(data.current.feelsLike)}°F
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{data.current.humidity}%</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="font-semibold">{data.current.windSpeed} mph</div>
              </div>
            </div>

            {/* Forecast */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                5-Day Forecast
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {data.forecast.map((day, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 rounded-lg text-center"
                  >
                    <div className="text-sm font-medium">{day.day}</div>
                    <img
                      src={day.icon}
                      alt={day.condition}
                      className="w-8 h-8 mx-auto my-1"
                    />
                    <div className="text-sm">
                      <span className="font-medium">
                        {Math.round(day.temperature.max)}°
                      </span>
                      <span className="text-gray-500 mx-1">/</span>
                      <span className="text-gray-600">
                        {Math.round(day.temperature.min)}°
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