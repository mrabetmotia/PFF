import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

function Cours() {
  const router = useRouter();
  const ITEMS_PER_PAGE = 9;
  const [exercises, setExercises] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');  // new state for selected category

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

  const handleCategoryChange = (selectedCategory) => {  // new function for changing category
    setSelectedCategory(selectedCategory);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getDisplayedExercises = () => {
    const filteredExercises = selectedCategory !== 'all'  // update displayed items based on selected category
      ? exercises.filter((exercise) => exercise.type === selectedCategory)
      : exercises;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredExercises.slice(startIndex, endIndex);
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
                            <div type="button" className="bodyPart-card css-rkc9zz" >
                            <button
                                className={`btn_course ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('all')}
                              >
                                <img src="/images/all.png" alt="icon" />
                                <p className=" css-1gt6l9f">all</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" " data-key="all-separator" data-index="0.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="back" data-index="1">
                        <div className=" css-a4f9ok" title="back">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'back' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('back')}
                              >
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">back</p>
                            </button>

                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="back-separator" data-index="1.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="cardio" data-index="2">
                        <div className=" css-a4f9ok" title="cardio">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'cardio' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('cardio')}
                              >
                            <img src="/images/all.png" alt="icon"  />
                            <p className=" css-1gt6l9f">cardio</p>
                            </button>

                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="cardio-separator" data-index="2.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="chest" data-index="3">
                        <div className=" css-a4f9ok" title="chest">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'chest' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('chest')}
                              >
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">chest</p>
                            </button>

                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="chest-separator" data-index="3.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="lower arms" data-index="4">
                        <div className=" css-a4f9ok" title="lower arms">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'jomb' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('jomb')}
                              >
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">jomb</p>
                            </button>

                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="lower arms-separator" data-index="4.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="lower legs" data-index="5">
                        <div className=" css-a4f9ok" title="lower legs">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'bra' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('bra')}
                              >
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">bra</p>
                            </button>

                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="lower legs-separator" data-index="5.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="neck" data-index="6">
                        <div className=" css-a4f9ok" title="neck">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'abdo' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('abdo')}
                              >
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">abdo</p>
                            </button>

                        </div>
                        </div>
                    </div>
                    <div className=" " data-key="lower legs-separator" data-index="5.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="neck" data-index="6">
                        <div className=" css-a4f9ok" title="neck">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${selectedCategory === 'shoulders' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('shoulders')}
                              >
                            <img src="/images/all.png" alt="icon" />
                            <p className=" css-1gt6l9f">shoulders</p>
                            </button>

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

export default Cours;
