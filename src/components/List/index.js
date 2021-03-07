import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import StarButton from '../StarButton';

export default function List({ items, onClick }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setRepos(items);
  }, [items]);

  return (
    <ul className="list">
      {repos.map((item) => (
        <li className="list-item" key={item.id}>
          <div>
            <div className="header-item">
              <h3>
                <a href={item.html_url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </h3>
            </div>
            <div className="description-item">{item.description}</div>
          </div>
          <div className="list-button">
            <StarButton
              id={`${item.id}`}
              text={`${item.stargazers_count}`}
              onClick={() => onClick(item)}
              type={item.request}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
};
