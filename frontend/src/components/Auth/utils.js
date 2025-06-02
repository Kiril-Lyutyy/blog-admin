export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Invalid email address',
  },
};

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
};
