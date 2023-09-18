const isValidEmailUtil = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export default isValidEmailUtil;
