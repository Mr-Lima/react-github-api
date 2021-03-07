import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function InputAutoComplete({
  value,
  handleChange,
  placeholder,
  style,
  objArr,
  onSubmit,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(objArr);
  }, [objArr]);

  return (
    <form
      className="input-container scale-in-hor-center"
      onSubmit={(evt) => onSubmit(value, evt)}
    >
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={style}
      />
      <div
        className={`autocomplete ${
          items.length > 0 ? 'autocomplete-slidedown' : ''
        }`}
      >
        {items.map((user) => (
          <div
            key={user.id}
            className="autocomplete-item"
            onClick={(evt) => onSubmit(user.login, evt)}
          >
            <img
              height="40px"
              className="photo"
              src={user.avatar_url}
              alt="pic"
            />
            <div className="name">{user.login}</div>
          </div>
        ))}
      </div>
    </form>
  );
}

InputAutoComplete.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  objArr: PropTypes.array,
  onSubmit: PropTypes.func,
};
