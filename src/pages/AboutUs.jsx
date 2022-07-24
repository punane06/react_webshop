import { useRef } from "react";

function AboutUs() {
  const nameRef = useRef();
  const starsRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {
    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "kadikerner@gmail.com", // from mail oma
      Password: "E8E5F8A32FE85EB12D204B2E913010DD754D", // from mail oma
      To: "kadikerner@gmail.com", // kui saadan tagasiside, siis saadan endale - kui tellimust tehakse, siis teeb muutuvaks = kliendi emailile
      From: "kadikerner@gmail.com", // millega sa konto tegid
      Subject: "Testin testing",
      Body: `Sulle kirjutas ${nameRef.current.value}, ta andis sulle ${starsRef.current.value} tärni. Sõnum: ${messageRef.current.value}`,
    }).then((message) => alert(message));
  };
  return (
    <div>
      <label>Nimi</label>
      <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Tärne</label>
      <br />
      <input ref={starsRef} min="1" max="5" type="range" /> <br />
      <label>Sõnum</label>
      <br />
      <input ref={messageRef} type="text" /> <br />
      <button onClick={sendEmail}>Saada e-mail</button>
    </div>
  );
}

export default AboutUs;
