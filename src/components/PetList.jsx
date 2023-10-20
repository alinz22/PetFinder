import React, { useEffect, useState } from "react";

// Hardcoded credentials (not recommended for real projects)
const CLIENT_ID = "YOUR_CLIENT_ID_HERE";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET_HERE";

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

function PetList() {
  const [animals, setAnimals] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchedToken = await fetchAccessToken();
      setToken(fetchedToken);
      const fetchedAnimals = await fetchAnimals(fetchedToken);
      setAnimals(fetchedAnimals);
    }

    fetchData();
  }, []);

  return (
    <div>
      {animals.map((animal) => (
        <div key={animal.id}>
          <h2>{animal.name}</h2>
          <img src={animal.photos[0]?.medium} alt={animal.name} />
          <p>{animal.description}</p>
          {/* ... any other attributes you wish to display ... */}
        </div>
      ))}
    </div>
  );
}

export default PetList;
