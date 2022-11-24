objects = [];
stature = "";
function preload()
{ 
    video = createVideo('video.mp4'); 
}
function setup() 
{ 
    canvas = createCanvas(480, 380); 
    canvas.center(); 
    video.hide(); 
}
function start() 
{ 
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("stature").innerHTML = "Status : Detecting Objects";
} 
function modelLoaded() 
{ 
     console.log("Model Loaded!"); 
     stature = true;
     video.loop(); 
     video.speed(1); 
     video.volume(0); 
    
}
function gotResult(error, results) 
{ 
    if (error) 
    { 
        console.log(error); 
    } 
    console.log(results); 
    objects = results; 
}
function draw() 
{ 
    image(video, 0, 0, 480, 380); 
    if(stature != "") 
    { 
        objectDetector.detect(video, gotResult);
    }
    for(i = 0; i < objects.length;i++);
    {
        document.getElementById("stature").innerHTML = "Status : Objects Detected";
        document.getElementById("number").innerHTML = "No. of Objects Detected : "+ objects.length;
        fill("#0f80d1");
        percent = floor(objects[i].confidence*100);
        text(Objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("#0f80d1");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }