"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function IrrigationPlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [UserLocation, setUserLocation] = useState();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const userIP = await axios.get("https://api.ipify.org/?format=json");
      const location = await axios.get(`https://ipinfo.io/${userIP.data.ip}`);
      console.log("Location:", location.data);
      setUserLocation(location.data);
      const response = await axios.post("/api/ai", {
        location: location.data.city,
      });
      // console.log("AI Response:", response.data.plan.data[0].explanation);

      setData(response.data.plan.data[0].explanation);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl ">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex gap-2">
        <Link href="/dashboard" className="hover:underline">
          General
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Irrigation Setup</span>
      </nav>

      <div className="mt-6 ">
        <Button
          onClick={handleSubmit}
          className="text-2xl p-8 rounded-full hover:bg-red-700 font-semibold bg-red-500 text-white shadow-md w-fit"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin  mr-2 h-5 w-5" /> Fetching
              Plan...
            </>
          ) : (
            "Get Your Plan Now!"
          )}
        </Button>
      </div>
      <div className="absolute left-[20%] p-12 ">
        <div className="mt-6 bg-white p-6 rounded-lg overflow-y-auto shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Your AI-Generated Plan for area near :{" "}
            {UserLocation ? (
              <p>{UserLocation.city} </p>
            ) : (
              "Wait for Plan Fetching "
            )}
          </h2>
          <div className="mt-2 text-gray-700 whitespace-pre-line">
            {data ? (
              <>
                <h3 className="font-medium text-lg">{data} </h3>
              </>
            ) : (
              "Click the button above to fetch your irrigation plan."
            )}
          </div>
        </div>
      </div>
      <center className="absolute left-[25%] text-center bottom-0 p-2">
        <p className="text-zinc-400">
          the provided location and details might be incorrect because AI can
          produce false information, AI is just there to help, not to replace :)
        </p>
      </center>
    </div>
  );
}
