import styled from 'styled-components';
import { TableCell } from 'material-ui';

const NarrowTableCell = styled(TableCell).attrs({
  compact: true,
  disablePadding: true,
})``;

export default NarrowTableCell;
