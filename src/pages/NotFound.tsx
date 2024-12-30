import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="notfound-section">
      <div>
        <h1>
          Page not found, return to <Link to={"/"}> start.</Link>
        </h1>
      </div>
    </section>
  );
};
