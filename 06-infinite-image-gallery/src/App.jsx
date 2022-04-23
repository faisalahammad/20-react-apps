import React, { useEffect, useState } from "react";
import "./App.css";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  if (!accessKey) {
    return (
      <a href="https://unsplash.com/documentation" className="error">
        Required: First get your Unsplash API key!
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        {[...Array(100)].map((_, index) => (
          <div className="image" key={index}>
            <img src="https://placekitten.com/g/1920/1080" alt="Sample" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
