import React from 'react';

const Form = ({ newProduct, handleInputChange, handleImageChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Название товара
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={newProduct.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Описание товара
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          value={newProduct.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Цена
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          value={newProduct.price}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Выберите изображение
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Добавить товар
      </button>
    </form>
  );
};

export default Form;
