/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { startLoadPhotos } from "../actions/photos";
import Photo from "./Photo";

const Gallery = ({ errors, photos, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    dispatch(startLoadPhotos());
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setIsLoading(false);
    }
  }, [photos]);

  const filterPhotos = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
  };

  const filteredPhotos = filterPhotos(photos, searchQuery);
  console.log(filteredPhotos)

  return (
    <>
      <div className="search-bar">
          <input
              type="text"
              id="header-search"
              placeholder="search images"
              value={searchQuery}
              onInput={e => setSearchQuery(e.target.value)}
              name="s" 
          />
      </div>
      <div className="photos-list">
        {errors && errors.get_error && (
          <p className="errorMsg centered-message">{errors.get_error}</p>
        )}
        {isLoading ? (
          <div className="loading-msg centered-message">Loading...</div>
        ) : (
          filteredPhotos.map((photo) => <Photo name={photo.name} key={photo._id} id={photo._id} />)
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
});

export default connect(mapStateToProps)(Gallery);
