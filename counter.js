// Defina a data e hora para a contagem regressiva (exemplo: 24 horas a partir de agora)
let countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 horas a partir do momento atual

// Atualize a contagem regressiva a cada 1 segundo
let x = setInterval(function() {
  
  // Obtenha a data e hora atuais
  let now = new Date().getTime();
  
  // Calcule a diferença entre a data final e a data atual
  let distance = countdownDate - now;
  
  // Calcule as horas, minutos e segundos restantes
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Exiba o resultado no elemento HTML com o id correto
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
  
  // Se a contagem regressiva terminar, escreva "EXPIRED"
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
    // Opcionalmente, pode esconder o botão ou mostrar uma mensagem "Oferta Expirada"
    alert("A oferta expirou!");
  }
}, 1000);
