import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ADD from './insc';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const CoachListPage = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const coachesPerPage = 9;
  const [filterYears, setFilterYears] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddCancel = () => {
    setAddDialogOpen(false);
  };
  useEffect(() => {
    fetch('http://localhost:9000/coachs')
      .then(response => response.json())
      .then(data => {
        const uniqueExperience = [...new Set(data.map(coach => coach.experiance))];
        const uniqueSpecialties = [...new Set(data.map(coach => coach.spesialite))];
        setExperienceYears(uniqueExperience);
        setSpecialties(uniqueSpecialties);
        setCoaches(data);
        setFilteredCoaches(data.filter(coach => coach.verification === 'valide'));
      });
  }, []);

  useEffect(() => {
    const filtered = coaches.filter(coach => {
      const matchExperience = filterYears ? coach.experiance >= parseInt(filterYears) : true;
      const matchSpecialty = filterSpecialty ? coach.spesialite === filterSpecialty : true;
      return matchExperience && matchSpecialty && coach.verification === 'valide';
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
      <div id='main-coach'>
        <div className="header-heading">
          <h2>Shows Coach You</h2>
          <h1><span>NEED</span></h1>
          <div className="header-btns">
            <Button
              variant="contained"
              color="primary"
              className="btnadd"
              onClick={handleAddClick}
            >
              Create Poste
            </Button>
            <Dialog open={addDialogOpen} onClose={handleAddCancel}>
              <DialogContent>
                <ADD />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAddCancel} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>   
          </div>
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
                <Link href={`/coach/${coach._id}`}>
                  <img src={coach.image} alt="" />
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
