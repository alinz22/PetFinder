// List.jsx
import React, { useEffect, useState, useMemo } from "react";
import Card from "./Card";
import DataVisualization from "./DataVisualization"; // Make sure to create this component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for programmatic navigation

const CLIENT_ID = "95TLLWq3i5Zug5R33a5BSQiTqED3zwKUgQYNSJseWBGU6X4pHJ";
const CLIENT_SECRET = "hhUh3IH9QSwEJ2ZgY8lb7MDjEKRQIGw3xtOHbF5X";

async function fetchAccessToken() {
  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });

  const data = await response.json();
  return data.access_token;
}

async function fetchAnimals(token) {
  const response = await fetch(
    "https://api.petfinder.com/v2/animals?type=dog&page=2",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.animals;
}

function List() {
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    async function fetchData() {
      const fetchedToken = await fetchAccessToken();
      const fetchedAnimals = await fetchAnimals(fetchedToken);
      setAnimals(fetchedAnimals);
    }

    fetchData();
  }, []);

  const filteredAnimals = useMemo(() => {
    return animals
      .filter(
        (animal) =>
          !searchTerm ||
          animal.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (animal) => !typeFilter || animal.type.toLowerCase() === typeFilter
      )
      .filter((animal) => !ageFilter || animal.age.toLowerCase() === ageFilter)
      .filter(
        (animal) =>
          !genderFilter || animal.gender.toLowerCase() === genderFilter
      )
      .filter(
        (animal) =>
          !breedFilter || animal.breeds.primary.toLowerCase() === breedFilter
      );
  }, [animals, searchTerm, typeFilter, ageFilter, genderFilter, breedFilter]);

  // Data for visualization (example: gender distribution)
  const visualizationData = useMemo(() => {
    const genderData = animals.reduce((acc, animal) => {
      const gender = animal.gender || "Unknown";
      if (!acc[gender]) {
        acc[gender] = 1;
      } else {
        acc[gender] += 1;
      }
      return acc;
    }, {});

    return Object.entries(genderData).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [animals]);

  return (
    <div>
      {/* Render the DataVisualization component and pass the data to it */}
      <DataVisualization data={visualizationData} />

      {/* Animal list */}
      {filteredAnimals.map((animal) => (
        <Card key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

export default List;
