import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-gradient h-[130px] mt-[200px] flex flex-col items-center justify-center">
      <img src="red-devils2.svg" alt="Red Devils" className="mb-4" />
      <div className="flex gap-3">
        <a href="https://linkedin.com/in/rifandye">
          <img className="svg-icon" src="linkedin.svg" alt="LinkedIn" />
        </a>
        <a href="https://github.com/Rifandye">
          <img className="svg-icon" src="github.svg" alt="GitHub" />
        </a>
        <a href="https://www.instagram.com/rifandye/">
          <img src="instagram.svg" alt="Instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
