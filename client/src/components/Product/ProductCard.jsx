import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="col-4">
      <div className="card">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
