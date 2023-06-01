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
        <h1 className='titreExcercice'>The Best Excercice</h1>
        <div className="MuiBox-root css-1p959bk">
            <div className="react-horizontal-scrolling-menu--wrapper ">
                <p className="MuiTypography-root MuiTypography-body1 right-arrow css-9l3uo3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC6SURBVHgB7dPNDYJAEAXgtxsK2QMDHC3BjsQKxAoswRbsAErwbEzcDrQAYBxXD3iR064hmS8hGX6S9xJ2AKXUEnCerxGJnfuAi2IHa1ouyxoR2NlwcCPjA+PYIaVXOBfEct2ZaIWUNDxluJmGfw6cPLVbDMMZMfW9N977UED2vJZVOyAp3pvLtcnCnGUnjMNGJvd+xx2iM/7rlqvKyb+/hTNAdMQ/aAkt8bNESYnXdFqC8padc1BKqQiegiJ4Qs4BrPgAAAAASUVORK5CYII=" alt="left-arrow"/></p>
                <div className="react-horizontal-scrolling-menu--scroll-container ">
                    <div className="react-horizontal-scrolling-menu--separator " data-key="all-separator" data-index="0.1"></div>
                        <div className="react-horizontal-scrolling-menu--item "  data-key="back" data-index="1">
                            <div className="MuiBox-root css-a4f9ok" title="back">
                            <div type="button" className="bodyPart-card css-rkc9zz">
                                <img src="/images/all.png" alt="icon" />
                                <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">all</p>
                            </div>
                        </div>
                    </div>
                    <div className="react-horizontal-scrolling-menu--separator " data-key="all-separator" data-index="0.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="back" data-index="1">
                        <div className="MuiBox-root css-a4f9ok" title="back">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">back</p>
                        </div>
                        </div>
                    </div>
                    <div className="react-horizontal-scrolling-menu--separator " data-key="back-separator" data-index="1.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="cardio" data-index="2">
                        <div className="MuiBox-root css-a4f9ok" title="cardio">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon"  />
                            <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">cardio</p>
                        </div>
                        </div>
                    </div>
                    <div className="react-horizontal-scrolling-menu--separator " data-key="cardio-separator" data-index="2.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="chest" data-index="3">
                        <div className="MuiBox-root css-a4f9ok" title="chest">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">chest</p>
                        </div>
                        </div>
                    </div>
                    <div className="react-horizontal-scrolling-menu--separator " data-key="chest-separator" data-index="3.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="lower arms" data-index="4">
                        <div className="MuiBox-root css-a4f9ok" title="lower arms">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">jomb</p>
                        </div>
                        </div>
                    </div>
                    <div className="react-horizontal-scrolling-menu--separator " data-key="lower arms-separator" data-index="4.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="lower legs" data-index="5">
                        <div className="MuiBox-root css-a4f9ok" title="lower legs">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">bra</p>
                        </div>
                        </div>
                    </div>
                    <div className="react-horizontal-scrolling-menu--separator " data-key="lower legs-separator" data-index="5.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="neck" data-index="6">
                        <div className="MuiBox-root css-a4f9ok" title="neck">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                            <img src="/images/all.png" alt="icon" />
                            <p className="MuiTypography-root MuiTypography-body1 css-1gt6l9f">abdo</p>
                        </div>
                        </div>
                    </div>
                </div>
                <p className="MuiTypography-root MuiTypography-body1 left-arrow css-9l3uo3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACvSURBVHgB7ZLBCQIxEEX/iAVsCTkkskftQDuzA7EDO1ntwOPCXtKBe1Z0nETQaw6brLrzYBICgfcgARRF+Ue4rg07t0y5O8PABDke9waEJiVi8ABqWy/bSaZKjcgCL9xBhmUuGvHVERQvWLtGboh2YgvyHowNdd35EyB1KEuP621F3vt5PDIfkRsiI6t5HXgf5ChFePf4/vEf2C1KovIJyo2pRpO/I0Q8mlxRlJ/jCRjDdrUo31+wAAAAAElFTkSuQmCC" alt="right-arrow"/></p>
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
