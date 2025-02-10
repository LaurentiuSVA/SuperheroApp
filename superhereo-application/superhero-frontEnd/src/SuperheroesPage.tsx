import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Superhero {
  id: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

const SuperheroesPage = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);

  // Fetch-ul pentru eroi
  useEffect(() => {
    fetch("http://localhost:3000/superheroes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        if (Array.isArray(data)) {
          setSuperheroes(data);
        } else {
          console.error("Received data is not an array:", data);
        }
      });
  }, []);

  // Funcția de ștergere
  const deleteHero = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/superheroes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete superhero");
      }

      // Elimină eroul din lista de eroi
      setSuperheroes(superheroes.filter((hero) => hero.id !== id));
      toast.success("Superhero deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete superhero!");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} />{" "}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Humble Superheroes
      </h1>
      <Link
        to="/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
      >
        Add Superhero
      </Link>
      <ul className="mt-6">
        {superheroes.map((hero) => (
          <li
            key={hero.id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center mb-4"
          >
            <div>
              <span className="font-semibold text-lg">{hero.name}</span> -{" "}
              <span className="text-gray-600">{hero.superpower}</span>{" "}
              (Humility: {hero.humilityScore})
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => deleteHero(hero.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperheroesPage;
