export const formatInteger = number => {
  const digits = number.toString().split('');

  const formattedDigits = [];
  for (let i = digits.length - 1, j = 0; i >= 0; i--, j++) {
    if (j % 3 === 0 && j !== 0) {
      formattedDigits.unshift(',');
    }
    formattedDigits.unshift(digits[i]);
  }

  const formattedNumber = formattedDigits.join('');

  return formattedNumber;
};
