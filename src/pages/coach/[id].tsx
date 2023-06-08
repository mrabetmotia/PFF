import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CoachDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9000/Coachs/${id}`);
        const CoachData = await response.json();
        setCoach(CoachData);
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
      <h1>Exserice Detail <span>{coach.nom}</span></h1>
      <video controls>
        <source src="/video/coach.mp4" type="video/mp4" />
      </video>
      <p>{coach.experiance} years experience</p>
      <p>description : {coach.description} </p>
      <p>specialty : {coach.spesialite} </p>
      <p>phone number : {coach.tel} </p>
      <p>Email : {coach.email} </p>
    </div>
  );
};

export default CoachDetail;
