img="";
status="";
object=[];
function preload(){
    img=loadImage("dog_cat.jpg")
}

function setup(){
    canvas=createCanvas(380,380)
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_dectector=ml5.objectDetector('cocossd',modelLoaded) ;
    document.getElementById("status").innerHTML='Status=Detecting Objects'
}
    
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}

function got_result(error,results){
    if(error){
        console.error(error);
        
    }
    else{
        console.log(results)
        object=results;
    }
}

function draw(){
    image( video,0,0,380,380);

    if (status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        object_dectector.detect(video,got_result);
         for (i=0; i<object.length; i++){
            document.getElementById("status").innerHTML='Status = Object Detected';
            document.getElementById("no").innerHTML='Number Of Object Detected ='+object.length;
            persent= floor(object[i].confidence*100);
            fill(r,g,b);
            text(object[i].label +""+persent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
           rect(object[i].x,object[i].y,object[i].width,object[i].height);
         }
    }
}