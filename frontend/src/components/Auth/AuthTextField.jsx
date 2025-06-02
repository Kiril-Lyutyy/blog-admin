import { TextField } from '@mui/material';

const AuthTextField = ({
  label,
  type = 'text',
  register,
  name,
  rules,
  error,
}) => (
  <TextField
    label={label}
    type={type}
    fullWidth
    size="small"
    error={!!error}
    helperText={error?.message}
    {...register(name, rules)}
  />
);

export default AuthTextField;
