let notifications = [];
let tiltX = 0;
let tiltY = 0;
const TILT_INFLUENCE = 15; // Adjust this to control tilt sensitivity

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Request permission for device orientation if needed
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.addEventListener('click', requestAccess);
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    })
    .catch(console.error);
}

function handleOrientation(event) {
  // Convert orientation data to usable values
  tiltX = map(event.gamma, -90, 90, -1, 1);  // Left/Right tilt
  tiltY = map(event.beta, -90, 90, -1, 1);   // Front/Back tilt
}

function draw() {
  background(255, 0, 0, 50);
  
  // Add new notifications over time
  if (frameCount % 10 == 0) {
    notifications.push(new Notification());
  }
  
  // Update and display notifications
  for (let i = notifications.length - 1; i >= 0; i--) {
    notifications[i].update();
    notifications[i].show();
    
    // Remove notifications that are off screen
    if (notifications[i].offScreen()) {
      notifications.splice(i, 1);
    }
  }
}

class Notification {
  constructor() {
    this.x = random(width);
    this.y = -50;
    this.baseSpeed = random(2, 5);
    this.angle = random(-PI / 6, PI / 6);
    this.color = color(random(100, 256), random(100, 256), random(100, 256));
    this.vx = 0; // Velocity X
    this.vy = 0; // Velocity Y
  }
  
  update() {
    // Apply tilt influence to velocity
    this.vx += tiltX * TILT_INFLUENCE;
    this.vy = this.baseSpeed + (tiltY * TILT_INFLUENCE);
    
    // Add some drag to smooth movement
    this.vx *= 0.95;
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off walls
    if (this.x < 0 || this.x > width) {
      this.vx *= -0.5;
      this.x = constrain(this.x, 0, width);
    }
  }
  
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + (tiltX * 0.5)); // Add tilt influence to rotation
    fill(255);
    rectMode(CENTER);
    rect(0, 0, 200, 60, 10);
    fill(this.color);
    textSize(16);
    textFont('Courier New', 20);
    textAlign(CENTER, CENTER);
    text("Look Here!", 0, 0);
    pop();
  }
  
  offScreen() {
    return this.y > height + 100;
  }
}