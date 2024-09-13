import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/img/10001.jpg';
import img2 from '../../assets/img/10002.jpg';
import img3 from '../../assets/img/10003.jpg';
import img4 from '../../assets/img/10004.jpg';
import img5 from '../../assets/img/10005.jpg';
import './hero.css';

let images = [img1, img2, img3, img4, img5];

function Hero() {
  //   console.log(images);
  return (
    <>
      <Carousel>
        {images.map((img, i) => (
          <Carousel.Item className="hero__img" key={i}>
            <img className="w-100" src={img} alt="Banner Carousel" />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default Hero;
