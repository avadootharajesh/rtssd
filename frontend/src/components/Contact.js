import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../styles/Contact.css";

export default function Contact() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const contactMessage = "";

  // const [contactMessage, setContactMessage] = React.useState("");

  const [formData, setFormData] = React.useState({ rating, contactMessage });

  const developerdetails = [
    ["Developer", "Avadootha Rajesh", "avadootha.rajesh.netha@gmail.com"],
    ["Developer", "Sulva Sai Ram", "nWw2q@example.com"],
    ["Developer", "Barishetty Durga Sai Vigneshwar", "nWw2q@example.com"],
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const DevDetailsComponentSend = (designation, name, mail, key) => {
    return (
      <div className="developerdetailscomponent" key={key}>
        <p className="designation">{designation}</p>
        <p className="name">{name}</p>
        <p className="mail">{mail}</p>
      </div>
    );
  };

  const handleMouseEnter = (index) => setHover(index);
  const handleMouseLeave = () => setHover(0);
  const onRate = (rating) => console.log(rating);
  const handleClick = (index) => {
    setRating(index);
    if (onRate) onRate(index);
    setFormData({ ...formData, rating: index });
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contactcontainer">
      <div className="leftdivforcontact-developerdetailsandrating">
        <div className="developerdetailsdiv">
          <h3 className="developerdetailsheading">Developer Details</h3>
          <div className="developerdetailscontent">
            {developerdetails.map((item, index) =>
              DevDetailsComponentSend(item[0], item[1], item[2], index)
            )}
          </div>
        </div>

        <div className="ratingstarsdiv">
          <h3 className="ratingheading">Rating</h3>
          <div className="starscontainer">
            {[...Array(5)].map((star, i) => {
              const startIndex = i + 1;
              return (
                <span
                  key={startIndex}
                  onMouseEnter={() => handleMouseEnter(startIndex)}
                  onMouseLeave={() => handleMouseLeave()}
                  onClick={() => handleClick(startIndex)}
                  className="star"
                >
                  {startIndex <= (hover || rating) ? <FaStar /> : <FaRegStar />}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rightdivforcontact-form">
        <h3 className="contactformcontactheading">Contact Form</h3>
        <form className="contactform" onSubmit={handleContactFormSubmit}>
          <h5 className="contactformheadingfortextarea">
            Write Your Message here!
          </h5>
          <textarea
            name="contactformtext"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Message"
            className="contactformtextarea"
          ></textarea>
          <button type="submit" className="contactformsendbutton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
