const cash = (text) => {
  if (text === -1){
    return "";
  } 

  if (!text) {
    return "$0.00";
  }

  const amount = parseFloat(text.toString());
  const cashFormatNumber = amount.toFixed(2);
  const [wholePart, decimalPart] = cashFormatNumber.split(".");
  // the name of this variable should be based on the pattern
  // that the regrex matches
  // it seems to be matching groups of 3 digits
  const REGEX = /\B(?=(\d{3})+(?!\d))/g;
  const formattedWholePart = wholePart.toString().replace(REGEX, ",")
  const formattedDecimalPart = decimalPart ? `.${decimalPart}` : "";
  const value = formattedWholePart + decimalPart;
  return "$" + val;
};

export default cash;