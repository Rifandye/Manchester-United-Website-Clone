function Footer() {
  return (
    <>
      <section className="py-8 bg-red-800">
        <div className="container mx-auto px-4">
          <div className="pb-4 border-b border-gray-50 mb-10">
            <div className="flex justify-center mb-12">
              <a href="#" className="inline-block">
                <img className="h-12" src="/mulogo.png" alt="" />
              </a>
            </div>
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-900 transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <span className="text-white">•</span>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-900 transition duration-200"
                >
                  Products
                </a>
              </li>
              <li>
                <span className="text-white">•</span>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-900 transition duration-200"
                >
                  Categories
                </a>
              </li>
              <li>
                <span className="text-white">•</span>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-900 transition duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <span className="text-white">•</span>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-900 transition duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <p className="text-center text-white mb-12">
            © This is not an official Manchester United Website
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <img
              className="h-6"
              src="shopky-assets/logos/visa-logo.svg"
              alt=""
            />
            <img
              className="h-6"
              src="shopky-assets/logos/mastercard-logo.svg"
              alt=""
            />
            <img
              className="h-6"
              src="shopky-assets/logos/paypal-logo.svg"
              alt=""
            />
            <img
              className="h-6"
              src="shopky-assets/logos/amex-logo.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
