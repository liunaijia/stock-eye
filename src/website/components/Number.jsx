import styled from 'styled-components';

const Number = styled.span`
  color: var(${(props) => (/^\s*-/.test(props.children) ? '--green' : '--red')});
`;

export default Number;
