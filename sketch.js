//Create variables here
var saddog,happydog,database,foods

function preload()
{
  happydog = loadImage("images/dogImg1.png")
	saddog = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,250)
  dog.addImage(saddog)
  dog.scale=0.1

  foodstock = database.ref("Food")
  foodstock.on("value",readStock,showErr)
  
}


function draw() {  
  background("cyan")

  if(keyDown("space")){
    writeStock(foods)
    dog.addImage(happydog)
    dog.scale=0.1
  }
  //console.log(dog)

  drawSprites();
  //add styles here
  textSize(20)
  text("Food Remaining:" + foods,150,150)
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",20,50)

}

function writeStock(x){
    if(x<=0){
      x = 0;
    }else {
      x=x-1;
    }
    console.log(x);
   database.ref('/').set({
     Food:x
   });
  }


function readStock(data){
  foods = data.val();
}

function showErr(){
  console.log("error")
}
