prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8vgR4xzKB/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("image_captured");
    classifier.classify(img,gotResult);
   
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        
        prediction=results[0].label;
        speak();
        if (results[0].label=="STOP"){
       document.getElementById("result_emoji").innerHTML="&#9995;";
        }
        if (results[0].label=="POWER"){
            document.getElementById("result_emoji").innerHTML="&#9994;";
             }
             if (results[0].label=="YO YO"){
                document.getElementById("result_emoji").innerHTML="&#129304;";
                 }
    }

}