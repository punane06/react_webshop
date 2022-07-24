import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Category() {
  const idRef = useRef();
  const nameRef = useRef();
  const [message, giveMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const categoriesDb =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  // Kui lisate andmebaasi, siis l'heb home.jsx.s v]tmine kantki, sest kuju [{},{}] ---> {-asda: {}, -eqw{}}

  useEffect(() => {
    fetch(categoriesDb)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setCategories(newArray);
      });
  }, []);

  const addNewCategory = () => {
    if (nameRef.current.value === "") {
      giveMessage("Cannot add category");
    } else {
      giveMessage("Successfully added " + nameRef.current.value);
      const newCategory = {
        id: idRef.current.value,
        name: nameRef.current.value,
      };
      categories.push(newCategory);
      setCategories(categories.slice());
      fetch(categoriesDb, {
        method: "POST",
        body: JSON.stringify(newCategory),
        header: {
          "Content-Type": "application/json",
        },
      });
    }
    toast.success(`Edukalt uus kategooria ${nameRef.current.value}  lisatud`);
  };

  const deleteCategory = (index) => {
    const categoryName = categories[index].name;
    categories.splice(index, 1);
    setCategories(categories.slice());
    fetch(categoriesDb, {
      method: "PUT",
      body: JSON.stringify(categories),
      header: {
        "Content-Type": "application/json",
      },
    });
    toast.success(`Edukalt kategooria ${categoryName}  kustutatud`);

    // splice - kustutamiseks, muutmiseks arrays,
    // slice - array koopia tegemiseks (tyi votmiseks),
    // split - stringist array tegemiseks     "eras metsas mutionu".split(" ") --> ["elas", "metsas", "mutionu"]
    // ["elas", "metsas", "mutionu"].join("o") => "elasometsasomutionu"
    // replaceAll("a","o") - asendab k]ik a-d o-dega
  };

  return (
    <div>
      <label>Categori ID</label>
      <br />
      <input ref={idRef} type="number" />
      <br />
      <label>Categori Name</label>
      <br />
      <input ref={nameRef} type="text" />
      <br />
      <button onClick={addNewCategory}>Add</button>
      <div>{message}</div>
      <br />
      {categories.map((e, index) => (
        <div key={e.id}>
          <div>{e.name}</div>
          <button onClick={() => deleteCategory(index)}>X</button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Category;
