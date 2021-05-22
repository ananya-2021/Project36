var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed the Dog");
  feed.position(1080,110);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1000,110);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
 
  foodObj.display();

  //write code to read fedtime value from the database 
  var feed = database.ref('FeedTime');
  feed.on("value",function(data){
    FeedTime = data.val();
 })
 
  lastFed = hour();
  //write code to display text lastFed time here
  textSize(20);
  fill("white");

  if(lastFed >= 12){
    text("Last Fed At : " + lastFed + " PM",600,29);
  }else if(lastFed <= 12){
    text("Last Fed At : " + lastFed + " AM",600,29);
  }else {
    text("Last Fed At : " + lastFed + " AM",600,29);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  //write code here to update food stock and last fed time
 if(foodS !== 0){
  foodS = foodS-1;
  database.ref('/').update({
    Food:foodS
  })
 } 
 database.ref('/').update({
  FeedTime: lastFed
})
}

//function to add food in stock
function addFoods(){
  foodS += 1;
  database.ref('/').update({
    Food:foodS
  })
  foodObj.updateFoodStock(foodS);
}
