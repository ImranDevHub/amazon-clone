import Category from './Category';
import { categoryInfo } from './categoryInfo';

function Categories() {
  return (
    <>
      {categoryInfo.map((category, i) => (
        <Category key={i} data={category} />
      ))}
    </>
  );
}

export default Categories;
