import React, { useEffect, useState } from "react";
import { getAllergens } from "../services/apiService";
import Grid from "@mui/material/Grid";

const AllergensList = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    async function fetchAllergens() {
      try {
        const response = await getAllergens();
        setAllergens(response);
      } catch (error) {
        console.error("Chyba při načítání alergenů:", error);
      }
    }

    fetchAllergens();
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "auto", maxWidth: "600px" }}>
      <h2 style={{ textAlign: "left" }}>Seznam Alergenů</h2>
      <ul style={{ textAlign: "left", listStyleType: "none", padding: 0 }}>
        {allergens.map((allergen, index) => (
          <li key={allergen.id}>
            <strong>{index + 1}. {allergen.name} </strong> -{" "}
            {allergen.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllergensList;
