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
      <footer>
        <div className="line"></div>

        <div className="footerUpper">
          <img
            className="logoFooter"
            src="./src/assets/digDal.png"
            alt="digital dalmacija logo"
          />
          <div className="footerInfo">
            <p>Kontakt podaci Domovinskog rata 2/IV, 21000 Split</p>
            <p>tel. 021/400-027 i 021/400-158</p>
            <a href="mailto:info@digitalnadalmacija.hr​">
              info@digitalnadalmacija.hr​
            </a>
          </div>
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
        </div>
        <div className="footerUnder">
          <p>
            © Sva prava pridržana Splitsko-dalmatinska Županija 2024 - Izradio
            Duje Lozić
          </p>
        </div>
      </footer>
    </>
  );
};
