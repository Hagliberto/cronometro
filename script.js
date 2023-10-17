const startButton = document.getElementById('startButton'); // Obtém o elemento do botão "Começar!"
const resetButton = document.getElementById('resetButton'); // Obtém o elemento do botão "Resetar"
const minutesLabel = document.getElementById('minutes'); // Obtém o elemento do rótulo dos minutos
const secondsLabel = document.getElementById('seconds'); // Obtém o elemento do rótulo dos segundos
const chronometerRadio = document.getElementById('chronometer'); // Obtém o elemento do botão de rádio do cronômetro
const countdownRadio = document.getElementById('countdown'); // Obtém o elemento do botão de rádio do contador regressivo
const countdownTimeInput = document.getElementById('countdownTime'); // Obtém o elemento de entrada para o tempo do contador regressivo
const alarmSound = document.getElementById('alarmSound'); // Obtém o elemento de áudio do som do alarme

let totalSeconds = 0; // Inicializa o total de segundos como zero
let timerInterval; // Variável para armazenar o intervalo do timer
let isCountdown = false; // Variável para indicar se o modo de contador regressivo está ativado

function startTimer() {
  if (isCountdown) {
    const countdownTime = parseInt(countdownTimeInput.value); // Obtém o tempo do contador regressivo do campo de entrada
    if (isNaN(countdownTime) || countdownTime <= 0) {
      return; // Se o tempo não for válido, retorna sem iniciar o timer
    }
    totalSeconds = countdownTime; // Define o total de segundos como o tempo do contador regressivo
  }

  timerInterval = setInterval(setTime, 1000); // Inicia o timer a cada segundo (1000 milissegundos)
  startButton.disabled = true; // Desativa o botão "Começar!" para evitar cliques repetidos
  countdownTimeInput.disabled = true; // Desativa o campo de entrada do tempo do contador regressivo
}

function resetTimer() {
  clearInterval(timerInterval); // Limpa o intervalo do timer
  totalSeconds = 0; // Reseta o total de segundos para zero
  secondsLabel.innerHTML = '00'; // Atualiza o rótulo dos segundos para "00"
  minutesLabel.innerHTML = '00'; // Atualiza o rótulo dos minutos para "00"
  startButton.disabled = false; // Ativa o botão "Começar!" novamente
  countdownTimeInput.disabled = false; // Ativa o campo de entrada do tempo do contador regressivo novamente
}

function setTime() {
  if (isCountdown) {
    if (totalSeconds === 0) { // Se o tempo do contador regressivo chegar a zero
      clearInterval(timerInterval); // Limpa o intervalo do timer
      startButton.disabled = false; // Ativa o botão "Começar!" novamente
      countdownTimeInput.disabled = false; // Ativa o campo de entrada do tempo do contador regressivo novamente
      playAlarm(); // Chama a função para reproduzir o som do alarme
      return; // Retorna para interromper a contagem do timer
    }
    totalSeconds--; // Decrementa o total de segundos
  } else {
    totalSeconds++; // Incrementa o total de segundos
  }

  secondsLabel.innerHTML = pad(totalSeconds % 60); // Atualiza o rótulo dos segundos com os segundos formatados
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)); // Atualiza o rótulo dos minutos com os minutos formatados
}

function pad(val) {
  const valString = val.toString(); // Converte o valor para uma string
  return valString.length < 2 ? '0' + valString : valString; // Adiciona um zero à esquerda se o valor tiver apenas um dígito
}

function playAlarm() {
  alarmSound.play(); // Reproduz o som do alarme
  alert('Tempo esgotado!'); // Exibe um alerta informando que o tempo acabou
  alarmSound.pause(); // Pausa a reprodução do som do alarme
  alarmSound.currentTime = 0; // Reinicia o áudio para o início
}

startButton.addEventListener('click', startTimer); // Adiciona um ouvinte de evento ao botão "Começar!" para iniciar o timer
resetButton.addEventListener('click', resetTimer); // Adiciona um ouvinte de evento ao botão "Resetar" para reiniciar o timer

chronometerRadio.addEventListener('change', function() {
  isCountdown = false; // Define o modo de cronômetro como verdadeiro
  resetTimer(); // Reinicia o timer
});

countdownRadio.addEventListener('change', function() {
  isCountdown = true; // Define o modo de contador regressivo como verdadeiro
resetTimer(); // Reinicia o timer
});