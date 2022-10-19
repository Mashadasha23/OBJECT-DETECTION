var obj_status = "";
var obj= [];
var y = 0;
var x = 0;

var width = 0;
var height = 0;

var obj_name = "";
var obj_accuracy = 0;

function preload() {
    image_dog_cat = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", model_Loaded);
    document.getElementById("status").innerHTML = "Status : Loading Model";
}

function draw() {
    image(image_dog_cat, 0, 0, 700, 500);
    if (obj_status != "") {

        for (var i = 0; i < obj.length; i++) {
            
            noFill();
            stroke("green");
            x = obj[i].x;
            y = obj[i].y;

            width = obj[i].width;
            height = obj[i].height;

            obj_accuracy = (obj[i].confidence * 100).toFixed(2);
            obj_name = obj[i].label;


            //rect(x,y,width,height);
            rect(x, y, width, height);
            fill("green");
            textSize(30);
            text(obj_name + " " + obj_accuracy + "%",x,y);

        }

    }

}

function model_Loaded() {
    console.log("Model Is loaded");

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectDetector.detect(image_dog_cat, got_Results);

}

function got_Results(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        obj = results;
        obj_status = true;
    }


}
