import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const SuperheroForm = () => {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState(1);
  const navigate = useNavigate();

  const submitForm = async () => {
    if (!name.trim() || !superpower.trim()) {
      toast.error("Name and Superpower are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/superheroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, superpower, humilityScore }),
      });

      if (!response.ok) throw new Error("Failed to add superhero");

      toast.success("Superhero added successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} />

      <button
        onClick={() => navigate("/")}
        className="text-blue-500 flex items-center"
      >
        <ArrowLeft size={20} className="mr-2" /> Go Back
      </button>

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Add a Superhero
      </h1>

      <input
        className="border p-2 w-full mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Superpower"
        value={superpower}
        onChange={(e) => setSuperpower(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="number"
        min="1"
        max="10"
        value={humilityScore}
        onChange={(e) =>
          setHumilityScore(Math.min(10, Math.max(1, Number(e.target.value))))
        }
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        onClick={submitForm}
      >
        Submit
      </button>
    </div>
  );
};

export default SuperheroForm;
