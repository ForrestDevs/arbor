"use client";

import React, { useState } from "react";
import { useAI } from "@/components/ai/context";

export const PromptUserAuthentication: React.FC = () => {
  const { sendClientEvent } = useAI();
  const [formData, setFormData] = useState({
    phone_number: "",
    last_4_digits: "",
    last_4_digits_type: "credit_card",
    date_of_birth: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Here are my auth details, please authenticate me. ${JSON.stringify(
              formData
            )}`,
          },
        ],
      },
    });
    sendClientEvent({ type: "response.create" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow"
    >
      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          placeholder="(123) 456-7890"
          pattern="^\(\d{3}\) \d{3}-\d{4}$"
          value={formData.phone_number}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="last_4_digits"
          className="block text-sm font-medium text-gray-700"
        >
          Last 4 Digits
        </label>
        <input
          type="text"
          id="last_4_digits"
          name="last_4_digits"
          placeholder="1234"
          pattern="\d{4}"
          value={formData.last_4_digits}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="last_4_digits_type"
          className="block text-sm font-medium text-gray-700"
        >
          Digits Type
        </label>
        <select
          id="last_4_digits_type"
          name="last_4_digits_type"
          value={formData.last_4_digits_type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="credit_card">Credit Card</option>
          <option value="ssn">SSN</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="date_of_birth"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};
