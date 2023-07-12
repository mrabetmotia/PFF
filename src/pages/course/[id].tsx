import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [exercice, setExcerice] = useState(null);

  useEffect(() => {
    const fetchExcericeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9000/excercice/${id}`);
        const ExcericeData = await response.json();
        setExcerice(ExcericeData);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchExcericeDetails();
    }
  }, [id]);

  if (!exercice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-detail">
      <h1>
        Exserice Detail <span>{exercice.nom}</span>
      </h1>
      <img src={`/exercice/${exercice.lien}`} className="Excerice-image" />
      <p>Type : {exercice.type}</p>
      <p>{exercice.description}</p>
    </div>
  );
};

export default CourseDetail;
