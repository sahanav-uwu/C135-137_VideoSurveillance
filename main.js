objects = [];
video = "";
status1 = "";

function preload(){
   video = createVideo("video.mp4");
   video.hide();
}

function setup(){
   canvas = createCanvas(400, 300);
   canvas.center();
}

function draw(){
   image(video, 0, 0, 400, 300);

   if(status1 != ""){
      objectDetector.detect(video, gotResult);
      
      for(i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "Objects Detected";
         document.getElementById("number").innerHTML = "Number of objects detected: " + objects.length;

         fill("#2e8b56");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("#2e8b56");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
   }
}

function gotResult(error, results){
   if(error){
      console.log(error);
   }
   else{
      console.log(results);
      objects = results;
   }
}

function start(){
   objectDetector = ml5.objectDetector("cocossd", modelLoaded);
   document.getElementById("status").innerHTML = "Detecting Objects...";
}

function modelLoaded(){
   console.log("Model Loaded!");
   status1 = true;
   video.loop();
   video.speed(1.25);
   video.volume(0);
}