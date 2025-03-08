import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { location } = reqBody;
    console.log("ye aaya location from reqboyd", reqBody);
    if (!location) {
      return NextResponse.json({
        success: false,
        message: "Error:location not exist in body",
      });
    }

    // Get weather details using OpenWeatherMap API
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=en&appid=${process.env.OPENWEATHER_API}`,
    );
    const weatherDetails = weatherResponse.data;

    // Generate AI response using Google Generative AI
    const prompt = `You are an agricultural expert. Provide detailed irrigation plans and crop suggestions based on the user's location and weather conditions. The user's current location is ${JSON.stringify(location)}. The weather details are ${JSON.stringify(weatherDetails)}. Give me the best irrigation plan for this location and suggest the best crops to grow.
    Return the response in this JSON format only, no additional text, and in explanation explain a timetable for irrigation plan:
    {
      "data": [
        {
          "Best Plants to grow": "string",
          "irrigation watering plan": ["string", "string", "string", "string"],
          "explanation": "string"
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const aiMessage = result.response.text();
    const cleanedText = aiMessage.replace(/```(?:json)?\n?/g, "").trim();
    const respo = JSON.parse(cleanedText);

    return NextResponse.json({ plan: respo }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 200 },
    );
  }
}
