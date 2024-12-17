import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFilteredCategory } from "../api";

import { Preloader } from "../components/Preloader";
import { MealList } from "../components/MealList";
import { NotFound } from "../pages/NotFound";

function Category(props) {
  const { getRandomDifficulty, getRandomPrepTime } = props;
  const { name } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getFilteredCategory(name).then((data) => setMeals(data.meals));
  }, [name]);

  return (
    <>
      {meals === null ? (
        <NotFound />
      ) : !meals.length ? (
        <Preloader />
      ) : (
        <MealList
          meals={meals}
          strCategory={name}
          getRandomDifficulty={getRandomDifficulty}
          getRandomPrepTime={getRandomPrepTime}
        />
      )}
    </>
  );
}

export { Category };
