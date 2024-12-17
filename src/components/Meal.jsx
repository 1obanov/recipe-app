import { Link } from "react-router-dom";

import SVG from "react-inlinesvg";
import icoWave from "../assets/icons/ico-wave-line.svg";

function Meal(props) {
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    getRandomDifficulty,
    getRandomPrepTime,
  } = props;

  return (
    <li className="list__item" category-id={idMeal}>
      <Link to={`/meal/${idMeal}`} className="card">
        <div className="card__img">
          <img src={strMealThumb} alt={strMeal} />
        </div>
        <div className="card__body">
          <div className="recipe-info">
            <span className="recipe-info__category">
              <span>{strCategory}</span>
            </span>
            <span className="recipe-info__prep-time">
              {getRandomPrepTime()} minutes
            </span>
            <span className="recipe-info__difficulty">
              {getRandomDifficulty()}
            </span>
          </div>
          <h4 className="title">{strMeal}</h4>
          <span className="link">
            Read recipe
            <span className="wave">
              <SVG src={icoWave} />
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

export { Meal };
