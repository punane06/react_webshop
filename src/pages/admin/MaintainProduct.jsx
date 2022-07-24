import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import styles from "../../css/Cart.module.css";
// import { useTranslation } from "react-i18next";

function MaintainProduct() {
  const [products, setProducts] = useState([]);
  //   const { t } = useTranslation();
  const searchedProductRef = useRef();
  const [originalProducts, setOriginalProducts] = useState([]);
  const productDb =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productDb)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
        setOriginalProducts(newArray);
      });
  }, []);

  const deleteProduct = (index) => {
    products.splice(index, 1);
    setProducts(products.slice());
    fetch(productDb, {
      method: "PUT",
      body: JSON.stringify(products),
      header: {
        "Content-Type": "application/json",
      },
    });
    // splice - [] kustutamiseks/lisamiseks [].splice(3,0,{})
    // slice - [] koopia tegemiseks [.slice(0,10)] -> [{}]
    // split - "" stringist array "Elas metasas mutionu".split("") -> ["Elas", "metsas", "mutionu"]
  };

  // otsi() {
  //     otsimiseRe.current.value
  //     Element.name.indexOf(otsimiseRef.current.value)
  // .filter(element => Element.name.indexOf(otsimiseRef.current.value) >= 0)
  // }

  const searchProducts = () => {
    // console.log(searchedProductRef.current.value);
    const searchInput = searchedProductRef.current.value.toLowerCase();
    const newProducts = originalProducts.filter(
      (e) =>
        e.name.toLowerCase().indexOf(searchInput) >= 0 ||
        e.id.toString().indexOf(searchInput) >= 0 ||
        e.description.toString().indexOf(searchInput) >= 0
    );
    setProducts(newProducts);
  };

  const changeProductActive = (productClicked) => {
    const index = originalProducts.findIndex((e) => e.id === productClicked.id);
    productClicked.isActive = !productClicked.isActive;
    originalProducts[index] = productClicked;
    setProducts(products.slice());
    fetch(productDb, {
      method: "PUT",
      body: JSON.stringify(products),
      header: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    // input ref=otsimiseRef onChange={otsi} [samsung]
    <div>
      <input type="text" ref={searchedProductRef} onChange={searchProducts} />
      <span>{products.length} tk</span>
      {products.map((e, index) => (
        <div
          className={
            styles.cartProduct +
            " " +
            (e.isActive ? "active-product" : "inactive-product")
          }
          key={e.id + index}
        >
          <div onClick={() => changeProductActive(e)}>
            <img className="product-image" src={e.imgSrc} alt="" />
            <div>{e.imgSrc}</div>
            <div>{e.name}</div>
            <div>{e.price}</div>
            <div>{e.description}</div>
            <div>{e.id}</div>
            <Link to={`/admin/muuda/${e.id}`}>
              <button>
                Muuda
                <EditProduct />
              </button>
            </Link>
            <button onClick={() => deleteProduct(index)}>Kusutua toode</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MaintainProduct;
