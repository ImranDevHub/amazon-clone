import Categories from '../Category/Categories';
import Products from '../Product/Products';

function ProductLists() {
  return (
    <>
      <section className="category__container grid grid--1x3 grid--1x4 grid--1x2">
        <Categories />
        <Products />
      </section>
    </>
  );
}

export default ProductLists;
