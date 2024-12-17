import { useState } from "react";
import contactImg from "../assets/contact.jpg";

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "recipebox@gmail.com";

  // Function to handle copying the email to the clipboard
  const copyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="section contact">
      <div className="container">
        <div className="contact__wrap">
          <div className="contact__column">
            <div className="headline headline--align-left">
              <h1 className="headline__title">Say hello to us!</h1>
              <p className="headline__subtitle">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren.
              </p>
            </div>
            <div className="contact__info">
              <div className="contact-box">
                <div className="contact-box__label">Address</div>
                <div className="contact-box__content">
                  <a
                    target="_blank"
                    href="http://maps.google.com/?q=1431 3rd Ave, New York, NY 10028, United States"
                    rel="noreferrer"
                  >
                    1431 3rd Ave, New York, NY 10028, United States
                  </a>
                </div>
              </div>
              <div className="contact-box">
                <div className="contact-box__label">Phone</div>
                <div className="contact-box__content">
                  <a href="tel:+12127177772">+12127177772</a>
                </div>
              </div>
              <div className="contact-box">
                <div className="contact-box__label">Email</div>
                <div className="contact-box__content">
                  <a href="mailto:recipebox@gmail.com">recipebox@gmail.com</a>
                </div>
              </div>
            </div>
            <button onClick={copyEmail} className="btn">
              <span>{copied ? "Copied!" : "Copy email address"}</span>
              <div className="btn__overlay"></div>
            </button>
          </div>
          <div className="contact__column">
            <div className="contact__image">
              <img src={contactImg} alt="contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Contact };
