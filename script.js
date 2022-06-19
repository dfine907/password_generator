//Resources: w3schools ASCII Printalbe Characters--specific codes
const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const upperCaseElement = document.getElementById("uppercase");
const lowerCaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomFunction = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};


clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultElement.innerText

    if(!password) {
        return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard')

})

generateElement.addEventListener("click", () => {
  const length = parseInt(lengthElement.value);
  const hasUpperChecked = upperCaseElement.checked;
  const hasLowerChecked = lowerCaseElement.checked;
  const hasNumbersChecked = numbersElement.checked;
  const hasSymbolsChecked = symbolsElement.checked;

  resultElement.innerText = generatePassword(
    hasUpperChecked,
    hasLowerChecked,
    hasNumbersChecked,
    hasSymbolsChecked,
    length
  );
});

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = upper + lower + number + symbol;
  const typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for(let i = 0; i <length; i += typesCount) {
    typesArray.forEach(type => {
        const functionName = Object.keys(type)[0]
        generatedPassword += randomFunction[functionName]()
    })
  }
  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}=<>?/,.+;";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
