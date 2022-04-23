import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const getPhotos = useCallback(() => {
    // check if the user is searching
    let apiURL = `https://api.unsplash.com/photos?`;
    if (query) apiURL = `https://api.unsplash.com/search/photos?query=${query}`;
    apiURL += `&page=${page}`;
    apiURL += `&client_id=${accessKey}`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;

        // if page is 1, then we need a whole new array of images
        if (page === 1) setImages(imagesFromApi);

        // if page is > 1, then we are adding for our infinite scroll
        setImages((images) => [...images, ...imagesFromApi]);
      });
  }, [page, query]);

  useEffect(() => {
    getPhotos();
  }, [page, getPhotos]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  };

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

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <a
              className="image"
              key={index}
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
