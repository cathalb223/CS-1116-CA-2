let canvas;
let context;

let request;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();
let hitboxstate = false;


let tilesPerRow = 11;
let tileSize = 16;
let mapTileSize = 25;

let backgroundImage = new Image();
let Water = new Image()


let background;

let fence = {
    spriteSize: 16,
    rowNum: 4,
    size: 25,
};

let fenceImage = new Image();
let cows = [];

//second layer where objects on top of the background go
let foreground;


let player = {
    x: 0,
    y: 0,
    width: 14,
    height: 16,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
};

let whip = {
    out: false,
    attached: false
}

let health = 100;
let levelCount = 0;
let captureCount;

let playerImage = new Image();
let cowImage = new Image()

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;


document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    cows = []
    captureCount = 0
    background = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, -1],
    [-1, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];

    foreground = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1, 14, 14,  3, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  4, -1, -1,  4, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8, -1, -1,  8, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    player.x = 420;
    player.y = 60;
    health = 100;
    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    player.xChange = 0;
    player.yChange = 0;

    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 20; c += 1) {
            let tile = background[r][c];
            if (tile === 12 && randint(1,10) === 1) {
                background[r][c] = (6*11) + randint(0,5);
            }

            if (levelCount > 0) {
                if (tile === 12 && !(r < 5 && c > 14) && randint(1,20 - Math.round(levelCount*1.5)) === 1) {
                    foreground[r][c] = 63
                }
            }
        }
    } 
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    // source https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
    context.imageSmoothingEnabled = false;

    load_assets([
        { "var": playerImage, "url": "Character.png" },
        { "var": backgroundImage, "url": "Hills.png" },
        { "var": Water, "url": "Water.png" },
        { "var": fenceImage, "url": "Fences.png" },
        { "var": cowImage, "url": "Cow Sprites.png"}], draw);
}

function draw() {
    request = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Draw background on canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#9BD4C3"; // light sky blue
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 20; c += 1) {
            let tile = background[r][c];
            let forTile = foreground[r][c];

            if (tile >= 0) {

                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);

                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * mapTileSize, r * mapTileSize, mapTileSize, mapTileSize);

                if (hitboxstate === true) {
                    context.fillStyle = "cyan"
                    context.strokeRect(c * mapTileSize, r * mapTileSize, fence.size, fence.size);
                }
            } else {
                context.drawImage(Water,
                    0, 0, tileSize, tileSize,
                    c * mapTileSize, r * mapTileSize, mapTileSize, mapTileSize);
            }

            // drawing objects on top of background
            if (forTile >= 0) {
                let tileRow = Math.floor(forTile / fence.rowNum);
                let tileCol = Math.floor(forTile % fence.rowNum);

                if (hitboxstate === true) {
                    context.fillStyle = "cyan"
                    context.fillRect(c * mapTileSize, r * mapTileSize, fence.size, fence.size);
                }

                if (forTile === 63) {
                    context.drawImage(backgroundImage,
                    8 * tileSize, 6 * tileSize, tileSize, tileSize,
                    c * mapTileSize, r * mapTileSize, mapTileSize, mapTileSize);
                } else {
                    context.drawImage(fenceImage,
                        tileCol * fence.spriteSize, tileRow * fence.spriteSize, fence.spriteSize, fence.spriteSize,
                        c * mapTileSize, r * mapTileSize, fence.size, fence.size);
                }


            }
        }

    }


    // Draw player

    if (hitboxstate === true) {
        context.fillStyle = "purple";
        context.fillRect(player.x, player.y, player.width, player.height);
    }

    if (whip.out) {
        context.fillStyle = "brown";
        context.fillRect((player.x + player.width - 3),(player.y + 8), 5, 5)
    }

    if (health <= 0) {
        finish("You Lose")
    }
    // Heads up display
    
    //level count
    // source: https://www.w3schools.com/graphics/canvas_text.asp
    context.fillStyle = "rgb(196, 154, 108)";
    context.fillRect(0,0,80,22)

    context.fillStyle = "rgb(121, 83, 78)"
    context.font = "20px Pixelify Sans"
    context.fillText("Level "+levelCount, 0,18)

    //health bar
    context.fillStyle = "red";
    context.fillRect(player.x, player.y - 5, player.width, 3)

    context.fillStyle = "green";
    context.fillRect(player.x, player.y - 5,player.width * health/100,3)

    //captured count
    context.fillStyle = "rgb(196, 154, 108)";
    context.fillRect(400,0,100,22)

    context.fillStyle = "rgb(121, 83, 78)"
    context.font = "20px Pixelify Sans"
    context.fillText(captureCount + "/" + cows.length + " Cows", 402,18)


    // the 34 and 32 here are pixel gaps in the spritesheet i am skipping over
    context.drawImage(playerImage,
        player.frameX * (player.width + 34), player.frameY * (player.height + 32), player.width, player.height,
        player.x, player.y, player.width, player.height);

    // Draw cow
    if (cows.length < levelCount+1) {
         let cow = {
            y: randint(25, canvas.height-73),
            x: randint(25, canvas.width-52),
            width: 27,
            height: 18,
            frameX: 0,
            frameY: 0,
            xChange: 0,
            yChange: 0,
            attached: false,
            captured: false,
        }

        cows.push(cow);
    }


    captureCount = 0;
    for (let cow of cows) {

        if (cow.captured) {
            captureCount = captureCount + 1;
            console.log(captureCount)
        } 

        if (captureCount === cows.length) {
            levelCount = levelCount + 1;
            if (levelCount !== 11) {
                finish("Congratulations, you finished the level!");
            } else {
                finish("YOU WIN!");
            }
            
        }

        if (hitboxstate === true) {
        context.fillStyle = "yellow"
        context.fillRect(cow.x, cow.y, cow.width, cow.height);
        }

        if (dist(cow, player) < 50 && (whip.out && !whip.attached && !cow.captured)) {
            
            whip.attached = true;
            cow.attached = true;

        } 

        if (cow.attached) {

            context.beginPath();
            context.moveTo(whip.x, whip.y);
            context.lineTo(cow.x+(cow.width/2),cow.y+(cow.height/2));
            context.strokeStyle = "brown";
            context.lineWidth = 1;
            context.stroke();

            if (cow.x >= player.x) {
                cow.xChange = cow.xChange - 0.4;
            } else {
                cow.xChange = cow.xChange + 0.4;
            }
            if (cow.y >= player.y) {
                cow.yChange = cow.yChange - 0.4;
            } else {
                cow.yChange = cow.yChange + 0.4;
            }
            
            if (dist(cow, player) > 50) {
                cow.attached = false;
                whip.attached = false;
            }

        } else if (!cow.captured){

            if (cow.x > 350 && cow.y < 126) {
                cow.xChange = cow.xChange - 0.4;
                cow.yChange = cow.yChange + 0.4;
            } else {
                cow.xChange = cow.xChange + randint(-2,2);
                cow.yChange = cow.yChange + randint(-2,2);
            }
            
        }

        if (!cow.captured && !cow.attached && is_entity_coliding(cow,player)) {

            health = health - 20

            if (cow.x >= player.x) {
                cow.xChange = cow.xChange + 5;
                player.xChange = player.xChange -5;
            } else {
                cow.xChange = cow.xChange - 5;
                player.xChange = player.xChange +5;
            }
            if (cow.y >= player.y) {
                cow.yChange = cow.yChange + 5;
                player.yChange = player.yChange -5;
            } else {
                cow.yChange = cow.yChange - 5;
                player.yChange = player.yChange +5 ;
            }
        }

        if (cow.x > 350 && cow.y < 99 && cow.attached) {
            cow.x = randint(400,430)
            cow.y = randint(40,100)
            cow.captured = true;
            cow.attached = false;
            whip.attached = false;
            cow.xChange = 0
            cow.yChange = 0
        }

        context.drawImage(cowImage,
        cow.frameX * (cow.width + 5), cow.frameY * (cow.height + 14), cow.width, cow.height,
        cow.x, cow.y, cow.width, cow.height);
        

        cow.x = cow.x + cow.xChange;
        detectForegroundColissions("x",cow);
        cow.y = cow.y + cow.yChange;
        detectForegroundColissions("y",cow);

        cow.xChange = cow.xChange * 0.88;
        cow.yChange = cow.yChange * 0.88;

        edgeCheck(cow);

        if (Math.abs(cow.xChange) > 0.1 || Math.abs(cow.yChange) > 0.1) {
            cow.frameY = 1;
            cow.frameX = (cow.frameX + 1) % 2;
        } else {
            cow.frameY = 0;
            cow.frameX = 0;
        }
    }

    whip.out = false


    // Player movement

    if (moveUp) {
        player.yChange = player.yChange - 0.5;
    }
    if (moveDown) {
        player.yChange = player.yChange + 0.5;
    }

    if (moveRight) {
        player.xChange = player.xChange + 0.5;
    }

    if (moveLeft) {
        player.xChange = player.xChange - 0.5;
    }
    
    //player colissions with foreground objects
    player.y = player.y + player.yChange;
    detectForegroundColissions("y", player);

    player.x = player.x + player.xChange;
    detectForegroundColissions("x", player);

    // friction
    player.xChange = player.xChange * 0.88;
    player.yChange = player.yChange * 0.88;

    //animation
    if (moveRight || moveLeft || moveDown || moveUp) {
        player.frameX = (player.frameX + 1) % 4;
    }

    // Going off edge
    edgeCheck(player);
    

    whip.x = player.x + player.width - 3;
    whip.y = player.y + 8;

}

function activate(event) {
    let key = event.key;
    if (event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown") {
        event.preventDefault();
    }
    if (key === "ArrowLeft") {
        moveLeft = true;
        player.frameY = 2;
    } else if (key === "ArrowUp") {
        moveUp = true;
        player.frameY = 1;
    } else if (key === "ArrowRight") {
        moveRight = true;
        player.frameY = 3;
    } else if (key === "ArrowDown") {
        moveDown = true;
        player.frameY = 0
    }

    if (key === "p") {
        if (hitboxstate === false) {
            hitboxstate = true;
        } else {
            hitboxstate = false;
        }
    }

    if (key === "e") {
        whip.out = true;
    }

    // resetting game after loss
    if (key === "r" && health <= 0) {
        window.removeEventListener("keydown",activate);
        window.cancelAnimationFrame(request);
        health = 100;
        init()
    }

    if (key === "Enter" && captureCount === cows.length) {
        window.removeEventListener("keydown",activate);
        window.cancelAnimationFrame(request);
        health = 100;
        init()
    }

    if (key === "q") {
        health = 1000000000
    }
    if (key === "m") {
        for (let cow of cows) {
            cow.captured = true;
        }
    }
}
function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}
function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    }
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}

function detectForegroundColissions(orientation, object) {
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 20; c += 1) {

            let tile = foreground[r][c];
            if (is_tile_coliding(object, r, c)) {
                if (tile > 0) {
                    if (orientation === "y") {
                        if (object.yChange < 0) {
                            object.y = r * mapTileSize + fence.size + 1;
                        }
                        if (object.yChange > 0) {
                            object.y = r * mapTileSize - object.height - 1;
                        }
                    }
                    if (orientation === "x") {
                        if (object.xChange < 0) {
                            object.x = c * mapTileSize + mapTileSize + 1;
                        }
                        if (object.xChange > 0) {
                            object.x = c * mapTileSize - object.width - 1;
                        }
                    }
                }
            }
        }
    }
}

function is_tile_coliding(object, r, c) {
    
        if ((object.x + object.width >= c * mapTileSize &&
            object.x <= c * mapTileSize + mapTileSize)
            && (object.y + object.height >= r * mapTileSize &&
            object.y <= r * mapTileSize + mapTileSize)) {
                return true;
            } else {
                return false
            }
}

function is_entity_coliding(object1, object2) {
    if (object1.x + object1.width < object2.x ||
        object2.x + object2.width < object1.x ||
        object1.y > object2.y + object2.height ||
        object2.y > object1.y + object1.height) {
            return false;
        } else {
            return true;
        }
}


function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dist(object1,object2) {
    return Math.sqrt((object1.x-object2.x)**2 + (object1.y-object2.y)**2)
}

function edgeCheck(entity) {
    if (entity.x <= 25) {
        entity.x = 25;
    } else if (entity.x + entity.width > canvas.width - 25) {
        entity.x = (canvas.width - 25) - entity.width;
    }

    if (entity.y > canvas.height - 55) {
        entity.y = canvas.height - 55;
    } else if (entity.y < 25) {
        entity.y = 25;
    }

}

function finish(outcome) {
    //upadating the final captured count
    context.fillStyle = "rgb(196, 154, 108)";
    context.fillRect(400,0,100,22)

    context.fillStyle = "rgb(121, 83, 78)"
    context.font = "20px Pixelify Sans"
    context.fillText(captureCount + "/" + cows.length + " Cows", 402,18)

    if (outcome === "You Lose") {

        context.fillStyle = "rgb(121, 83, 78)";
        context.font = "50px Pixelify Sans";
        context.textAlign = "center";
        context.fillText(outcome,(canvas.width/2),(canvas.height/2)-50)
        context.fillText("Press 'r' to retry",(canvas.width/2),(canvas.height/2))

        window.cancelAnimationFrame(request);
        window.removeEventListener("keyup",deactivate);
        
    } else if (outcome === "Congratulations, you finished the level!") {
        context.fillStyle = "rgb(121, 83, 78)";
        context.font = "25px Pixelify Sans";
        context.textAlign = "center";
        context.fillText(outcome,(canvas.width/2),(canvas.height/2))
        context.fillText("Press 'enter' to move on",(canvas.width/2),(canvas.height/2)+25)

        window.cancelAnimationFrame(request);
        window.removeEventListener("keyup",deactivate);

    } else if (outcome === "YOU WIN!") {

        context.fillStyle = "rgb(121, 83, 78)";
        context.font = "50px Pixelify Sans";
        context.textAlign = "center";

        context.fillText(outcome,(canvas.width/2),(canvas.height/2))

        window.cancelAnimationFrame(request);
        window.removeEventListener("keyup",deactivate);
        window.removeEventListener("keydown",activate);
    } 

    context.textAlign = "left";
}