import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    imgSrc: "",
  });
  const productDbUrl =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const productArray = [];
        for (const key in data) {
          productArray.push(data[key]);
        }
        const productFound = productArray.find(
          (e) => Number(e.id) === Number(id)
        );
        setProduct(productFound);
      });
  }, [id]);

  return (
    <div>
      {product !== undefined && (
        <div>
          <div>{product.name}</div>
          <div>{product.description}</div>
          <div>{product.price}</div>
          <img src={product.imgSrc} alt="" />
        </div>
      )}
      {product === undefined && <div>Toodet ei leitud</div>}
    </div>
  );
}

export default SingleProduct;
