objects = [];
Status = "";

function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(480,380);
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
  object_name=document.getElementById("object_name").value;
}

function modelLoaded() {
  console.log("¡Modelo cargado!")
  Status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 480, 380);
      if(Status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Estado: objeto detectado";
          document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: "+ objects.length;
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == object_name) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHtml=object_name+" encontrado";
            synth=window.speechSynthesis;
            utterThis=new SpeechSynthesisUtterance(object_name+" encontrado");
            synth.speak(utterThis);
          }
          else{
            document.getElementById("status").innerHtml=object_name+"No encontrado";            
          }
        }
      }
}