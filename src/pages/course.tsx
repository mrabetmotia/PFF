import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

function Shop() {
  const router = useRouter();
  const ITEMS_PER_PAGE = 9;
  const [exercises, setExercises] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:9000/excercice');
        setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
        setExercises(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur est survenue lors de la récupération des exercices.');
      }
    };

    fetchExercises();
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getDisplayedExercises = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return exercises.slice(startIndex, endIndex);
  };

  return (
    <main>
        <div id='mainExcercice'>
            <div className="header-heading ">
                <h2>Awesome Exercises</h2>
                <h1><span>You Should Know</span></h1>
            </div>
        </div>
        <div>
        <h1 className='titreExcercice'>The Best Excercice</h1>
        <div className=" css-1p959bk">
            <div className="">
                <div className="react-horizontal-scrolling-menu--scroll-container ">
                    <div className=" " data-key="all-separator" data-index="0.1"></div>
                        <div className="react-horizontal-scrolling-menu--item "  data-key="back" data-index="1">
                            <div className=" css-a4f9ok" title="back">
                            <div type="button" className="bodyPart-card css-rkc9zz">
                                <img src="/images/all.png" alt="icon" />
                                <p className=" css-1gt6l9f">all</p>
                            </div>
                        </div>
                    </div>
                    <div className=" " data-key="all-separator" data-index="0.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="back" data-index="1">
                        <div className=" css-a4f9ok" title="back">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">back</p>
                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="back-separator" data-index="1.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="cardio" data-index="2">
                        <div className=" css-a4f9ok" title="cardio">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon"  />
                            <p className=" css-1gt6l9f">cardio</p>
                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="cardio-separator" data-index="2.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="chest" data-index="3">
                        <div className=" css-a4f9ok" title="chest">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">chest</p>
                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="chest-separator" data-index="3.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="lower arms" data-index="4">
                        <div className=" css-a4f9ok" title="lower arms">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">jomb</p>
                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="lower arms-separator" data-index="4.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="lower legs" data-index="5">
                        <div className=" css-a4f9ok" title="lower legs">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">bra</p>
                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="lower legs-separator" data-index="5.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="neck" data-index="6">
                        <div className=" css-a4f9ok" title="neck">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">abdo</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      <div className="css-qxgp2z boxx_container">
        {getDisplayedExercises().map((exercise) => (
          <a className="exercise-card" href={`/exercise/${exercise.id}`} key={exercise.id}>
            <img src={exercise.lien} alt={exercise.nom} />
            <div className="css-1xhj18k">
              <button
                className="css-1ywlhp1"
                type="button"
              >
                waist<span className="css-w0pj6f"></span>
              </button>
              <button
                className="css-td3e3r"
                type="button"
              >
                abs<span className="css-w0pj6f"></span>
              </button>
            </div>
            <p className="css-zx0dr4">{exercise.nom}</p>
          </a>
        ))}
      </div>
      <Box display="flex" className='navigationPages' justifyContent="center" marginBottom={5}>
        <Pagination className='navigationPage' count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
    </main>
  );
}

export default Shop;
