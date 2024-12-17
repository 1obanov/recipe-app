import { Link } from "react-router-dom";

import SVG from "react-inlinesvg";
import icoWave from "../assets/icons/ico-wave-line.svg";

function CategoryItem(props) {
  const { idCategory, strCategory, strCategoryDescription, strCategoryThumb } =
    props;

  return (
    <li className="list__item" category-id={idCategory}>
      <Link to={`/category/${strCategory}`} className="card">
        <div className="card__img">
          <img src={strCategoryThumb} alt={strCategory} />
        </div>
        <div className="card__body">
          <h4 className="title">{strCategory}</h4>
          <p className="description">{strCategoryDescription}</p>
          <span className="link">
            Learn More
            <span className="wave">
              <SVG src={icoWave} />
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

export { CategoryItem };
