import { Button } from '@mui/material';

const SubmitButton = ({ loading, children }) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    fullWidth
    size="large"
    disabled={loading}
  >
    {loading ? 'Loading...' : children}
  </Button>
);

export default SubmitButton;
