import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useLocation } from "react-router-dom";
import { useProduct } from "../../utils/hooks/useProduct";
import Loader from "../../components/Loader";
import cash from "../../utils/pipes/cash";
import "./ProductDetail.styles.css";
import { useCartContext } from "../../utils/contexts/CartContext";

function ProductDetail() {
  const { addProduct } = useCartContext();
  const location = useLocation();
  const productId = location.state.productId;
  const { data: product, isLoading } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const stockAvailable = (stock) => {
    return quantity > 0 && quantity <= stock ? true : false;
  };

  const addToCart = () => {
    addProduct({ quantity: Number(quantity), product });
  };

  return (
    <>
      {product.data && (
        <div className="grid-container">
          <div className="grid-2column">
            <ImageGallery
              items={product.data.images.map((current) => {
                return {
                  original: current.image.url,
                  thumbnail: current.image.url,
                };
              })}
            />
          </div>
          <div className="grid-2column">
            {" "}
            <p className="prod-title">{product.data.name}</p>
            <p className="prod-info">SKU: {product.data.sku}</p>
            <p className="prod-info">Category: {product.data.category.slug}</p>
            <p className="prod-info">Tags: {product.tags.join(", ")}</p>
            <p>{product.data.short_description}</p>
            <p className="prod-price">{cash(product.data.price)}</p>
            <input
              className="quantity-input"
              type={"number"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {stockAvailable(product.data.stock) && (
              <button
                className="cart-button"
                onClick={addToCart}
              >
                Add to cart
              </button>
            )}
            <p>Specifications:</p>
            <table className="specs">
              <tbody>
                {product.data.specs.map((spec, i) => {
                  return (
                    <tr key={i}>
                      <td>{spec.spec_name}</td>
                      <td>{spec.spec_value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
