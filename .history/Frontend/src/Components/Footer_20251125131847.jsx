
import "./Footer.css";

import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TelegramIcon from "@material-ui/icons/Telegram";
import InstagramIcon from "@material-ui/icons/Instagram";

function Footer() {
  return (
    <div className="footer">
      <div>
        <div className="footer-data">

          {/* Contact Details */}
          <div className="contact-details">
            <h1>Contact Us</h1>
            <p><b>INC Pustakalaya</b></p>
            <p>Itahari Namuna College</p>
            <p>Itahari - 4, Sunsari</p>
            <p>Nepal</p>
            <p><b>Email:</b> incpustakalaya@gmail.com</p>
            <p><b>Phone:</b> +977-9812345678</p>
          </div>

          {/* Useful Links */}
          <div className="usefull-links">
            <h1>Useful Links</h1>
            <a href="/books">All Books</a>
            <a href="/signin">Login</a>
            <a href="/dashboard@member">Member Dashboard</a>
            <a href="/dashboard@admin">Admin Dashboard</a>
          </div>

          {/* Librarian Details */}
          <div className="librarian-details">
            <h1>Librarian</h1>
            <p><b>Name:</b> Mrs. S. Thapa</p>
            <p><b>Qualification:</b> M.LISc</p>
            <p><b>Contact:</b> +977-9800000000</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="contact-social">
          <a href="#" className="social-icon">
            <TwitterIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} />
          </a>
          <a href="#" className="social-icon">
            <LinkedInIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} />
          </a>
          <a href="#" className="social-icon">
            <TelegramIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} />
          </a>
          <a href="#" className="social-icon">
            <InstagramIcon style={{ fontSize: 40, color: "rgb(283,83,75)" }} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright-details">
        <p className="footer-copyright">
          © {new Date().getFullYear()} INC Pustakalaya — All Rights Reserved  
          <br />
          <span>Designed with ❤️ by Itahari Namuna College Students</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
