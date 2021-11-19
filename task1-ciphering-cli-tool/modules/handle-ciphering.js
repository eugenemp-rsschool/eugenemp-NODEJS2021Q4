// Atbash ciphering
const atbash = (str) => {
  // This function runs within every latin char in provided string and returns encoded one
  const encode = (letter, min) =>
    String.fromCharCode(min + 25 - (letter.charCodeAt() - min));

  return str
    .replace(/[a-z]/g, (letter) => encode(letter, 97))
    .replace(/[A-Z]/g, (letter) => encode(letter, 65));
};

module.exports = {
  atbash,
};
