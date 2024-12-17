import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllCategories } from "../api";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NoResults } from "../components/NoResults";
import { Preloader } from "../components/Preloader";

import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Category } from "../pages/Category";
import { Recipe } from "../pages/Recipe";
import { NotFound } from "../pages/NotFound";

// Function to randomly select a difficulty level
const getRandomDifficulty = () => {
  const difficulties = ["Super Easy", "Easy", "Medium"];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
};

// Function to randomly generate preparation time between 5 and 60 minutes
const getRandomPrepTime = () => {
  const maxTime = 60;
  const minTime = 5;
  const step = 5;
  const randomStep = Math.floor(
    Math.random() * ((maxTime - minTime) / step + 1)
  );
  return minTime + randomStep * step;
};

function Main() {
  const [catalog, setCatalog] = useState([]); // catalog useState
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pathname, search } = useLocation();
  const { push } = useHistory();

  // Get the search value from the URL
  const searchValue = new URLSearchParams(search).get("search") || "";

  // Function to handle the search functionality
  const handleSearch = (str) => {
    // Filters the catalog based on the search term
    setFilteredCatalog(
      catalog.filter((item) =>
        item.strCategory.toLowerCase().includes(str.toLowerCase())
      )
    );

    // Redirect to the home page after a search
    if (pathname !== "/") {
      push({
        pathname: "/",
        search: `?search=${str}`,
      });
    } else {
      push({
        search: `?search=${str}`,
      });
    }
  };

  // useEffect to fetch categories when the component mounts or when `search` changes
  useEffect(() => {
    setLoading(true);

    if (pathname === "/") {
      getAllCategories().then((data) => {
        setCatalog(data.categories);
        setFilteredCatalog(
          search
            ? data.categories.filter((item) =>
                item.strCategory
                  .toLowerCase()
                  .includes(search.split("=")[1].toLowerCase())
              )
            : data.categories
        );

        setLoading(false);
      });
    }
  }, [pathname, search]);

  // useEffect to extract and set categories from the catalog whenever it changes
  useEffect(() => {
    getAllCategories().then((data) => {
      const filteredCategories = data.categories
        .filter((item) => item.strCategory)
        .map((item) => item.strCategory);

      setCategories(filteredCategories);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header handleSearch={handleSearch} searchValue={searchValue} />
      <main className="main">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loading ? (
                <Preloader />
              ) : filteredCatalog.length === 0 ? (
                <NoResults />
              ) : (
                <Home filteredCatalog={filteredCatalog} />
              )
            }
          />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route
            exact
            path="/category/:name"
            render={() => (
              <Category
                getRandomDifficulty={getRandomDifficulty}
                getRandomPrepTime={getRandomPrepTime}
              />
            )}
          />
          <Route
            exact
            path="/meal/:id"
            render={() => (
              <Recipe
                categories={categories}
                getRandomDifficulty={getRandomDifficulty}
                getRandomPrepTime={getRandomPrepTime}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export { Main };
