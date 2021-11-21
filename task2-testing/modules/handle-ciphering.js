// Atbash ciphering
const atbash = (str) => {
  // This function runs within every latin char in provided string and returns encoded one
  const encode = (letter, min) =>
    String.fromCharCode(min + 25 - (letter.charCodeAt() - min));

  return str
    .replace(/[a-z]/g, (letter) => encode(letter, 97))
    .replace(/[A-Z]/g, (letter) => encode(letter, 65));
};

// Caesar ciphering. Also used for ROT-8
const caesar = (type, mode) => {
  const shift = (type === 'C' && 1) || (type === 'R' && 8);

  return (str) => {
    // Same as before this function returns encodes char...
    const encode = (letter, min) =>
      String.fromCharCode(((letter.charCodeAt() - min + shift) % 26) + min);
    // ...but for Caesar we also need a decoder
    const decode = (letter, min) => {
      const pos = (letter.charCodeAt() - min - shift) % 26;
      return pos < 0
        ? String.fromCharCode(min + 26 + pos)
        : String.fromCharCode(pos + min);
    };

    return str
      .replace(/[a-z]/g, (letter) =>
        mode ? encode(letter, 97) : decode(letter, 97)
      )
      .replace(/[A-Z]/g, (letter) =>
        mode ? encode(letter, 65) : decode(letter, 65)
      );
  };
};

module.exports = {
  atbash,
  caesar,
};
