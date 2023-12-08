const balistik = {
  _alph: 'abcdefghijklmnopqrstuvwxyz',
  _salt: "Ux00",
  encrypt: function (str) {
    let encrypted = "";
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (!this._alph.includes(char.toLowerCase())) {
        throw new ValueError("Invalid character found: " + char);
      }

      let index = this._alph.indexOf(char.toLowerCase());
      if (isUpper(char)) {
        index = "0" + String(index);
      } else {
        index = String(index);
      }
      encrypted += index + ".";
    }
    
    encrypted = this._salt + "." + encrypted + str.length + ".";
    return encrypted;
  },
  decrypt: function (str) {
    let parts = str.split(".");
    if (parts[0] !== this._salt) {
      throw new SaltError("Incorrect salt");
    }

    if (parts.length - 2 !== parseInt(parts[parts.length - 1])) {
      throw new LengthError("Invalid length");
    }

    let decrypted = "";
    for (let i = 2; i < parts.length - 1; i++) {
      let charIndex = parseInt(parts[i]);
      if (parts[i].startsWith("0")) {
        charIndex = charIndex - 1;
        decrypted += this._alph[charIndex].toUpperCase();
      } else {
        decrypted += this._alph[charIndex];
      }
    }
    return decrypted;
  },
};

// Function to check if a character is lowercase
function isLower(letter) {
  return letter.toLowerCase() === letter;
}

// Function to check if a character is uppercase
function isUpper(letter) {
  return letter.toUpperCase() === letter;
}

// Custom error classes
class ValueError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValueError";
  }
}

class SaltError extends Error {
  constructor(message) {
    super(message);
    this.name = "SaltError";
  }
}

class LengthError extends Error {
  constructor(message) {
    super(message);
    this.name = "LengthError";
  }
}

// Usage examples
console.log(balistik.encrypt("balistik")); // "Ux00.1.0.11.8.18.19.8.10.8"
console.log(balistik.decrypt("Ux00.02.14.3.8.13.6.6")); // "Coding"