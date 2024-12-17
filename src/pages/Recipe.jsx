import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMealByID, getFilteredCategory } from "../api";

import { Preloader } from "../components/Preloader";
import { NotFound } from "../pages/NotFound";

import beefImage from "../assets/categories/beef.png";
import chickenImage from "../assets/categories/chicken.png";
import dessertImage from "../assets/categories/dessert.png";
import lambImage from "../assets/categories/lamb.png";
import miscellaneousImage from "../assets/categories/miscellaneous.png";
import pastaImage from "../assets/categories/pasta.png";

function Recipe(props) {
  const { categories, getRandomDifficulty, getRandomPrepTime } = props;
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get the first six categories
  const getFirstSixCategories = () => {
    if (categories.length <= 6) return categories;
    return categories.slice(0, 6);
  };

  // Mapping categories to their respective image assets
  const categoryImages = {
    Beef: beefImage,
    Chicken: chickenImage,
    Dessert: dessertImage,
    Lamb: lambImage,
    Miscellaneous: miscellaneousImage,
    Pasta: pastaImage,
  };

  // Fetching the meal data by ID when the ID or categories change
  useEffect(() => {
    if (categories.length > 0) {
      setLoading(true);

      getMealByID(id).then((data) => {
        if (
          data?.meals &&
          Object.keys(data.meals).length > 0 &&
          data.meals !== "Invalid ID"
        ) {
          setRecipe(data.meals[0]);
        } else {
          setRecipe(null);
        }
      });
    }
  }, [categories, id]);

  // Fetching related recipes based on the current recipe's category
  useEffect(() => {
    if (recipe?.strCategory && recipe?.idMeal) {
      getFilteredCategory(recipe.strCategory).then((data) => {
        const getRandomThreeRecipes = (recipes) => {
          const filteredRecipes = recipes.filter(
            (item) => item.idMeal !== recipe.idMeal
          );

          const shuffledRecipes = [...filteredRecipes].sort(
            () => 0.5 - Math.random()
          );
          return shuffledRecipes.slice(0, 3);
        };

        setRandomRecipes(getRandomThreeRecipes(data.meals));
        setLoading(false);
      });
    }
  }, [recipe?.idMeal, recipe?.strCategory]);

  return (
    <>
      {recipe === null ? (
        <NotFound />
      ) : loading ? (
        <Preloader />
      ) : (
        <div className="section single-recipe">
          <div className="container">
            <div className="headline">
              <h1 className="headline__title">{recipe.strMeal}</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb__item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb__item">
                  <Link to={`/category/${recipe.strCategory}`}>
                    {recipe.strCategory}
                  </Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--active">
                  {recipe.strMeal}
                </li>
              </ul>
            </div>
            <div className="single-recipe__wrapper">
              <div className="single-recipe__content">
                <div className="single-recipe__image">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                </div>
                <div className="recipe-info recipe-info--center">
                  <Link
                    to={`/category/${recipe.strCategory}`}
                    className="recipe-info__category"
                  >
                    <span>{recipe.strCategory}</span>
                  </Link>

                  <span className="recipe-info__prep-time">
                    {getRandomPrepTime()} minutes
                  </span>
                  <span className="recipe-info__difficulty">
                    {getRandomDifficulty()}
                  </span>
                </div>
                <p className="single-recipe__instructions">
                  {recipe.strInstructions}
                </p>
                <h2 className="single-recipe__title">Ingredients</h2>
                <div className="single-recipe__ingredients">
                  <table>
                    <tbody>
                      {Object.keys(recipe).map((key) => {
                        if (key.includes("Ingredient") && recipe[key]) {
                          return (
                            <tr key={key}>
                              <td>
                                <span className="icon-circle"></span>
                              </td>
                              <td>
                                <span>
                                  {recipe[`strMeasure${key.slice(13)}`]}
                                </span>{" "}
                                <span>{recipe[key]}</span>
                              </td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
                {recipe.strYoutube ? (
                  <>
                    <h2 className="single-recipe__title">Video Recipe</h2>
                    <div className="single-recipe__video">
                      <iframe
                        title={id}
                        src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
                          -11
                        )}`}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  </>
                ) : null}
              </div>

              <div className="single-recipe__sidebar">
                {randomRecipes.length > 0 && (
                  <div className="widget">
                    <h4 className="widget__title">Related Recipes</h4>
                    <ul className="widget__list widget__list--single-column">
                      {randomRecipes.map((recipe) => (
                        <li className="widget__item" key={recipe.idMeal}>
                          <Link
                            to={`/meal/${recipe.idMeal}`}
                            className="sidebar-recipe"
                          >
                            <div className="sidebar-recipe__image">
                              <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                              />
                            </div>
                            <div className="sidebar-recipe__content">
                              <h3>{recipe.strMeal}</h3>
                              <span>March 9, 2024</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="widget">
                  <h4 className="widget__title">Categories</h4>
                  <ul className="widget__list widget__list--three-columns">
                    {getFirstSixCategories().map((category, index) => (
                      <li className="widget__item" key={index}>
                        <Link
                          to={`/category/${category}`}
                          className="sidebar-category"
                        >
                          <div className="sidebar-category__icon">
                            <img
                              src={categoryImages[category]}
                              alt={category}
                            />
                          </div>
                          <p className="sidebar-category__name">{category}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Recipe };
