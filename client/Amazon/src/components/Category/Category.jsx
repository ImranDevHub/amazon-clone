import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './category.css';

function Category({ data }) {
  //   console.log(data);
  const { category, title, image, alt } = data;
  return (
    <>
      <Link to={`/category/${category}`}>
        <Card className="category category--only">
          <Card.Title className="p-4 fs-3 fw-bold">{title}</Card.Title>

          <Card.Body className="row row-cols-2 category__imgs g-0">
            {/* <Card.Img
              alt={data.title}
              className="category__img"
              src={data.image}
            /> */}
            <div className="col-6">
              <img src={image?.img1} alt="" />
              <span className="fs-5">{alt?.alt1}</span>
            </div>
            <div className="col-6">
              <img src={image?.img2} alt="" />
              <span className="fs-5">{alt?.alt2}</span>
            </div>{' '}
            <div className="col-6">
              <img src={image?.img3} alt="" />
              <span className="fs-5">{alt?.alt3}</span>
            </div>
            <div className="col-6">
              <img src={image?.img4} alt="" />
              <span className="fs-5">{alt?.alt4}</span>
            </div>
          </Card.Body>

          <Card.Text className="p-3 fs-4 text-primary">See more</Card.Text>
        </Card>
      </Link>
    </>
  );
}

export default Category;
