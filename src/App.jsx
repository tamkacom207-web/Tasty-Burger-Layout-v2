import React, { useState } from "react";

const burgers = [
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    description: "Chicken breast, chili sauce, tomatoes, pickles, coleslaw",
    rating: 5,
    price: 99.15,
    badge: "Best Seller",
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
    badge: "Hot Pick",
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
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Juicy cheeseburger with lettuce and tomato",
  },
  {
    id: "vegan-burger",
    name: "Vegan Burger",
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    rating: 3.5,
    price: 99.25,
    badge: "Plant-based",
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Stacked burger with fresh vegetables and melted cheese",
  },
];

function App() {
  const [cartCount, setCartCount] = useState(2);
  const [favorites, setFavorites] = useState(() => new Set());
  const [notice, setNotice] = useState("");

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
    setCartCount((count) => count + 1);
    setNotice(`${burger.name} added to your cart.`);
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
          onClick={() => setNotice(`Your bag has ${cartCount} items.`)}
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
                  <button
                    className="price-button"
                    type="button"
                    aria-label={`Add ${burger.name} to cart for ${formatPrice(burger.price)}`}
                    onClick={() => addToCart(burger)}
                  >
                    {formatPrice(burger.price)}
                  </button>
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
