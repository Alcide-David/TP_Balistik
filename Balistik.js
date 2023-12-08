const balistik = {
  _alph: 'abcdefghijklmnopqrstuvwxyz',
  _salt: "Ux00",

  encrypt: function (str) {
    let encrypted = "";
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      //Condition nous permettant de savoir si str contient que des caracteres de _alph
      if (!this._alph.includes(char.toLowerCase())) {
        throw new ValueError(" | ERREUR | -> Ce caractere ne correspond pas : " + char);
      }

      let index = this._alph.indexOf(char.toLowerCase());
      //Verification si l'existe un caractere en Majuscule
      if (isUpper(char)) {
        //Si oui, on ajoute un 0 a l'indice de ce caractere
        index = "0" + String(index);
      } else {
        index = String(index);
      }
      encrypted += index + ".";
    }
    
    encrypted = this._salt + "." + encrypted + str.length;
    return encrypted;
  },


  decrypt: function (str) {
    let parts = str.split(".");
    //Verification si le cle contient l'indice _salt
    if (parts[0] !== this._salt) {
      throw new ValueError(" | ERREUR | -> Le _salt ne correspond pas ");
    }

    //Sachant que la longueur du mot est a la fin, on verifie cette longueur avant de passer au decryptage
    if (parts.length - 2 !== parseInt(parts[parts.length - 1])) {
      throw new ValueError(" | ERREUR | -> La longueur de ce cle est incorrecte");
    }

    let decrypted = "";
    //Boucle permettant le decryptage
    for (let i = 1; i < parts.length - 1; i++) {
      let charIndex = parseInt(parts[i]);
      if (parts[i].startsWith("0")) {
        decrypted += this._alph[charIndex].toUpperCase();
      } else {
        decrypted += this._alph[charIndex];
      }
    }
    return decrypted;
  },
};

// Fonction pour savoir si un caractere est en Minuscule
function isLower(letter) {
  return letter.toLowerCase() === letter;
}

// Fonction pour savoir si un caractere est en Majuscule
function isUpper(letter) {
  return letter.toUpperCase() === letter;
}

//Notre fonction ValueError
function ValueError(message) {
  const error = new Error(message);
  return error;
}

// Test
console.log(balistik.encrypt("balistik")); // "Ux00.1.0.11.8.18.19.8.10.8"
console.log(balistik.decrypt("Ux00.02.14.3.8.13.6.6")); // "Coding"
