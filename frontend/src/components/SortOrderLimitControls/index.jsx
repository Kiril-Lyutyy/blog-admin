import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { ControlsWrapper } from './styles';

const SortOrderLimitControls = ({
  sort,
  order,
  limit,
  onSortChange,
  onOrderChange,
  onLimitChange,
}) => (
  <ControlsWrapper>
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Sort by</InputLabel>
      <Select value={sort} label="Sort by" onChange={onSortChange}>
        <MenuItem value="created_at">Date</MenuItem>
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="author">Author</MenuItem>
      </Select>
    </FormControl>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Order</InputLabel>
      <Select value={order} label="Order" onChange={onOrderChange}>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Posts per page</InputLabel>
      <Select value={limit} label="Posts per page" onChange={onLimitChange}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
  </ControlsWrapper>
);

export default SortOrderLimitControls;
