import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Search } from "./Search";

import SVG from "react-inlinesvg";
import icoWave from "../assets/icons/ico-wave-line.svg";
import icoHamburger from "../assets/icons/ico-hamburger-menu.svg";
import icoSearch from "../assets/icons/ico-search.svg";

function Header(props) {
  const { searchValue, handleSearch } = props;
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Effect to track page scroll and update `hasScrolled` accordingly
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to close the menu and search bar when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Toggle the menu's open/close state, closing search if menu opens
  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (!prev) setIsSearchOpen(false);
      return !prev;
    });
  };

  // Toggle the search bar's open/close state, closing menu if search opens
  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      if (!prev) setIsMenuOpen(false);
      return !prev;
    });
  };

  return (
    <header className={`header ${hasScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <NavLink to="/" className="logo">
          RecipeBox
        </NavLink>
        <div className={`search-drop ${isSearchOpen ? "open" : ""}`}>
          <Search searchValue={searchValue} cb={handleSearch} />
        </div>
        <div className={`nav-drop ${isMenuOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <li>
                <NavLink to="/about" className="link" activeClassName="active">
                  <span className="link__text">
                    About
                    <span className="wave">
                      <SVG src={icoWave} />
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="link"
                  activeClassName="active"
                >
                  <span className="link__text">
                    Contact
                    <span className="wave">
                      <SVG src={icoWave} />
                    </span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="nav-mobile">
          <div className="search-mobile" onClick={toggleSearch}>
            <SVG src={icoSearch} />
          </div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <SVG src={icoHamburger} />
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
