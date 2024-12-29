import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Form from './Form';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.image);

    axios
      .post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: [...products, response.data],
        });
        setNewProduct({
          name: '',
          description: '',
          price: '',
          image: null,
        });
        setIsFormVisible(false);
      })
      .catch((err) => console.log('Error adding product:', err));
  };

  return (
    <div className="container">
      <button
        className="btn btn-success mb-3"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? 'Закрыть форму' : 'Добавить товар'}
      </button>

      {isFormVisible && (
        <Form
          newProduct={newProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Нет товаров для отображения</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
