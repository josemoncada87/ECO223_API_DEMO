// Dummy class for item generation
class Item{
  constructor(x, y, r, g, b){
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  show(){
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, 20, 20);
  }
}

// Designed Endpoints
const apiUrlForGet = "http://127.0.0.1:3000/items";
const apiUrlForPost = "http://127.0.0.1:3000/items"

// Function for item fetching
async function fetchItems() {
  try {
    const response = await fetch(apiUrlForGet);    
    if (!response.ok) {
      throw new Error(`HTTP error : Status: ${response.status}`);
    }    
    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

let items = []

function setup() {
  createCanvas(400, 400);
  // Fetch existing items on server and re-create objets
  fetchItems().then(onServerItems => {
    console.log('Fetched items:', onServerItems.items);
    onServerItems.items.forEach(eachItem => {
      const {x,y,r,g,b} = eachItem;
      items.push(new Item(x, y, r, g, b))
    });
  }).catch(error => {
    console.error('Error:', error);
  });
}

function draw() {
  background(220);
  // Show all items on items list
  items.forEach(item=>{
    item.show();
  });
}

function mousePressed(){

  // Create new item on click x,y position
  const newItem = new Item(mouseX, mouseY, random(255),random(255),random(255))
  // add item to list
  items.push(newItem);

  // Post the new item to server
  postNewItem(newItem).then(responseData => {
    if (responseData) {
      console.log('Item posted successfully:', responseData);
    }
  }).catch(error => {
    console.error('Error:', error);
  });
}

// Function to perform a POST request
async function postNewItem(data) {
  try {
    // Request for posting on server
    const response = await fetch(apiUrlForPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error : Status : ${response.status}`);
    }

    const responseData = await response.json();    
    
    return responseData;

  } catch (error) {
    console.error('Error posting item:', error);
    return null;
  }
}

