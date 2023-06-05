import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const CoachListPage = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const coachesPerPage = 9;
  const [filterYears, setFilterYears] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/coachs')
      .then(response => response.json())
      .then(data => {
        const uniqueExperience = [...new Set(data.map(coach => coach.experiance))];
        const uniqueSpecialties = [...new Set(data.map(coach => coach.spesialite))];
        setExperienceYears(uniqueExperience);
        setSpecialties(uniqueSpecialties);
        setCoaches(data);
        setFilteredCoaches(data);
      });
  }, []);

  useEffect(() => {
    const filtered = coaches.filter(coach => {
      const matchExperience = filterYears ? coach.experiance >= parseInt(filterYears) : true;
      const matchSpecialty = filterSpecialty ? coach.spesialite === filterSpecialty : true;
      return matchExperience && matchSpecialty;
    });
    setFilteredCoaches(filtered);
    setCurrentPage(0);
  }, [filterYears, filterSpecialty, coaches]);

  const handleFilterYearsChange = (event) => {
    setFilterYears(event.target.value);
  };

  const handleFilterSpecialtyChange = (event) => {
    setFilterSpecialty(event.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastCoach = (currentPage + 1) * coachesPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
  const currentCoaches = filteredCoaches.slice(indexOfFirstCoach, indexOfLastCoach);
  const pageCount = Math.ceil(filteredCoaches.length / coachesPerPage);

  return (
    <>
      <div id='main'>
        <div className="header-heading">
          <h2>Shows Coach You</h2>
          <h1><span>NEED</span></h1>
        </div>
      </div>
      <div>
        <div className='titre-filtrage-coach'>
          <label>
            Filter by years of experience:
          </label>
          <select value={filterYears} onChange={handleFilterYearsChange} className='cherche'>
            <option value="">All</option>
            {experienceYears.map((year, index) => (
              <option key={index} value={year}>{year} years</option>
            ))}
          </select>
        </div>
        <div className='titre-filtrage-coach'>
          <label>
            Filter by specialty:
          </label>
          <select value={filterSpecialty} onChange={handleFilterSpecialtyChange} className='cherche'>
            <option value="">All</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="coach-list">
          {currentCoaches.map(coach => (
            <div key={coach.id} className="coach">
              <div>
                <img src={coach.image} alt="" />
                <div className="box">
                  <h2>{coach.nom}</h2>
                  <p>{coach.experiance} years experience</p>
                  <p>{coach.description} description</p>
                  <p>{coach.spesialite} specialty</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination-container"
          activeClassName="Pagination-shop"
        />
      </div>
    </>
  );
};

export default CoachListPage;
