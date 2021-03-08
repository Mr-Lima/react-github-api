import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import StarButton from '../StarButton';
import './index.css';

export default function List({ items, onClick, endListCallback }) {
  const [repos, setRepos] = useState([]);
  const observePoint = useRef();
  const [observerRatio, setObserverRatio] = useState(0);

  useEffect(() => {
    setRepos(items);
  }, [items]);

  const io = new IntersectionObserver((entries) => {
    const ratio = entries[0].intersectionRatio;
    setObserverRatio(ratio);
  }, {});

  useEffect(() => {
    io.observe(observePoint.current);

    return () => {
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (observerRatio > 0 && repos.length > 0) {
      endListCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerRatio]);

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
      <div
        ref={observePoint}
        style={{
          display: repos.length > 0 ? 'block' : 'block',
          position: 'relative',
          top: '-16px',
          backgroundColor: 'yellow',
        }}
      />
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  endListCallback: PropTypes.func,
};
