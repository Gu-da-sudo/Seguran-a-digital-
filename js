// Seleção dos elementos do DOM
const lengthInput = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseIn = document.getElementById('uppercase');
const lowercaseIn = document.getElementById('lowercase');
const numbersIn = document.getElementById('numbers');
const symbolsIn = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const passwordDisplay = document.getElementById('password-display');

// Atualiza o texto do tamanho da senha em tempo real
lengthInput.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Dicionários de caracteres (Os conjuntos matemáticos)
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Função para gerar número aleatório criptograficamente seguro
// Substitui o Math.random() comum para evitar previsibilidade matemática
function getRandomSecureValue(max) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
}

function generatePassword() {
    let pool = '';
    
    // Construindo o universo de possibilidades (Espaço Amostral)
    if (uppercaseIn.checked) pool += charSets.uppercase;
    if (lowercaseIn.checked) pool += charSets.lowercase;
    if (numbersIn.checked) pool += charSets.numbers;
    if (symbolsIn.checked) pool += charSets.symbols;

    // Se nenhum box for marcado, avisa o usuário
    if (pool.length === 0) {
        passwordDisplay.value = 'Selecione uma opção!';
        return;
    }

    let password = '';
    const passwordLength = parseInt(lengthInput.value);

    // Sorteio probabilístico de cada caractere
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = getRandomSecureValue(pool.length);
        password += pool[randomIndex];
    }

    passwordDisplay.value = password;
}

// Evento do botão
generateBtn.addEventListener('click', generatePassword);
