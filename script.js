$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99");
});

function validarCPF() {
  try {
    const cpfFormatado = document.getElementById("cpf").value;
    const cpf = limparFormatacao(cpfFormatado);

    if (cpf.length !== 11) {
      throw new Error("CPF deve conter 11 dígitos.");
    }

    if (verificaDigitosRepetidos(cpf)) {
      throw new Error("CPF não pode conter repetição do mesmo dígito.");
    }

    const digito1 = calcularDigitoVerificador(cpf, 1);
    const digito2 = calcularDigitoVerificador(cpf, 2);

    if (!digito1 || !digito2) {
      throw new Error(`CPF inválido - ${cpfFormatado}`);
    }

    exibirResultado(`CPF Válido - ${cpfFormatado}`, "green");
  } catch (error) {
    exibirResultado(error.message, "red");
  }
}

function calcularDigitoVerificador(cpf, posicao) {
  const sequencia = cpf.slice(0, 8 + posicao).split("");

  let soma = 0;
  let multiplicador = 9 + posicao;

  for (const numero of sequencia) {
    soma += multiplicador * Number(numero);
    multiplicador--;
  }
  const restoDivisao = (soma * 10) % 11;
  const digito = cpf.slice(8 + posicao, 9 + posicao);

  return restoDivisao == digito;
}

function limparFormatacao(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return cpf;
}

function exibirResultado(texto, cor) {
  const span = document.getElementById("resultado");
  span.innerHTML = texto;
  span.style.color = cor;
}

function verificaDigitosRepetidos(cpf) {
  return cpf.split("").every((d) => d === cpf[0]);
}
