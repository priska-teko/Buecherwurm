import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/"><h1>Bücherwurm</h1></Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/search">Suche</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
