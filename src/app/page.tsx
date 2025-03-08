import Hero2 from "@/components/Hero2";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="relative flex items-center justify-center min-h-screen bg-green-900 text-white text-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://static.vecteezy.com/system/resources/previews/002/642/056/mp4/a-portrait-of-a-thai-farmer-holding-a-computer-notebook-in-a-corn-field-examining-crops-agrobusiness-ideas-and-innovations-free-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        {/* Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative  max-w-3xl px-6">
          <h1 className="text-5xl  font-extrabold   sm:text-6xl">
            Empowering Farmers with{" "}
            <span className=" text-5xl bg-[#357446]"> Smart Insights 🌱 </span>
          </h1>
          <p className="mt-4 text-lg text-gray-200 sm:text-xl">
            Agrisense provides AI-driven solutions to optimize crop growth, soil
            health, and irrigation planning.
          </p>
          <div className="mt-6">
            <a
              href="/dashboard"
              className="px-6 py-3 text-lg font-medium bg-white text-green-700 rounded-lg shadow-lg hover:bg-green-100 transition duration-300"
            >
              Let&apos;s Grow 🚀
            </a>
          </div>
        </div>
      </div>

      <Hero2 />
    </>
  );
}
