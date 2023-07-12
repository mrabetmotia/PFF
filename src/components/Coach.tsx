import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {Button} from "@mui/material";

function Coach() {
    const [coachData, setCoachData] = useState([]);
    const { isLoggedIn } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const coachResponse = await axios.get("http://localhost:9000/coachs");
    
          setCoachData(coachResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

  return (
    <div className="records table-responsive ">
           <div className="coach-list-index">
           {coachData.slice(0, 3).map((coach) => (
            <div key={coach.id} className="coach">
              <div>
                <Link href={`/coach/${coach._id}`}>
                  <img className="imgCoach" src={coach.image} alt="" />
                </Link>
                <div className="box">
                  <h2>{coach.nom}</h2>
                  <p>{coach.experiance} years experience</p>
                  <p>description : {coach.description} </p>
                  <p>specialty : {coach.spesialite} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
    <Link
        className="Btn-more"
        href="/coach"
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

export default Coach;
