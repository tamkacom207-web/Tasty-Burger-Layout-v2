import React, { useState } from "react";

const burgers = [
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    description: "Chicken breast, chili sauce, tomatoes, pickles, coleslaw",
    rating: 5,
    price: 99.15,
    badge: "Best seller",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Crispy fried chicken burger with fresh lettuce",
  },
  {
    id: "ultimate-bacon",
    name: "Ultimate Bacon",
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    rating: 4.5,
    price: 99.32,
    badge: "Hot pick",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Bacon cheeseburger with a toasted bun",
  },
  {
    id: "black-sheep",
    name: "Black Sheep",
    description: "American cheese, tomato relish, avocado, lettuce, red onion",
    rating: 4,
    price: 69.15,
    badge: "Chef's choice",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Juicy cheeseburger with lettuce and tomato",
  },
  {
    id: "vegan-burger",
    name: "Vegan Burger",
    description: "Plant patty, smoked cheddar, onion, lettuce, vegan sauce",
    rating: 3.5,
    price: 99.25,
    badge: "Plant-based",
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Stacked burger with fresh vegetables and melted cheese",
  },
  {
    id: "smoky-ranch",
    name: "Smoky Ranch",
    description: "Beef patty, pepper jack, crispy onion, ranch, smoky sauce",
    rating: 4.5,
    price: 125.50,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Smoky cheeseburger with crispy onion",
  },
  {
    id: "double-trouble",
    name: "Double Trouble",
    description: "Double beef, double cheddar, pickles, onions, burger sauce",
    rating: 5,
    price: 149.75,
    badge: "Big bite",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Large double cheeseburger",
  },
  {
    id: "spicy-fiesta",
    name: "Spicy Fiesta",
    description: "Beef patty, jalapenos, salsa, cheddar, crunchy peppers",
    rating: 4,
    price: 119.20,
    badge: "Extra hot",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Spicy burger with melted cheese",
  },
  {
    id: "hawaiian-stack",
    name: "Hawaiian Stack",
    description: "Chicken patty, grilled pineapple, lettuce, teriyaki glaze",
    rating: 4.5,
    price: 112.90,
    badge: "Tropical",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Chicken burger with pineapple",
  },
  {
    id: "mushroom-melt",
    name: "Mushroom Melt",
    description: "Beef patty, Swiss cheese, mushrooms, caramelized onion",
    rating: 4.5,
    price: 138.40,
    badge: "Classic",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Cheeseburger topped with mushrooms",
  },
  {
    id: "truffle-royale",
    name: "Truffle Royale",
    description: "Beef patty, truffle cheese, arugula, onion, truffle aioli",
    rating: 5,
    price: 189.00,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Premium burger with dark toasted buns",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set());
  const [notice, setNotice] = useState("");
  const [order, setOrder] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cartCheckout, setCartCheckout] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function toggleFavorite(burger) {
    const wasFavorite = favorites.has(burger.id);
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);
      if (nextFavorites.has(burger.id)) {
        nextFavorites.delete(burger.id);
      } else {
        nextFavorites.add(burger.id);
      }
      return nextFavorites;
    });
    setNotice(
      `${burger.name} ${wasFavorite ? "removed from" : "added to"} your favorites.`,
    );
  }

  function addToCart(burger) {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === burger.id);
      if (existing) {
        return items.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...items, { ...burger, quantity: 1 }];
    });
    setCartOpen(true);
    setNotice(`${burger.name} added to your cart.`);
  }

  function changeCartQuantity(burgerId, change) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === burgerId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(burgerId) {
    const removed = cartItems.find((item) => item.id === burgerId);
    setCartItems((items) => items.filter((item) => item.id !== burgerId));
    if (removed) setNotice(`${removed.name} removed from your cart.`);
  }

  function checkoutCart() {
    if (cartItems.length === 0) return;
    setCartOpen(false);
    setOrder({
      ...cartItems[0],
      name: `${cartCount} burger${cartCount > 1 ? "s" : ""}`,
      price: cartTotal,
    });
    setOrderQuantity(1);
    setOrderConfirmed(false);
    setCartCheckout(true);
  }

  function orderNow(burger) {
    setOrder(burger);
    setOrderQuantity(1);
    setOrderConfirmed(false);
    setCartCheckout(false);
    setNotice(`Order checkout opened for ${burger.name}.`);
  }

  function closeOrder() {
    setOrder(null);
    setOrderConfirmed(false);
  }

  function submitOrder(event) {
    event.preventDefault();
    setOrderConfirmed(true);
    if (cartCheckout) setCartItems([]);
    setNotice(`Order confirmed for ${orderQuantity} ${order.name}${orderQuantity > 1 ? " burgers" : " burger"}.`);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#about" aria-label="Tasty Burger home">
          <span className="brand-burger" aria-hidden="true">🍔</span>
          <span className="brand-words">
            <span>TASTY</span>
            <span>BURGER</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#menu">Our Menu</a>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="cart-button"
          type="button"
          aria-label={`Shopping bag, ${cartCount} items`}
          onClick={() => setCartOpen(true)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          </svg>
          <span className="cart-count" aria-hidden="true">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="menu-intro" id="about" aria-labelledby="menu-title">
          <h1 id="menu-title">Our Crazy Burgers</h1>
          <p>
            Get ready for a wild ride of flavors! Our crazy burgers are loaded
            with juicy patties, bold toppings, and irresistible sauces, all
            stacked on a perfectly toasted bun. Whether you like it cheesy, or
            extra meaty, we&apos;ve got a burger that will blow your mind!
          </p>
        </section>

        <section className="menu-section" id="menu" aria-label="Our burger menu">
          <div className="burger-grid" id="shop">
            {burgers.map((burger) => (
              <article className="burger-card" key={burger.id}>
                <div className="image-wrap">
                  <img
                    className="burger-image"
                    src={burger.image}
                    alt={burger.imageAlt}
                  />
                  <span className="burger-badge">{burger.badge}</span>
                </div>
                <div className="burger-card-content">
                  <div className="card-meta">
                    <StarRating rating={burger.rating} name={burger.name} />
                    <button
                      className={`favorite-button${favorites.has(burger.id) ? " is-favorite" : ""}`}
                      type="button"
                      aria-label={`${favorites.has(burger.id) ? "Remove" : "Add"} ${burger.name} ${favorites.has(burger.id) ? "from" : "to"} favorites`}
                      aria-pressed={favorites.has(burger.id)}
                      onClick={() => toggleFavorite(burger)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10A4.4 4.4 0 0 1 12 6.2a4.4 4.4 0 0 1 8.8 2.6Z" />
                      </svg>
                    </button>
                  </div>
                  <h2>{burger.name}</h2>
                  <p className="burger-description">{burger.description}</p>
                  <div className="card-actions">
                    <button
                      className="price-button"
                      type="button"
                      aria-label={`Add ${burger.name} to cart for ${formatPrice(burger.price)}`}
                      onClick={() => addToCart(burger)}
                    >
                      {formatPrice(burger.price)} · Add to Cart
                    </button>
                    <button
                      className="order-button"
                      type="button"
                      aria-label={`Order ${burger.name} now for ${formatPrice(burger.price)}`}
                      onClick={() => orderNow(burger)}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <span>Fresh off the grill, made just for you.</span>
        <a href="mailto:hello@tastyburger.example">Get in touch</a>
      </footer>

      <div className="sr-only" aria-live="polite">{notice}</div>

      {cartOpen && (
        <>
          <button
            className="cart-backdrop"
            type="button"
            aria-label="Close shopping cart"
            onClick={() => setCartOpen(false)}
          />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-header">
              <div>
                <span className="checkout-label">Your selection</span>
                <h2 id="cart-title">Shopping Cart</h2>
              </div>
              <button
                className="modal-close"
                type="button"
                aria-label="Close shopping cart"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">🍔</span>
                <h3>Your cart is empty</h3>
                <p>Add a burger from the menu to get started.</p>
                <button type="button" className="checkout-submit" onClick={() => setCartOpen(false)}>
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <span>{formatPrice(item.price)}</span>
                        <div className="cart-item-actions">
                          <div className="quantity-control" aria-label={`${item.name} quantity`}>
                            <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => changeCartQuantity(item.id, -1)}>−</button>
                            <span>{item.quantity}</span>
                            <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => changeCartQuantity(item.id, 1)}>+</button>
                          </div>
                          <button type="button" className="remove-cart-item" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Items</span>
                    <strong>{cartCount}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <button type="button" className="checkout-submit" onClick={checkoutCart}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}

      {order && (
        <div className="order-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeOrder();
        }}>
          <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
            {orderConfirmed ? (
              <div className="order-confirmation">
                <span className="confirmation-icon" aria-hidden="true">✓</span>
                <h2 id="order-title">Order confirmed!</h2>
                <p>
                  Your {order.name} order is now being prepared.
                </p>
                <button className="checkout-submit" type="button" onClick={closeOrder}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="order-modal-header">
                  <div>
                    <span className="checkout-label">Checkout</span>
                    <h2 id="order-title">Complete your order</h2>
                  </div>
                  <button className="modal-close" type="button" aria-label="Close order checkout" onClick={closeOrder}>
                    ×
                  </button>
                </div>

                <div className="order-product">
                  <img src={order.image} alt="" />
                  <div>
                    <h3>{order.name}</h3>
                    <span>{formatPrice(order.price)}</span>
                  </div>
                  {!cartCheckout && (
                    <div className="quantity-control" aria-label="Order quantity">
                      <button type="button" aria-label="Decrease quantity" onClick={() => setOrderQuantity((quantity) => Math.max(1, quantity - 1))}>−</button>
                      <span>{orderQuantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => setOrderQuantity((quantity) => quantity + 1)}>+</button>
                    </div>
                  )}
                </div>

                <form className="checkout-form" onSubmit={submitOrder}>
                  <div className="checkout-fields">
                    <label>
                      Name
                      <input name="name" type="text" placeholder="Your name" required />
                    </label>
                    <label>
                      Phone
                      <input name="phone" type="tel" placeholder="09XX XXX XXXX" required />
                    </label>
                  </div>

                  <fieldset className="fulfillment-options">
                    <legend>Fulfillment</legend>
                    <label>
                      <input type="radio" name="fulfillment" value="pickup" defaultChecked />
                      <span>Pickup</span>
                    </label>
                    <label>
                      <input type="radio" name="fulfillment" value="delivery" />
                      <span>Delivery</span>
                    </label>
                  </fieldset>

                  <label className="address-field">
                    Address or pickup note
                    <textarea name="address" placeholder="Add your address or pickup instructions" required />
                  </label>

                  <div className="order-total">
                    <span>Total</span>
                    <strong>{formatPrice(order.price * orderQuantity)}</strong>
                  </div>

                  <button className="checkout-submit" type="submit">
                    Confirm Order
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function StarRating({ rating, name }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars for ${name}`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span
            className="rating-star"
            key={index}
            style={{ "--star-fill": `${fill * 100}%` }}
            aria-hidden="true"
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function formatPrice(price) {
  return `₱${price.toFixed(2)}`;
}

export default App;
