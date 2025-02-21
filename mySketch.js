let notifications = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(255, 0, 0, 50);
  
  // Add new notifications over time
  if (frameCount % 30 == 0) {
    notifications.push(new Notification());
  }
  
  // Update and display notifications from bottom to top
  for (let i = notifications.length - 1; i >= 0; i--) {
    notifications[i].update();
    notifications[i].show();
  }
}

class Notification {
  constructor() {
    this.x = random(width);
    this.y = -50;
    this.speed = random(2, 5);
    this.angle = random(-PI / 6, PI / 6);
    this.color = color(random(100, 256), random(100, 256), random(100, 256));
    
  }

  update() {
   
        this.y += this.speed;
        
	}

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(255);
    stroke(127, 0, 255);
    rectMode(CENTER);
    rect(0, 0, windowWidth, 100, 30);
    fill(this.color);
    textSize(16);
    textFont('Helvetica', 30);
    textAlign(CENTER, CENTER);
    text("Look Here!", 0, 0);
    pop();
  }

  offScreen() {
    return this.y > height;
  }
}
