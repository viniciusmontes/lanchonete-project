import './styles.css';

import { useEffect, useState } from 'react';


export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kzXCTbnv/200/200/original?country=br", // Substitua "img1.jpg" com o caminho real da sua imagem
    "https://d3sn2rlrwxy0ce.cloudfront.net/_800x600_crop_center-center_none/whopper-thumb_2021-09-16-125319_mppe.png?mtime=20210916125320&focal=none&tmtime=20240612010000",
    "https://www.abcdacomunicacao.com.br/wp-content/uploads/Sanduiches_3x15.png"
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
