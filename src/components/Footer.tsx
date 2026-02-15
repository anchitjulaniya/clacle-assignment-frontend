import "../styles/footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <span>
          Created by <strong>Anchit Julaniya</strong>
        </span>

        <div className="footerLinks">
          <a
            href="https://github.com/anchitjulaniya"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/anchit-julaniya-b13632175/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
