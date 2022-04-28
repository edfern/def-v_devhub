import styled, { css } from 'styled-components';

import '../card/index.css';

const CardContainer = styled.div`
  border: ${(props) => props.border};
  top: ${(props) => props.top};
  position: ${(props) => props.position};
  margin-bottom: ${(props) => props.mb};
  padding: ${(props) => props.pd};
  width: ${(props) => props.width};
  max-width: ${(props) => props.mx};
  background: ${(props) => props.bg};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.br};
  box-shadow: 0px 5px 20px rgb(0 0 0 / ${(props) => props.boxShadow});
  z-index: ${(props) => props.z};
  overflow: hidden;
  min-height: max-content;
  ${(props) =>
    props.type === 'border' &&
    css`
      border-top: 4px solid ${(props) => props.bc};
      @media only screen and (max-width: 780px) {
        height: auto;
      }
      @media only screen and (min-width: 780px) {
        overflow-x: auto;
      }
    `}
`;

export const Card = ({
  children,
  pd,
  height,
  position,
  top,
  ref,
  zIndex,
  marginB,
  className,
  borderColor,
  borderTop,
  borderRadius,
  background,
  width,
  border,
  boxShadow,
  maxWidth,
}) => (
  <CardContainer
    pd={pd}
    height={height}
    position={position}
    top={top}
    ref={ref}
    z={zIndex}
    className={className}
    type={borderTop}
    bc={borderColor}
    br={borderRadius}
    width={width}
    border={border}
    boxShadow={boxShadow}
    mb={marginB}
    bg={background}
    mx={maxWidth}
  >
    {children}
  </CardContainer>
);
