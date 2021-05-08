const video = document.getElementById('video')

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/tfLPHK490/';
ml5.imageClassifier(imageModelURL + 'model.json').then(classifier => {
  iniciar(classifier)
});

let flippedVideo;

function iniciar(classifier) {
  setInterval(async () => {
    classifyVideo(classifier);
  }, 400);
 }

function classifyVideo(classifier) {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, resultado) {
  document.getElementById('overlay').style.display = 'none';
  if (error) {
    console.error(error);
    return;
  }

  if(resultado[0].label === 'mascara') {
    document.body.style.backgroundColor = "#6ce089";
    document.getElementById('alerta').innerHTML = "👍👍"
  } else {
    document.body.style.backgroundColor = "#e06c6c"; 
    document.getElementById('alerta').innerHTML = "Coloque a máscara! 👎"
  }
}
