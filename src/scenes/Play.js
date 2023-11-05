let gameOptions = {
    spawnRange: [80,300],
    platformSpeedRange:[300,300],
    landSizeRange:[90,300],
    //landSizeRange:[32*5,960/4],
    heightRange:[-5,5],
    platformVerticalLimit: [0.4,0.8], 
    //platformSizeRange: [90, 300],  
    platformHeightScale: 20
}
//Platform plan
//When off screen, wraps back around
//random choice between numbers for height and length.
//
//try like spaceship.
class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        //local;
        //text;
        this.prevDirection;
        this.direction;


        // this.minY = 576;
        // this.maxY = height/1.5
        // this.lastY = 0;
        // this.duration = 0;
        // this.prevDuration = 0;
        
        
    }

    
    preload(){
        this.load.spritesheet('ball', './assets/BallSpriteInspired.png',{frameWidth: 32, frameHeight:32, startFrame:0, endFrame:22});
        //this.load.image('bluesky', './assets/BG_BlueSky.png');
        //tile set at https://opengameart.org/content/tileset-platform-forest
       // this.load.image('tiles', 'assets/tileset1.png');
      // this.load.image('tiles', './assets/Grass_And_Trees.png') ;
       this.load.image('grassup', './assets/GrassBlock.png');
       this.load.image('upleft', './assets/SideGrassLeft.png');
       this.load.image('upright', './assets/SideGrassRight.png');
       this.load.image('sideleft','./assets/GrassBlockSideLeft.png');
        this.load.image('dirtup','./assets/DirtBlock.png');
        this.load.image('sideright', './assets/GrassBlockSideRight.png');
        
        //this.load.spritesheet('platform', './assets/Grass_And_Trees.png',{framewidth: 16, frameHeight: 16, startFrame: 0, endFrame: 12});
    }
    create(){

        //const array = [[1,1,1],[1,1,1],[1,1,1]];
        //const mapped = this.make.tilemap({ data:array, tileWidth: 32, tileHeight:32});
        //mapped.addTilesetImage('tiles');
        //const layer = mapped.createLayer("layer",'tiles',0,0 );
        this.grassed = this.add.image(game.config.width/2, game.config.height/2, "grassup").setScale(1);
        //this.grassedupleft = this.add.image(game.config.width/4, game.config.height/4, "upleft").setScale(2);
       // const map = this.make.tilemap({data:Array, tileWidth: });
        this.SCROLL_SPEED = 40;
        console.log(this.grassed.width);
        //placeholder.  Must change
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //this.BOUNCE_VELOCITY = 350;

        //keys
        //this.sky = this.add.tileSprite(0,0,game.config.width, game.config.height,'bluesky').setOrigin(0);
       //this.sky = this.add.image(width * , game.world.centerY, 'bluesky').anchor.set(0.5); 
        keyF= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      // keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
     
        this.anims.create({
            key: 'bounce regular',
            frames: this.anims.generateFrameNumbers('ball', {start: 0, end: 8, first: 0}),
            frameRate: 22
        });
        this.anims.create({
            key: 'bounce accend',
            frames: this.anims.generateFrameNumbers('ball', {start: 9, end: 14, first: 9}),
            frameRate: 22
        })
        this.bounce = this.physics.add.sprite(width/4, height/1.5, 'ball', 1).setScale(4);
        //this.bounce.setVelocity(0,60);
        
        this.bounce.setOrigin(0.5,0);

        this.lastY = this.bounce.y;
        this.bounce.setMaxVelocity(0,500);
        //this.physics.world.gravity.y = 1000;
        this.bounce.setCollideWorldBounds(true,1,1);
       // this.bounce.setDragY(0);
        
       //Platforms
       //track kept
        this.addedPlatforms = 0;

       this.platformGroup = this.add.group({
        removeCallback: function(platform){
            platform.scene.platformPool.add(platform)
        }
       });
       this.platformPool = this.add.group({
        removeCallback: function(platform){
            platform.scene.platformGroup.add(platform)
        }
       });
       this.physics.add.collider(this.bounce,this.platformGroup);
       this.addPlatforms(game.config.width, game.config.width/2, game.config.height * gameOptions.platformVerticalLimit[1]);

       
        

    }
    addPlatforms(platformWidth, posX, posY){
        this.addedPlatforms++;
        let platform;
        let platformwidthed;
        let platformheighted;
        let newposse = posX;
        let newpapi = posY;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            this.platformPool.remove(platform);
        }
        else{
            
            platform = this.physics.add.sprite(posX, game.config.height*0.8, 'upleft');
            
            for(platformwidthed = platformWidth/platform.displayWidth; platformwidthed > 1;platformwidthed--){
                platform.setImmovable(true);
                platform.setVelocityX(-this.SCROLL_SPEED);
                platform.body.allowGravity = false;
                this.platformGroup.add(platform);
                newpapi = game.config.height*0.8 + platform.displayHeight;
                this.physics.add.collider(this.bounce, platform);
                //this.physics.add.collider(this.bounce, this.platformGroup);
                for(platformheighted = posY - platform.displayHeight; platformheighted != 0; platformheighted--){
                    if(this.platformwidthed == platformWidth/platform.displayWidth){
                        platform = this.physics.add.sprite(posX, newpapi, 'sideleft');
                    }
                    else if (platformwidthed == 2){
                        platform = this.physics.add.sprite(newposse, newpapi, 'sideright');
                    }
                    else{
                        platform = this.physics.add.sprite(newposse, newpapi, 'dirtup');
                    }
                    newpapi += platform.displayHeight;
                    platform.setImmovable(true);
                    platform.setVelocityX(-this.SCROLL_SPEED);
                    platform.body.allowGravity = false;
                    //this.physics.add.collider(this.bounce, this.platformGroup);
                   // this.physcadd.collider(this.bounce, this.platformGroup);
                    this.platformGroup.add(platform);
                }
                newposse += platform.displayWidth;
                platform = this.physics.add.sprite(newposse, game.config.height*0.8, 'grassup');
                //this.physics.add.collider(this.bounce, this.platformGroup);
            }
            //this.physics.add.collider(this.bounce, this.platformGroup);
            



            //this.platformSpeed = this.time.delayedCall(1000, ()=>)

            // platform.body.allowGravity = false;
            // this.platformGroup.add(platform);
        }
        
        //platform.displayWidth = platformWidth;
       // this.

    }

    //     this.addedPlatforms++;
    //     let platform;
    //     if(this.platformPool.getLength()){
    //         platform = this.platformPool.getFirst();
    //         platform.x = posX;
    //         platform.y = posY;
    //         platform.active = true;
    //         platform.visible = true;
    //         this.platformPool.remove(platform);
    //         let newRatio = gameOptions.platformWidth / platform.displayWidth;
    //         platform.displayWidth = platformWidth;
    //         platform.tileScaleX = 1/platform.scaleX;

    //     }
    //     else{
    //         platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
    //         this.physics.add.existing(platform);
    //         platform.body.setImmovable(true);
    //         platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0],gameOptions.platformSpeedRange[1]) *-1);
    //         this.platformGroup.add(platform);

    //     }
    //     this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0],gameOptions.spawnRange[1]);
    //    }
    update(){
        // this.boulder();
        //let bounceVector = new Phaser.Math.Vector2(0,-1);
        //let bounce = this.add.sprite(game.config.width/2, game.config.height/2, 'bounce').setOrigin(0,0);;
        //if(this.bounce.y )
        //this.bounce.setVelocityY(this.BOUNCE_VELOCITY);
       // this.sky.tilePositionX+=this.SCROLL_SPEED;
       //console.log(width);
       //y between 500 and 0
       //width between 960/2 and 32*5
       let minDistance = game.config.width;
       let rightmostPlatformHeight = 0;
       this.platformGroup.getChildren().forEach(function(platform){
           let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
           if(platformDistance < minDistance){
               minDistance = platformDistance;
               rightmostPlatformHeight = platform.y;
           }
           if(platform.x < - platform.displayWidth / 2){
               this.platformGroup.killAndHide(platform);
               this.platformGroup.remove(platform);
           }
       }, this);
        this.bounce.play('bounce regular', true);
        this.factor = 1.5;
        //if()
        //this.downFlag = false;
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            // if(this.bounce.body.velocity < 0){
            //     this.bounce.setVelocity(0,-1*this.bounce.body.velocity*this.factor);
            //     //this.bounce.body.velocity *= -1;
            // }
            //console.log(this.factor);
            
            this.bounce.setVelocity(0,1000);
        }
        //console.log(downFlag);

        if(keyF.isDown && this.bounce.body.velocity.y > 0){
            //console.log("here");
            //this.bounce.setBounceY(2);
           // downFlag = true;

           //this.bounce.setMaxVelocity(0,1000);
           //this.physics.world.gravity.y = 3000;
           //this.bounce.setVelocity(0,this.bounce.body.velocity.y*1.5);
           //this.bounce.setMaxVelocity(0, this.);
        //    if(this.bounce.y == 1000){
        //     //this.bounce.setMaxVelocity(0,1000);
        //    }
        this.bounce.setMaxVelocity(0, 1000);
            
           
        }
        else if(keyF.isDown){
            //this.bounce.setVelocity(0,this.bounce.body.velocity.y *-1.5)
            //this.bounce.setVelocity(0,this.bounce.body.velocity.y*-1.5);
            // this.bounce.setMaxVelocity(0, 1000);
            // //this.bounce.setVelocity(0,this.bounce.body.velocity.y/1.5);
        }
        else{
            //if(downFlag == true){
                //downFlag = false;
                this.bounce.setMaxVelocity(0, 500);
                this.bounce.setOrigin(0.5,0);
            //this.bounce.setVelocity(0,this.bounce.body.velocity.y/1.5);
           // }
        }

        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.landSizeRange[0], gameOptions.landSizeRange[1]);
            let platformRandomHeight = gameOptions.platformHeightScale * Phaser.Math.Between(gameOptions.heightRange[0], gameOptions.heightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatforms(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
        // if(keyF.isdown){
        //     this.downFlag = true;
        //     this.bounce.setMaxVelocity(0,1000);
        // }
        // else{
        //     if(this.downFlag){
        //         this.downFlag = false;
        //         //this.bounce.setVelocity(0,500);
        //         //this.physics.world.gravity.y = 1000;
        //         //this.bounce.setMaxVelocity(0,500);
        //     }
        //     else{
        //         this.bounce.setMaxVelocity(0,500);
        //         //this.bounce.setMaxVelocity(0,500);
        //     }
        
        // }
        //console.log(this.bounce.body.velocity);
       // console.log(this.bounce.body.acceleration);
        // else{
        //     this.bounce.setMaxVelocity(0,500);
        //     //this.bounce.setVelocity(0,500);
        // }
        // else{
        //     this.bounce.setMaxVelocity(0,500);
        // }
        //this.bounce.setBounceY(1);
        // else{
        // if(this.bounce.y == height/1.5){
        // this.bounce.setBounceY(1);
        // }
        //this.bounce.setBounce(0);
        // if(Phaser.Math.Fuzzy.LessThan(this.bounce.body.velocity.y, 0, 0.1)){
        //     this.direction = "up";
        // }
        // else{
        //     this.direction = "down";
        // }

        // if(this.prevDirection != this.direction && this.prevDirection == "up"){
        //     const marker = this.add.sprite(0, this.bounce.y + 18, "marker");

        //     marker.setOrigin(0,1);
        //     this.lastY = this.bounce.y;
        //     this.prevDuration = this.duration;
        //     this.duration = 0;
        // }

        // this.prevDirection = this.direction;
        // this.duration += delta;

        // this.minY = Math.min(this.minY, this.bounce.y);
        // this.maxY = Math.max(this.minY, this.maxY, this.lastY);

        // console.log(this.bounce.y);
        //this.bounce.play('bounce accend');
        //bounceVector.normalize();
        //this.bounce.setVelocity(bounceVector.x, this.BOUNCE_VELOCITY *bounceVector.y);
        
        


    }
    boulder(){

    //bounce = 

    }
}