//P-38 Traffic Racer 2D V2 ~ C38 WHTJR
//At 15-04-2021 13:15 - Remastered

var Play = 1;
var End = 0;
var gameState = Play;

var Kilometers = 0;
var OTraffic, OTrafficGroup;
var GuardRailL, GuardRailR, SolidLine;
var PTraffic, PTrafficGroup;
var CarCrash, CarCrashImage, PlayerCar, PlayerCarImage;

function preload() {

    PlayerCarImage = loadImage("playercar.png");
    CarCrashImage = loadImage("crash.png");

}

function setup() {
    createCanvas(displayWidth-10, displayHeight-150);
    
    GuardRailL = createSprite(100, 300, 10, 1000000000000);
    GuardRailL.shapeColor = rgb(181);

    SolidLine = createSprite(300, 300, 5, 1000000000000);
    SolidLine.shapeColor = rgb(255, 255, 255);

    GuardRailR = createSprite(500, 300, 10, 1000000000000);
    GuardRailR.shapeColor = rgb(181);

    PlayerCar = createSprite(300, 500, 40, 80);
    PlayerCar.addImage(PlayerCarImage);
    PlayerCar.shapeColor = rgb(255, 0, 0);

    PTrafficGroup = new Group();
    OTrafficGroup = new Group();
   
}

function draw() {

    background(0);
    
    textSize(18);
    fill(rgb(255, 255, 255));
    textFont("Magneto");
    text("~ Traffic Racer 2D ~", 1050, PlayerCar.y-470);
    fill(rgb(255, 255, 255))
    textFont("Verdana");
    text("V2", 1270, PlayerCar.y-470);    

    if (keyCode === "SPACE") {
        gameState === Play;
    }

    if (gameState === Play) {
        
        CountKilometers();
        fill(rgb(255, 255, 255));
        textFont("Georgia");
        textSize(18);
        text("Travelled Metres : "+ Kilometers, 600, PlayerCar.y-460);

        fill(255);
        textSize(15);
        textFont("Verdana");
        text("Your Story : ", 600, PlayerCar.y-360);
        text("You have a car, you're late to your university. You've ran out of excuses of being late.", 600, PlayerCar.y-310);
        text("All you have to do is to dodge the traffic as far as possible. Or, you maybe late to attend", 600, PlayerCar.y-290);
        text("your professor's (boring) lecture. ", 600, PlayerCar.y-270);
        text("* The traffic on your right is preceding, while the traffic on your left is oncoming.", 600, PlayerCar.y-210);
        text("* Hold the UP ARROW Key to accelerate, DOWN ARROW Key to reverse.", 600, PlayerCar.y-185);
        text("* Use Left and Right Arrow Keys to steer.", 600, PlayerCar.y-165);
        textFont("Comic Sans MS");
        textSize(17);
        text("Your Objective is to: ", 650, PlayerCar.y-100);
        text("1: Dodge the traffic as far as possible", 650, PlayerCar.y-80);
        text("2: Check your score at the end!", 650, PlayerCar.y-60);

        camera.position.x = displayWidth/2;
        camera.position.y = PlayerCar.y-230;
    

    if (keyDown("UP_ARROW")) {
        PlayerCar.y = PlayerCar.y-20;
    }

    if (keyDown("Down_ARROW")) {
        PlayerCar.y = PlayerCar.y+5;
    }

    if (keyDown("LEFT_ARROW")) {
        PlayerCar.x = PlayerCar.x-13;
    }

    if (keyDown("RIGHT_ARROW")) {
        PlayerCar.x = PlayerCar.x+13;
    }

    PlayerCar.bounceOff(GuardRailR);
    PlayerCar.bounceOff(GuardRailL);

    setTimeout(function(){ 

    if (frameCount % 30 === 0) {
        PTraffic = createSprite(300, PlayerCar.y-800, 40, 80);
        PTraffic.velocityY = (Math.round(random(-5, -20)));
        PTraffic.x = (Math.round(random(340, 460)));
        PTraffic.shapeColor = color(random(0, 255), random(0, 255), random(0, 255));
        PTrafficGroup.add(PTraffic);

    }

    if (frameCount % 40 === 0) {
        OTraffic = createSprite(300, PlayerCar.y-800, 40, 80);
        OTraffic.velocityY = (Math.round(random(15, 35)));
        OTraffic.x = (Math.round(random(140, 270)));
        OTraffic.shapeColor = color(random(0, 255), random(0, 255), random(0, 255));
        OTrafficGroup.add(OTraffic);

    }

    if (PlayerCar.isTouching(PTrafficGroup)) {
        PTrafficGroup.setVelocityYEach(0);
        OTrafficGroup.setVelocityYEach(0);
        PlayerCar.addImage(CarCrashImage);
        gameState = End;

    }

    if (PlayerCar.isTouching(OTrafficGroup)) {
        OTrafficGroup.setVelocityYEach(0);
        PTrafficGroup.setVelocityYEach(0);
        PlayerCar.addImage(CarCrashImage);
        gameState = End;

    }

}, 10000);


}

    if (gameState === End) {

    fill(255);
    textFont("Verdana")
    textSize(15);
    text("Sorry, you Crashed!", 800, PlayerCar.y-400);
    textSize(16);
    text("Press F5 to restart", 700, PlayerCar.y-300);
    textFont("Times New Roman");
    text("Mts Driven : "+Kilometers, 900, PlayerCar.y-300);
    textFont("Georgia");
    text("Traffic Racer V3 releasing soon!", 750, PlayerCar.y-90);

    if (Kilometers > 2000) {
        text("Congratulations! You've made it to 2 KMs!", 700, PlayerCar.y-250);
    }

}

    drawSprites();

}

function CountKilometers() {
    if (keyDown("UP_ARROW") && gameState === Play) {
        Kilometers = Math.round(frameCount);
        fill(rgb(255, 255, 255));
        textSize(18);
        textFont("Georgia");
    }
    
}