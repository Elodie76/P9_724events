import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPaused]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPaused && byDateDesc?.length) {
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [index, isPaused, byDateDesc]);
 
  return (
    <div className="SlideCardList" data-testid="slider" data-paused={isPaused}>
      {byDateDesc?.map((event, idx) => (
         
        <div key={event.title}>  {/* Utiliser `event.id` pour garantir l'unicité */}    
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.title}`} // Clé unique pour chaque input
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(index)}
                  
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;