import { useEffect, useState } from "react";
import "./styles.css";

export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kzXCTbnv/200/200/original?country=br", // Substitua "img1.jpg" com o caminho real da sua imagem
    "https://static.wixstatic.com/media/04b233_8cc42a30f29a41eb9bd8213d8b7b8cee~mv2.png/v1/fill/w_648,h_432,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/PRODUTOS%20D'LANCHE.png",
    "https://gifs.eco.br/wp-content/uploads/2023/06/imagens-de-lanche-png-13.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // Alterna o slide a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, [slides.length]);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide carrousel-container"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item ${
              index === currentSlide ? "active" : ""
            }`}
            key={index}
            data-bs-interval="10000"
          >
            <img
              src={slide}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
          )
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
        onClick={() =>
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
