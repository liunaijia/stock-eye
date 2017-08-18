import styled from 'styled-components';

import NarrowTableCell from './NarrowTableCell';

const NumericTableCell = styled(NarrowTableCell).attrs({
  numeric: true,
})``;

export default NumericTableCell;
