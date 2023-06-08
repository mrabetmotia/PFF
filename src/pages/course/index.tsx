import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Pagination } from '@mui/lab';
import { Box } from '@mui/system';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

function Cours() {
  const router = useRouter();
  const itemsPerPage = 12;
  const [exercises, setExercises] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:9000/excercice');
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setExercises(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur est survenue lors de la récupération des exercices.');
      }
    };

    fetchExercises();
  }, []);

  

  const handleCategoryChange = (category) => {
    setErrorMessage(category === errorMessage ? '' : category);
    setCurrentPage(1);
  };


    const filteredProducts = errorMessage !== ''
    ? exercises.filter((exercise) => exercise.type === errorMessage)
    : exercises;


  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
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
                              className={`btn_course ${errorMessage === '' ? 'active' : ''}`}
                              onClick={() => handleCategoryChange('')}
                            >
                              <img src="/images/all.png" alt="icon" />
                              <p className="css-1gt6l9f">all</p>
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className=" " data-key="all-separator" data-index="0.1"></div>
                    <div className="react-horizontal-scrolling-menu--item " data-key="back" data-index="1">
                        <div className=" css-a4f9ok" title="back">
                        <div type="button" className="bodyPart-card css-rkc9zz">
                        <button
                                className={`btn_course ${errorMessage === 'back' ? 'active' : ''}`}
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
                                className={`btn_course ${errorMessage === 'cardio' ? 'active' : ''}`}
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
                                className={`btn_course ${errorMessage === 'chest' ? 'active' : ''}`}
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
                                className={`btn_course ${errorMessage === 'jomb' ? 'active' : ''}`}
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
                                className={`btn_course ${errorMessage === 'bra' ? 'active' : ''}`}
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
                                className={`btn_course ${errorMessage === 'abdo' ? 'active' : ''}`}
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
                                className={`btn_course ${errorMessage === 'shoulders' ? 'active' : ''}`}
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
      {currentProducts.map((exercise) => (
        <div className="exercise-card" >
                <Link href={`/course/${exercise._id}`}>
            
            <img src={exercise.lien} alt={exercise.nom} />
            </Link>
            <div className="css-1xhj18k">
            </div>
            <p className="css-zx0dr4">{exercise.nom}</p>
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
    </main>
  );
}

export default Cours;
