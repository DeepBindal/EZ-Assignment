  import React, { useState } from "react";
  import axios from "axios";

  // Importing images
  import logoImage from "./assets/ez.png";
  import designIcon from "./assets/design.png";
  import audioIcon from "./assets/audio.png";
  import translationIcon from "./assets/translation.png";
  import graphicIcon from "./assets/graphic.png";
  import researchIcon from "./assets/research.png";
  import dataIcon from "./assets/data.png";

  const services = [
    { title: "Presentation Design", icon: designIcon, description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet" },
    { title: "Audio - Visual Production", icon: audioIcon, description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet" },
    { title: "Translation Services", icon: translationIcon, description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet" },
    { title: "Graphic Design", icon: graphicIcon, description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet" },
    { title: "Research & Analytics", icon: researchIcon, description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet" },
    { title: "Data Processing", icon: dataIcon, description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet" },
  ];

  const App = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    const validateEmail = (emailStr) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(emailStr).toLowerCase());
    };

    const postData = async () => {
      try {
        const response = await axios.post("https://test.ezworks.ai/api", { email });
        console.log(response.data)
        if (response.status === 200) {
          setMessage({ message: "Form Submitted", error: false });
          setEmail("");
        }
      } catch (err) {
        const errorMsg = err.response?.status === 422
          ? "response code 422"
          : "Something went wrong. Please try again later.";

        setMessage({ message: errorMsg, error: true });
      }
    };

    const formSubmit = (e) => {
      e.preventDefault();
      setMessage(null);

      if (!email.trim()) {
        setMessage({ message: "Empty Form Submission is not allowed", error: true });
        return;
      }

      if (!validateEmail(email)) {
        setMessage({ message: "Please enter a valid email address.", error: true });
        return;
      }
      postData();
    };

    return (
      <div className="min-h-screen bg-gray-100 exo-font flex flex-col sm:flex-row items-center justify-center p-6">
          {/* Left Section */}
          <div className="md:w-2/5 flex flex-col justify-between mb-6 md:mb-0 md:mr-8">
            <div className="flex flex-col items-center md:items-start">
              <img src={logoImage} alt="EZ Works Logo" className="w-72 mb-6" />
              <h2 className="text-3xl font-semibold text-[#112949]">Suite Of Business Support Services</h2>
              <p className="text-gray-600 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, totam culpa non velit quas id placeat delectus harum cum doloremque aut vel cupiditate molestias illum magni cumque sunt, eveniet 
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={formSubmit} className="mt-6 hidden sm:block">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  className="w-full md:w-3/4 px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full md:w-1/4 bg-[#EA7B2C] text-white rounded-lg px-6 py-3 hover:bg-orange-600 transition"
                >
                  Contact Me
                </button>
              </div>
            </form>

            {/* Feedback Message */}
            {message && (
              <p className={`mt-4 hidden sm:block text-sm ${message.error ? "text-red-500" : "text-green-500"}`}>
                {message.message}
              </p>
            )}
          </div>

          {/* Right Section */}
          <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-[#112949] text-white sm:p-6 py-5 px-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img src={service.icon} alt={service.title} className="w-10 h-10" />
                  <h3 className="sm:text-xl text-3xl font-semibold text-sky-500">{service.title}</h3>
                </div>
                <p className="sm:text-base text-xl font-medium">{service.description}</p>
              </div>
            ))}
          </div>

          <form onSubmit={formSubmit} className="mt-6 sm:hidden block w-full">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  className="w-full md:w-3/4 px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full md:w-1/4 bg-[#EA7B2C] text-white rounded-lg px-6 py-3 hover:bg-orange-600 transition"
                >
                  Contact Me
                </button>
              </div>
            </form>

            {message && (
              <p className={`mt-4 sm:hidden block text-sm ${message.error ? "text-red-500" : "text-green-500"}`}>
                {message.message}
              </p>
            )}
        
      </div>
    );
  };

  export default App;
