import { useLocation } from "react-router-dom";
import { CategoryItem } from "./CategoryItem";

function CategoryList(props) {
  const { catalog } = props;
  const location = useLocation();

  return (
    <div className="section categories">
      <div className="container">
        {!location.search && (
          <div className="headline">
            <h1 className="headline__title">All Categories</h1>
            <p className="headline__subtitle">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam
              nonumy eirmod tempor invidunt adhuc persius.
            </p>
          </div>
        )}
        <ul className="list">
          {catalog.map((el) => (
            <CategoryItem key={el.idCategory} {...el} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { CategoryList };
