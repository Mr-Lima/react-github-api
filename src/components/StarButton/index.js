import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '../../assets/star_icon.svg';
import Loading from '../../assets/loading.gif';
import './index.css';

export default function StarButton({ id, onClick, type }) {
  return (
    <>
      <button
        id={id}
        className="star-button"
        onClick={onClick}
        disabled={type === 'loading'}
        style={{ backgroundColor: type === 'success' ? 'green' : '#2b2b2b' }}
      >
        <img
          className="star-icon"
          src={type === 'loading' ? Loading : StarIcon}
        />
        {/* eu ia colocar tbm o numero de stars do projeto porem a api do github nao atualiza instantaneamente os numeros <span>{text}</span> */}
      </button>
    </>
  );
}

StarButton.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
