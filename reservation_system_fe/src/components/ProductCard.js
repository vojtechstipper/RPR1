const ProductCard = ({name}, {description}) => {
//   const { data } = this.data;
  return (
    <div className="card">     
      <div className="card-content">        
        <h4 className="card-name">{name}</h4> 
        <p className="card-description">{description}</p> 
        <p className="card-price">Cena: 35 CZK</p>
        <p className="card-allergens">Alergeny: </p>
      </div>
    </div>
  );
};

export default ProductCard;