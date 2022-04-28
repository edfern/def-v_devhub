import { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../button';

const Section = ({ children, title, description, expand, onClick }) => {
  const [open, setOpen] = useState(expand);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setOpen(!open);
    onClick && onClick();
  };

  useEffect(() => {
    if (open) {
      setMessage('Esconder');
    } else {
      setMessage('Expandir');
    }
  }, [open]);
  return (
    <Fragment>
      <section className="section">
        <div className="section-header">
          <div>
            <h4 onClick={handleClick} className="title">
              {title}
            </h4>
            <div className="description">{description}</div>
          </div>
          <div>
            <Button
              type="info"
              text={message || 'Expandir'}
              variant="outlined"
              onClick={handleClick}
            />
          </div>
        </div>
        <CSSTransition
          in={open}
          classNames="hidden"
          unmountOnExit
          timeout={{ enter: 100, exit: 100 }}
        >
          {children}
        </CSSTransition>
      </section>
    </Fragment>
  );
};

export default Section;
