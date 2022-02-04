const cash = (text) => {
  if (text === -1){
    return "";
  } 

  if (!text) {
    return "$0.00";
  }

  const amount = parseFloat(text.toString());
  const cashFormatNumber = amount.toFixed(2);
  const cashArray = cashFormatNumber.split(".");

  const val = `${
    cashArray[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (cashArray[1] ? "." + cashArray[1] : "")
  }`;
  return "$" + val;
};

export default cash;