import styled from 'styled-components'

function getHeight({ axis, size }) {
  return axis === 'horizontal' ? 1 : size
}

function getWidth({ axis, size }) {
  return axis === 'vertical' ? 1 : size
}

const Spacer = styled.span`
  display: ${({ inline }) => inline ? 'inline-block' : 'block'};
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

export default Spacer

/*
  <Spacer
    size={32}
    when={{
      lgAndUp: 64,
      xlAndUp: 96,
    }}
  />
*/
