import isNullOrEmpty from "./isNullOrEmpty";

const formatAddress = (address) => {
  var result = "";

  if (!isNullOrEmpty(address.street)) {
    result += `${address.street}`;
  }
  if (!isNullOrEmpty(address.city)) {
    if (isNullOrEmpty(result)) {
      result += `${address.city}`;
    } else {
      result += `, ${address.city}`;
    }
  }
  if (!isNullOrEmpty(address.province)) {
    result += `, ${address.province}`;
  }
  if (!isNullOrEmpty(address.country)) {
    result += `, ${address.country}`;
  }
  if (!isNullOrEmpty(address.zipCode)) {
    result += `, ${address.zipCode}`;
  }

  return result;
};

export default formatAddress;
