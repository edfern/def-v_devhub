import React, { Fragment, useEffect, useRef, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useEventListner } from '../../hooks/useAddEventListener';
import { useRepository } from '../../hooks/useRepository';
import { LoadingSpinner } from '../spinner';
import { apiSearchUserByIdRepo } from '../../services/apiRepository';
import { connect } from 'react-redux';
import { setId } from '../../Auth/actions/auth.actions';

const ButtonSearch = ({ size, label, setId }) => {
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [userRepository, setUserRepository] = useState([]);

  const search = useRef();
  const { searchByVisiblePublic } = useRepository();
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRepository(userRepository.filter((n) => n.id !== userRepository.id));
    setShow(true);
    searchByVisiblePublic({
      setMessage,
      setRepositories,
      name: query,
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    searchByVisiblePublic({
      setMessage,
      setRepositories,
      name: e.target.value === '' ? '' : e.target.value,
    });
  };

  useEffect(() => {
    if (query !== '') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [query]);

  const handleShow = (e) => {
    if (!search.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEventListner(handleShow);

  useEffect(() => {
    setLoading(true);
    if (Object.keys(repositories).length > 0) {
      for (const repository of repositories) {
        apiSearchUserByIdRepo({ idRepo: repository.id })
          .then((resp) => {
            setLoading(false);
            setUserRepository([{ ...repository, user: resp.data }]);
          })

          .catch((err) => {
            console.error(err);
          });
      }
      setSuccess(true);
    }
  }, [repositories]);

  useEffect(() => {
    if (!show) {
      setUserRepository([]);
    }
  }, [show]);

  const handleClick = ({ id, name, username }) => {
    const userInfo = localStorage.getItem('userInfo');
    const info = JSON.parse(userInfo);

    const data = {
      id: id,
      invited: true,
    };
    if (info.id === id) {
      setShow(false);
      setId({ ...data, invited: false });
    } else {
      setShow(false);
      setId({ ...data, invited: true, name, username });
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="search" ref={search}>
        <div className={`wrap-input ${show && 'active'}`}>
          <input
            type="text"
            placeholder={label}
            onChange={handleChange}
            value={query}
          />
          <button type="submit" onSubmit={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
        <CSSTransition
          in={show}
          classNames="hidden"
          unmountOnExit
          timeout={100}
        >
          <div className="search-items">
            {loading && <LoadingSpinner color="#fff" styles="_small" />}
            {success &&
              Object.keys(userRepository).length > 0 &&
              userRepository
                .filter((n) => n.id !== userRepository.id)
                .map((item, key) => {
                  return (
                    <Link
                      to={`/${item.user.username}/${item.name}`}
                      key={key}
                      onClick={() =>
                        handleClick({
                          id: item.user.id,
                          name: item.user.name,
                          username: item.user.username,
                        })
                      }
                    >
                      <h3 className="title">{item.name}</h3>
                      <span className="description">
                        @{item.user.username} / <i>{item.description}</i>
                      </span>
                    </Link>
                  );
                })}
          </div>
        </CSSTransition>
      </form>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setId: (id) => dispatch(setId(id)),
});

export default connect(null, mapDispatchToProps)(ButtonSearch);
