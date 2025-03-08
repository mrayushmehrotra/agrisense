"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Get user IP
      const userIP = await axios.get("https://api.ipify.org/?format=json");
      // Get location details using IP
      const location = await axios.get(`https://ipinfo.io/${userIP.data.ip}`);
      console.log("Location:", location.data);

      // Call backend API to get weather and AI-generated plan
      const response = await axios.post("/api/ai", {
        location: location.data.city,
      });
      console.log(location.data.city);
      console.log("AI Response:", response.data);
      setData(response.data.plan);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:underline">
          General
        </Link>{" "}
        / Transactions
      </div>

      {/* Title */}
      <h1 className="text-xl w-fit bg-red-500 rounded-full px-4 py-2 text-white mb-4">
        Irrigation Setup
      </h1>

      {/* Table */}
      {isLoading ? (
        <div className="h-2 w-2 animate-spin"> </div>
      ) : (
        <Button onClick={handleSubmit}>Get your Plan Now!</Button>
      )}
      <div className="bg-white p-4 rounded-lg shadow-lg">{data}</div>
    </div>
  );
}
