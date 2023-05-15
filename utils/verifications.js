


const passValidation = async (password) => {
  const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPass.test(password) === false) {
    return {
      valid: false,
      errorMessage:
        "La contraseña debe de contener al menos 8 carácteres, al menos 1 mayúscula, 1 minúscula y 1 número. Puede contener carácteres especiales",
    };
  }
  return { valid: true };
};

const emailValidation = async (email) => {
  console.log(email)
  const regexEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
  if (regexEmail.test(email) === false) {
    return {
      valid: false,
      errorMessage: "Porfavor, intruduce un correo electrónico válido",
    };
  }
  return { valid: true };
};

module.exports = {
  passValidation,
  emailValidation
};
