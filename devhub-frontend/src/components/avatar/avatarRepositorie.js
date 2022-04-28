import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AvatarRepositorie = ({ text, to, width, height, size }) => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const LinkCustom = styled(Link)`
    width: ${width ? width : '50px'};
    height: ${height ? height : '50px'};
    text-decoration: none;
    display: grid;
    color: #707070;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border-radius: 5px;
    border: 0.5px #b1840073 solid;
    font-size: ${size ? size : '20px'};
    margin-right: 10px;
  `;
  return (
    <LinkCustom
      to={to.toLowerCase()}
      style={{ backgroundColor: `rgb(${r} ${g} ${b} / 10%)` }}
    >
      <div>{text[0]}</div>
    </LinkCustom>
  );
};
