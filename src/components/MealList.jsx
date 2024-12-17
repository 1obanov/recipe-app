import { Link } from "react-router-dom";
import { Meal } from "./Meal";

function MealList(props) {
  const { meals, strCategory, getRandomDifficulty, getRandomPrepTime } = props;

  return (
    <div className="section category">
      <div className="container">
        <div className="headline">
          <h1 className="headline__title">Category: {strCategory}</h1>
          <ul className="breadcrumb">
            <li className="breadcrumb__item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--active">
              {strCategory}
            </li>
          </ul>
        </div>
        <ul className="list">
          {meals.map((meal) => (
            <Meal
              key={meal.idMeal}
              {...meal}
              strCategory={strCategory}
              getRandomDifficulty={getRandomDifficulty}
              getRandomPrepTime={getRandomPrepTime}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { MealList };
