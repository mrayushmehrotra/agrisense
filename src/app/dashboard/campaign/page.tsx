"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const CreateCampaign = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign in first");
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const [form, setForm] = useState({
    userId: "",
    title: "",
    description: "",
    goalAmount: "",
    category: "Medical",
    image: "", // Store Base64-encoded image
  });

  // Update userId when user is available
  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignedIn) return;

    try {
      const response = await axios.post("/api/campaign", form, {
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log(response);
        toast.success("Campaign created successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Fundraising Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Describe your campaign"
          className="w-full p-2 border rounded"
          rows={4}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="goalAmount"
          placeholder="Goal Amount (USD)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        {/* Image Upload Input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={handleImageUpload}
          required
        />
        <select
          name="category"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        >
          <option value="Medical">Medical</option>
          <option value="Child">Child</option>
          <option value="Education">Education</option>
          <option value="Disaster Relief">Disaster Relief</option>
        </select>
        <button
          type="submit"
          className="w-full bg-[#EF4444] text-white py-2 rounded hover:bg-orange-700"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
