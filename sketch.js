//Create variables here
var dog,dogImg,happyImg,foodS,foodStock
var fedTime,lastFed,feed,addFood;
var milk;

function preload()
{
	//load images here
dogImg=loadImage("images/dogImg.png")
happyImg=loadImage("images/dogImg1.png")

}

function setup() {
  database=firebase.database()
	createCanvas(1000, 400);
  
  milk=new Food();

foodStock=database.ref("food")
foodStock.on("value",readStock)


dog=createSprite(800,200,150,150)
dog.addImage(dogImg)
dog.scale=0.15

feed=createButton("FEED THE DOG")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton("ADD FOOD")
addFood.position(850,95)
addFood.mousePressed(addFoods)

}


function draw() {  
background("green")

milk.display()

fedTime=database.ref('FEED TIME')
fedTime.on("value",function(data){
lastFed=data.val()
})


  textSize(15)
  fill(255)
 
if(lastFed == 0){
 text(" LAST FEED : 12 AM" ,350,30)
}
else
if(lastFed >= 12){
 text("Last Feed :  "+ lastFed%12 +"PM",350,30)
}
else{
text("LAST FEED :"+lastFed+"AM",350,30)
}


drawSprites();

}



function readStock(data){
  foodS=data.val()
  milk.updateFoodStock(foodS)
  }
  
  function feedDog(){
    dog.addImage(happyImg)

  milk.updateFoodStock(milk.getFoodStock()-1)
database.ref("/").update({
food:milk.getFoodStock(),
feedTime:hour()
})
  }


function addFoods(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}