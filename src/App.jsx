import { createContext, useState ,useContext } from "react";
import "./App.css";
import { Dropdown } from "react-bootstrap";


const ShopCtx = createContext();

function App() {
  const products = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "I phone",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "I phone",
      thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      ],
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/4.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      ],
    },
    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/5/1.jpg",
        "https://i.dummyjson.com/data/products/5/2.jpg",
        "https://i.dummyjson.com/data/products/5/3.jpg",
      ],
    },
  ];

  const [product, setProduct] = useState(products);
  const [quantities , setQuantities] = useState({})

  return (
    <ShopCtx.Provider
      value={{
        product,
        setProduct,
        quantities,
        setQuantities
      }}
    >
      <ProductCard/>
    </ShopCtx.Provider>
  );
}

function ProductCard() {
  const {product, setProduct, quantities, setQuantities} = useContext(ShopCtx);
  
  

  const onhandleChange = (productID, quantity) =>{
    setQuantities({
      ...quantities,
      [productID]:quantity
    })
  }

  const removeItem = (productID) => {
    const updateProducts = product.filter((pro) => pro.id !== productID);
    setProduct(updateProducts);
  };

  return (
    <div>
      {product.map((pro, idx) => (
        <div key={idx} className="container">
          <div className="card mb-3">
            <div className="row g-1">
              <div className="col-md-3">
                <img
                  src={pro.thumbnail}
                  className="img-fluid rounded-start"
                  alt="Books"
                />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <div className="card-head">
                    <h1 className="card-title">{pro.title}</h1>

                    <div className="dropdown">
                      <button
                        className="dropdown-toggle"
                        href="#"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        
                      >
                        <span className="badge badge-pill text-danger bg-white">
                          {quantities[pro.id]||1}
                        </span>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        {[1,2,3].map((quantity) => (
                          <Dropdown.Item
                           key={quantity} 
                          onClick={() => onhandleChange(pro.id, quantity)}
                          >
                            {quantity}
                          </Dropdown.Item>
                        ))}
                        
                      </div>
                    </div>

                    <h4>${pro.price}</h4>
                  </div>

                  <h6>{pro.brand}</h6>
                  <p className="card-text">{pro.description}</p>
                  <button
                    className="remove btn text-danger"
                    onClick={() => removeItem(pro.id)}
                  >
                    REMOVE
                  </button>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {pro.category}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-down">
            <p className="text-secondary">SUBTOTAL :</p>
            <p>{(quantities[pro.id]||1) * pro.price}</p>
          </div>
          <div className="card-down">
            <p className="text-secondary">SHIPPING :</p>
            <p>FREE</p>
          </div>
          <hr></hr>
          <div className="card-down">
            <h6>TOTAL:</h6>
            <h6>{(quantities[pro.id]||1) * pro.price}</h6>
          </div>
          <div className="end">
            <a href="#" className="text-danger">
              Get Daily Cash With Nespola Card
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;