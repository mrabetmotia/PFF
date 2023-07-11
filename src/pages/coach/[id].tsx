import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CoachDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9000/Coachs/${id}`);
        const coachData = await response.json();
        setCoach(coachData);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchCoachDetails();
    }
  }, [id]);

  if (!coach) {
    return <div>Loading...</div>;
  }

  return (
    <div className="coach-detail">
      <h1 className="exercise-title">
        Exercise Detail <span>{coach.nom}</span>
      </h1>
      <div className="video-container">
        <video className="coach-video" autoPlay muted controls>
          <source src={coach.video} />
        </video>
      </div>
      <p className="experience">Years of experience: {coach.experiance}</p>
      <p className="description">Description: {coach.description}</p>
      <p className="specialty">Specialty: {coach.spesialite}</p>
      <p className="phone">Phone number: {coach.phone}</p>
      <p className="email">Email: {coach.email}</p>
    </div>
  );
};

export default CoachDetail;
