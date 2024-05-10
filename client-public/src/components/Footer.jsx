function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center h-[130px] bg-red-800 rounded-tl-[20px] rounded-tr-[20px]">
      <div>
        <img src="red-devils2.svg" alt="Red Devils" />
      </div>
      <div className="flex gap-[24px] mt-[12px]">
        <img src="linkedin.svg" alt="LinkedIn" />
        <img src="github.svg" alt="Github" />
        <img src="instagram.svg" alt="Instagram" />
      </div>
    </footer>
  );
}

export default Footer;
