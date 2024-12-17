import { Link } from "react-router-dom";

import SVG from "react-inlinesvg";
import icoError from "../assets/icons/ico-error.svg";

function NoResults() {
  return (
    <div className="section no-results">
      <div className="container">
        <div className="no-results__icon">
          <div className="circle">
            <span className="circle-small"></span>
            <span className="circle-medium"></span>
            <span className="circle-large"></span>
          </div>
          <SVG src={icoError} />
        </div>
        <div className="headline headline--mb-0">
          <h2 className="headline__title">No results found</h2>
          <p className="headline__subtitle">
            We couldn't find what you searched for. Try searching again
          </p>
          <Link to="/" className="btn">
            <span>Back to all categories</span>
            <div className="btn__overlay"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { NoResults };
