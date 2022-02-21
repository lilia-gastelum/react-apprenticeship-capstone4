import { useHistory } from "react-router-dom";
import { useCartContext } from "../../utils/contexts/CartContext";
import cash from "../../utils/pipes/cash";
import sumBy from "../../utils/pipes/sumBy";
import "./ShoppingCart.styles.css";

function ShoppingCart() {
  const history = useHistory();
  const { cartItems, updateProduct, removeProduct } = useCartContext();

  const checkoutProducts = () => {
    history.push("/checkout");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <h1>There is no items in your cart, go add some!</h1>
      ) : (
        <div className="shopping-cart">
          <table className="cart-items">
            <thead>
              <tr>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div>
                        <img
                          height={"120px"}
                          src={item.product.data.mainimage.url}
                          alt={item.product.data.name}
                        />
                        <label className="prod-detail">
                          {item.product.data.name}
                        </label>
                      </div>
                    </td>
                    <td>{cash(item.product.data.price)}</td>
                    <td>
                      <input
                        type={"number"}
                        min={1}
                        max={item.product.data.stock}
                        value={item.quantity}
                        className="quantity-input"
                        onChange={(e) =>
                          updateProduct(e.target.value, item.product.id)
                        }
                      />
                    </td>
                    <td>{cash(item.product.data.price * item.quantity)}</td>
                    <td className="remove">
                      <button
                        onClick={() => removeProduct(item.product.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="totals">
            <p className="total">
              Cart total :{" "}
              {cash(sumBy(cartItems, (o) => o.quantity * o.product.data.price))}
            </p>
            <button onClick={checkoutProducts} className="proceed">
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
