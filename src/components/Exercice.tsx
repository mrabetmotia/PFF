import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {Button} from "@mui/material";

function Exercice() {
  const [exerciseData, setExerciseData] = useState([]);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const exerciseResponse = await axios.get("http://localhost:9000/excercice");

      setExerciseData(exerciseResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="records table-responsive ">
      <div className="css-qxgp2z boxx_container">
        {exerciseData.slice(0, 6).map((exercise) => (
          <>
            <div className="exercise-card">
              <Link href={`/course/${exercise._id}`}>
                <img src={`/exercice/${exercise.lien}`} alt={exercise.nom} />
              </Link>
              <div className="css-1xhj18k"></div>
              <p className="css-zx0dr4">{exercise.nom}</p>
            </div>
          </>
        ))}
      </div>
    <Link
        className="Btn-more"
        href="/course"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="BTN-More"
      >
        View More
      </Button>
    </Link>
  </div>
  );
}

export default Exercice;
