import { useHistory } from "react-router-dom";
import { useCartContext } from "../../utils/contexts/CartContext";
import cash from "../../utils/pipes/cash";
import sumBy from "../../utils/pipes/sumBy";
import "./Checkout.styles.css";

function Checkout() {
  const history = useHistory();
  const { cartItems } = useCartContext();

  const goToCart = () => {
    history.push("/cart");
  };

  return (
    <>
      <form className="checkout">
        <h2>Finish your order</h2>
        <div>
          <p>Full name: </p>
          <input name="name" placeholder="Full name" />
        </div>
        <div>
          <p>Email: </p>
          <input name="email" placeholder="example@mail.com" />
        </div>
        <div>
          <p>Post/zip code:</p>
          <input name="zipcode" maxLength={5} type={"number"} />
        </div>
        <div>
          <p>Notes:</p>
          <textarea name="notes" placeholder="Notes" />
        </div>
        Order summary:
        <table className="summary">
          <thead>
            <tr>
              <td>Product</td>
              <td>Quantity</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.product.data.name}</td>
                  <td>{item.quantity}</td>
                  <td>{cash(item.product.data.price * item.quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="finish">
        <p className="total">
          Total :{" "}
          {cash(sumBy(cartItems, (o) => o.quantity * o.product.data.price))}
        </p>

        <button onClick={goToCart}>Go back to cart</button>
        <button type="button"> Place order</button>
        </div>

      </form>
    </>
  );
}

export default Checkout;
