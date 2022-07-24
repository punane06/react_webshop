import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  //   console.log(id);

  // const urlParams = userParams();
  // console.log*UrlParams.id
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const categoriesDbUrl =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

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
        const found = newArray.find((e) => e.id === Number(id));
        setProduct(found);
      });
    fetch(categoriesDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setCategories(newArray);
      });
  }, [id]);

  const updateProduct = () => {
    if (nameRef.current.value === "") {
      setMessage("No selected product");
    } else {
      // setMessage("Successfully added " + nameRef.current.value);
      const newProduct = {
        id: Number(idRef.current.value),
        name: nameRef.current.value,
        price: Number(priceRef.current.value),
        active: isActiveRef.current.checked,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        imgSrc: imgSrcRef.current.value,
      };
      const index = products.findIndex((e) => Number(e.id) === Number(id));
      products[index] = newProduct;
      fetch(productDb, {
        method: "PUT",
        body: JSON.stringify(products),
        header: {
          "Content-Type": "application/json",
        },
      }).then(() => navigate("/admin/tooted/"));
    }
  };
  const chcekIdUniquess = () => {
    if (idRef.current.value.length === 8) {
      const index = products.findIndex(
        (e) => Number(e.id) === Number(idRef.current.value)
      );
      if (index >= 0 && idRef.current.value !== id) {
        setMessage("ID on mitteuinikaalne");
        setButtonDisabled(true);
      } else if (idRef.current.value === "10011222") {
        setMessage("Added parcel machine ID");
        setButtonDisabled(false);
      } else {
        setMessage("");
        setButtonDisabled(false);
      }
    } else {
      setMessage("");
      setButtonDisabled(true);
    }
  };

  return (
    <div>
      {product && (
        <div>
          <br />
          <label>Product ID</label>
          <br />
          <input
            ref={idRef}
            defaultValue={product.id}
            onChange={() => chcekIdUniquess()}
            type="number"
          />
          <br />
          <label>Product name</label>
          <br />
          <input ref={nameRef} defaultValue={product.name} type="text" />
          <br />
          <label>Product price</label>
          <br />
          <input ref={priceRef} defaultValue={product.price} type="number" />
          <br />
          <label>Product description</label>
          <br />
          <input
            ref={descriptionRef}
            defaultValue={product.description}
            type="text"
          />
          <br />
          <label>Product category</label>
          <br />
          {/* <input ref={categoryRef} type="text" /> */}
          <select ref={categoryRef} defaultValue={product.categories}>
            {/* <option disabled>Pick category</option> */}
            {categories.map((e) => (
              <option>{e.name}</option>
            ))}
          </select>
          <br />
          <label>Product image</label>
          <br />
          <input ref={imgSrcRef} defaultValue={product.imgSrc} type="text" />
          <br />

          <label>Product active</label>
          <br />
          <input
            ref={isActiveRef}
            defaultChecked={product.isActvie}
            type="checkbox"
          />
          <br />
          <button disabled={buttonDisabled} onClick={updateProduct}>
            Add
          </button>
          <div>{message}</div>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
