import { Link, Outlet } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Root.css";

export const Root = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <img
            className="logoNav"
            src="./src/assets/juniorDev.png"
            alt="junior dev logo"
          />
        </Link>

        <Link className="navLink" to="/radionice">
          Radionice
        </Link>
        <Link className="navLink" to="/predavaci">
          Predavaci
        </Link>
        <Link className="navLink" to="/administracija">
          Administracija
        </Link>
      </nav>

      <div className="line"></div>
      <main>
        <Outlet />
      </main>
      <div>
        <div className="line"></div>
        <footer>
          <img
            className="logoFooter"
            src="./src/assets/digDal.png"
            alt="digital dalmacija logo"
          />
          <div className="socialIcons">
            <a
              href="https://web.facebook.com/ictzupanija/?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="facebookIcon" />
            </a>
            <a
              href="https://www.instagram.com/digitalnadalmacija/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="instagramIcon" />
            </a>
            <a
              href="https://hr.linkedin.com/company/digitalnadalmacija"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="linkedinIcon" />
            </a>
            <a
              href="https://www.youtube.com/@digitalnadalmacija/featured"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="youtubeIcon" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};
