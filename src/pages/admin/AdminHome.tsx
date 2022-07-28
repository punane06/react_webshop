import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  // const [cartProducts, setCartProducts] = useState(
  //   JSON.parse(sessionStorage.getItem("product") || [])
  // );

  // const removeProduct = (productIndex) => {
  //   cartProducts.splice(productIndex, 1);
  //   setCartProducts(cartProducts.slice());
  //   sessionStorage.setItem("product", JSON.stringify(cartProducts));
  // };

  const productDb =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  //   uef
  useEffect(() => {
    fetch(productDb)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
      });
  });

  const sortAZ = () => {
    products.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  };
  const sortZA = () => {
    products.sort((a, b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  };
  const sortPriceAsc = () => {
    products.sort((a, b) => a.price - b.price);
    setProducts(products.slice());
  };
  const sortPriceDesc = () => {
    products.sort((a, b) => b.price - a.price);
    setProducts(products.slice());
  };

  return (
    <div>
      AdminHome
      <Link to="/admin/lisa-toode">
        <button>Toodet lisama</button>
      </Link>
      <Link to="/admin/kategooriad">
        <button>Halda kategooriaid</button>
      </Link>
      <Link to="/admin/tooted">
        <button>Halda tooteid</button>
      </Link>
      <Link to="/admin/shops">
        <button>Halda poode</button>
      </Link>
      <br />
      <br />
      <div>
        <button onClick={sortAZ}>{t("home.sortaz")}</button>
        <button onClick={sortZA}>{t("home.sortzz")}</button>
        <button onClick={sortPriceAsc}>{t("home.sort-price-asc")}</button>
        <button onClick={sortPriceDesc}>{t("home.sort-price-desc")}</button>
        {products.map((e) => (
          <div>
            <img src={e.imgSrc} alt="" />
            <div>{e.imgSrc}</div>
            <div>{e.name}</div>
            <div>{e.price}</div>
            {/* <button onClick={() => removeProduct(e)}>{"muuda"}</button> */}
            {/* <button onClick={() => removeProduct(e)}>{"kustuta"}</button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
