import Carousel from "react-bootstrap/Carousel";

function CarouselGallery() {
  const pictures = [
    {
      src: "https://picsum.photos/id/237/500/200",
      alt: "First slide",
      header: "First slide",
      text: "Hello",
    },
    {
      src: "https://picsum.photos/id/237/500/200",
      alt: "Second slide",
      header: "Second slide",
      text: "Hello",
    },
    {
      src: "https://picsum.photos/id/237/500/200",
      alt: "Third slide",
      header: "Third slide",
      text: "Hello",
    },
  ];
  return (
    <Carousel>
      {pictures.map((picture) => (
        <Carousel.Item>
          <img
            //   className="d-block w-100"
            src={picture.src}
            alt={picture.alt}
          />
          <Carousel.Caption>
            <h3>{picture.header}</h3>
            <p>{picture.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselGallery;
