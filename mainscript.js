
class CharacterMenu extends Phaser.Scene
{
    BDM=1;
    CritD=1.7;
    LStrike=0.1;
    Defense=0.2;
    Evasion=0.08;
    PhysicalP=1;
    MagicalP=1;
    fire = 1;
    ice = 1;
    thunder = 1;
    earth = 1;
    fireResistance = 1;
    iceResistance = 1;
    thunderResistance = 1;
    earthResistance = 1;
    Speed = 100;
    Luck = 0.04;
    outputdamage = [];
    Crittrigger = false;
    HP = 500;
    DefaultHP = 500;
    DefaultBDM = 1;
    potentie = ['physical', 'magical'];
    element = ['fire', 'ice', 'thunder', 'earth'];
    Attacktwice = false;

  constructor() {
    super('Main'); // Scene key
  }



    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('charactersheet', './Default_character_sheet_for_rpg_game_3.jpg');



    }


    random(num){

        return Math.round(Math.random() * num);

    }



    create ()
    {

      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(1600, 500, 'charactersheet');


      let title = this.add.text(100, 60, `Character stat`, { font: '25px Arial', fill: '#ffffff' });
        
      characterparams.ratioTxt = this.add.text(1400, 60, `Wins ${battleparams.nbwin}, Loses ${battleparams.nblose}`, { font: '26px Arial', fill: '#ffffff' });
  
        
      let stat1 = this.add.text(100, 100, `BaseDamageMultiplier: ${characterparams.DefaultBDM}`, { font: '16px Arial', fill: '#ffffff' });
      let stat2 = this.add.text(100, 140, `CritDamage: ${characterparams.CritD} (10% fixed rate occurence)`, { font: '16px Arial', fill: '#ffffff' });
      let stat3 = this.add.text(100, 180, `Luckystrike: ${characterparams.LStrike} (50% extra damage fixed %damage, Max value: 100%)`, { font: '16px Arial', fill: '#ffffff' });
      let stat4 = this.add.text(100, 220, `Defense: ${characterparams.Defense} (damage reduction, Max value: 80%)`, { font: '16px Arial', fill: '#ffffff' });
      let stat6 = this.add.text(100, 260, `Evade: ${characterparams.Evasion} (Full damage reduction, , Max value: 33%)`, { font: '16px Arial', fill: '#ffffff' });
      let stat7 = this.add.text(100, 340, `Physical potencie: ${characterparams.PhysicalP} (Provide damage and defense against Physical type foes)`, { font: '16px Arial', fill: '#ffffff' });
      let stat8 = this.add.text(100, 380, `Magical potencie: ${characterparams.MagicalP} (Provide damage and defense against Magical type foes)`, { font: '16px Arial', fill: '#ffffff' });
      let stat9 = this.add.text(100, 420, `Fire potencie: ${characterparams.fire} (deal double extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat10 = this.add.text(100, 460, `Ice potencie: ${characterparams.ice} ( deal double extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat11 = this.add.text(100, 500, `Thunder potencie: ${characterparams.thunder} ( deal double extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat12 = this.add.text(100, 540, `Earth potencie: ${characterparams.earth} ( deal double extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat13 = this.add.text(100, 580, `Speed: ${characterparams.Speed} (Opportunity to strike again: , Max value: 125)`, { font: '16px Arial', fill: '#ffffff' });
      let stat14 = this.add.text(100, 620, `Luck: ${characterparams.Luck} (Remove 10% of the current enemy HP, Max value: 25%)`, { font: '16px Arial', fill: '#ffffff' });
      
      let inventory = this.add.text(100, 700, `Open Inventory`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      inventory.on('pointerdown', () => (this.scene.stop().start('Inventory')));

      let battlestart = this.add.text(100, 740, `Start Battle`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      battlestart.on('pointerdown', () => this.scene.stop().start('Battle'));

      let randomweapon = new Weapon(`old sword lvl ${battleparams.levelstacker}`, 10 * battleparams.levelstacker, Math.min(5*battleparams.levelstacker,30), 1.25*battleparams.levelstacker, 1, characterparams.potentie[this.random(1)], characterparams.element[this.random(3)]);

      inventoryparams.weaponset.length<15? inventoryparams.weaponset.push(randomweapon) : (inventoryparams.weaponset=[],inventoryparams.weaponset.push(randomweapon));

      console.log(inventoryparams.weaponset);

      characterparams.actualstyle = this.add.text(950, 50, `Actual style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let standardstyle = this.add.text(1100, 200, `Click to switch to standard style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      standardstyle.on('pointerdown', () => (this.handlestyle(0)));

      let barehandstyle = this.add.text(1100, 400, `Click to switch to barehandstyle style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let barehandstyletext = this.add.text(1100, 440, `More speed, more opportunity to perform ability`, { font: '16px Arial', fill: '#000000' });

      barehandstyle.on('pointerdown', () => (this.handlestyle(1)));

      let doublestyle = this.add.text(1100, 700, `Click to switch to doublesword style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let doublestyletext = this.add.text(1100, 740, `Bear two elemental potencies to the battle`, { font: '16px Arial', fill: '#000000' });

      doublestyle.on('pointerdown', () => (this.handlestyle(2)));


    }

    handlestyle(index){

        console.log(index);

        battleparams.choosedstyle = index;

        switch (index) {
          case 0: {

            inventoryparams.equippedweapon[1] = undefined;

          }
            
            break;

            case 1: {

              inventoryparams.equippedweapon[0] = undefined;
              inventoryparams.equippedweapon[1] = undefined;
  
            }
              
              break;

              case 2: {

       
    
              }
                
                break;
        
          default:
            break;
        }

    }


    update () 
    {
      characterparams.actualstyle.setText(`Actual style: ${battleparams.styles[battleparams.choosedstyle].name}`);
 
    }



    }


const characterparams = new CharacterMenu();



class Battlescene extends Phaser.Scene
{
  turn=0;
  enemy=[];
  battleover=false;
  reward = false;
  doitonce = true;
  eventslog = [];
  levelstacker = 1;
  rollitonce = [true,true,true,true, true, true, true, true, true];
  potentie = ['physical', 'magical'];
  element = ['fire', 'ice', 'thunder', 'earth'];
  nbwin = 0;
  nblose = 0;
  countitonce = true;
  powerstacker = 1;
  playitonce = true;
  handleonce = [true, true];
  updateitonce = true;
  waituntilidle = true;
  sequence = [];
  damageturnlog = [];

  styles = [
  {name:'standard style', speedbonus: 0, equiped1weapon:true, equiped2weapon:false, nesteddouble: false},
   {name:'barehands style', speedbonus: 25, equiped1weapon:false, equiped2weapon:false, nesteddouble: true},
    {name:'doublesword style', speedbonus: -100, equiped1weapon:true, equiped2weapon:true, nesteddouble: false},

  ];

  choosedstyle=0;
    
 

  constructor() {
    super('Battle'); // Scene key
  }
     


    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('Battletheme', './Default_two_knights_fighting_in_a_style_of_rpg_game_2d_style_3.jpg');

        this.load.image('prisonfont', './Prison arena.png');
    
        this.load.spritesheet('playerattack', './main-attack.png', { frameWidth: 354.5, frameHeight: 288.5 });

        this.load.spritesheet('playeridle', './main-idle.png', { frameWidth: 154, frameHeight: 152 });

        this.load.spritesheet('playergethit', './main-gethit.png', { frameWidth: 184.5, frameHeight: 149.5 });

        this.load.spritesheet('playerdeath', './main-death.png', { frameWidth: 214.5, frameHeight: 164 });

        this.load.spritesheet('playerattack2', './main-attack2.png', { frameWidth: 382.5, frameHeight: 279 });

        this.load.spritesheet('playerdefense', './main-defense.png', { frameWidth: 156, frameHeight: 155 });

        this.load.spritesheet('enemyattack', './enemy-attack.png', { frameWidth: 560, frameHeight: 377 });

        this.load.spritesheet('enemyidle', './enemy-idle.png', { frameWidth: 305, frameHeight: 250 });

        this.load.spritesheet('enemydeath', './enemy-death.png', { frameWidth: 456, frameHeight: 400 });

        this.load.spritesheet('enemygethit', './enemy-gethit.png', { frameWidth: 304, frameHeight: 272 });


        this.load.spritesheet('fireeffect', './Fire-wall.png', { frameWidth: 72, frameHeight: 72 });

        this.load.spritesheet('thundereffect', './Lightning-bolt.png', { frameWidth: 72, frameHeight: 72 });

        this.load.spritesheet('iceeffect', './Black-hole.png', { frameWidth: 72, frameHeight: 72 });

        this.load.spritesheet('eartheffect', './Spikes.png', { frameWidth: 72, frameHeight: 72 });

    }


    random(num){

        return Math.round(Math.random() * num);

    }




    createUI(){

      // this.sprites = this.physics.add.group({ immovable: false });

      // let sprite = this.sprites.create(850, 450, 'prisonfont').setScale(0.4);

      let title = this.add.text(100, 60, `Battle lvl ${battleparams.levelstacker}`, { font: '60px Arial', fill: '#ffffff' });

      battleparams.ratioTxt = this.add.text(1400, 60, `Wins ${battleparams.nbwin}, Loses ${battleparams.nblose}`, { font: '26px Arial', fill: '#ffffff' });
  
      const enemy = new Enemy(undefined,20*battleparams.levelstacker, battleparams.element[this.random(3)], battleparams.element[this.random(3)], 500*battleparams.powerstacker, 1*(battleparams.powerstacker),[],battleparams.levelstacker,90, battleparams.potentie[this.random(1)],1*(battleparams.powerstacker));

      battleparams.enemy.push(enemy);

      console.log(battleparams.enemy[battleparams.enemy.length-1]);

      let enemyannouce = this.add.text(1100, 100, `An enemy is coming: Weakness: ${battleparams.enemy[battleparams.enemy.length-1].element} & Strenght: ${battleparams.enemy[battleparams.enemy.length-1].element2} & Type: ${battleparams.enemy[battleparams.enemy.length-1].potencie}`, { font: '16px Arial', fill: '#ffffff' });

      battleparams.attackbutton = this.add.text(100, 300, `Click me to attack`, { font: '32px Arial', fill: '#ffffff' }).setInteractive();

      battleparams.damagedoneTxt = this.add.text(100, 180, `${characterparams.outputdamage[battleparams.turn-1]}`, { font: '32px Arial', fill: 'green' });

      battleparams.damagereceivedTxt = this.add.text(100, 220, ` ${battleparams.enemy[battleparams.enemy.length-1].outputdamage[battleparams.turn-1] }`, { font: '32px Arial', fill: 'red' });

      battleparams.turnTxt = this.add.text(100, 160, `Actual Turn : ${battleparams.turn}`, { font: '40px Arial', fill: '#ffffff' });

      battleparams.HHPTxt = this.add.text(100, 300, `You HP : ${characterparams.HP}`, { font: '32px Arial', fill: '#ffffff' });
      
      battleparams.HPTxt = this.add.text(100, 340, `Ennemy HP : ${battleparams.enemy[battleparams.enemy.length-1].HP}`, { font: '32px Arial', fill: '#ffffff' });
      

    }

    createAnimation(){

      this.anims.create({
        key: 'player-attack',
        frames: this.anims.generateFrameNumbers('playerattack'),

        frameRate: 22,
        // repeat: -1
         });


         battleparams.playerSprite = this.add.sprite(250, 650, 'playeridle').setScale(2);


         this.anims.create({
          key: 'player-idle',
          frames: this.anims.generateFrameNumbers('playeridle'),
  
          frameRate: 10,
          repeat: -1
           });
  
  
           this.anims.create({
            key: 'player-gethit',
            frames: this.anims.generateFrameNumbers('playergethit'),
    
            frameRate: 18,
            // repeat: -1
             });
    
    
             this.anims.create({
              key: 'player-death',
              frames: this.anims.generateFrameNumbers('playerdeath'),
      
              frameRate: 22,
              // repeat: -1
               });
      
               this.anims.create({
                key: 'player-attack2',
                frames: this.anims.generateFrameNumbers('playerattack2'),
        
                frameRate: 22,
                // repeat: -1
                 });
        
        
                 this.anims.create({
                  key: 'player-defense',
                  frames: this.anims.generateFrameNumbers('playerdefense'),
          
                  frameRate: 14,
                  // repeat: -1
                   });


                   this.anims.create({
                    key: 'enemy-attack',
                    frames: this.anims.generateFrameNumbers('enemyattack'),
            
                    frameRate: 23,
                    // repeat: -1
                     });
            
            
                     battleparams.enemySprite = this.add.sprite(1400, 650, 'enemyidle').setScale(1);

  
                     this.anims.create({
                      key: 'enemy-idle',
                      frames: this.anims.generateFrameNumbers('enemyidle'),
              
                      frameRate: 9,
                      repeat: -1
                       });

              
                       this.anims.create({
                        key: 'enemy-gethit',
                        frames: this.anims.generateFrameNumbers('enemygethit'),
                
                        frameRate: 14,
                        // repeat: -1
                         });
                
                
                         this.anims.create({
                          key: 'enemy-death',
                          frames: this.anims.generateFrameNumbers('enemydeath'),
                  
                          frameRate: 28,
                          // repeat: -1
                           });

                           this.anims.create({
                            key: 'fx-fire',
                            frames: this.anims.generateFrameNumbers('fireeffect'),
                    
                            frameRate: 10,
                            // repeat: -1
                             });

                            

                             this.anims.create({
                              key: 'fx-ice',
                              frames: this.anims.generateFrameNumbers('iceeffect'),
                      
                              frameRate: 19,
                              // repeat: -1
                               });

                        

                               this.anims.create({
                                key: 'fx-thunder',
                                frames: this.anims.generateFrameNumbers('thundereffect'),
                        
                                frameRate: 8,
                                // repeat: -1
                                 });

                       

                                 this.anims.create({
                                  key: 'fx-earth',
                                  frames: this.anims.generateFrameNumbers('eartheffect'),
                          
                                  frameRate: 10,
                                  // repeat: -1
                                   });

                        
                  
                     

    }

    playanymovableanimation(sprite, animationname, source){



               battleparams[sprite].play({ key: animationname, repeat: 0 });


                if (source == 'player') {

              this.tweens.add({
                targets: battleparams[sprite],
                x: 1300,
                duration: 700,
                ease: 'Linear'
            });
      
              setTimeout(() => {
      
                this.tweens.add({
                  targets: battleparams[sprite],
                  x: 250,
                  duration: 700,
                  ease: 'Linear'
              });
      
              },1100)


            } else {

              this.tweens.add({
                targets: battleparams[sprite],
                x: 500,
                duration: 700,
                ease: 'Linear'
            });
      
              setTimeout(() => {
      
                this.tweens.add({
                  targets: battleparams[sprite],
                  x: 1500,
                  duration: 700,
                  ease: 'Linear'
              });
      
              },1100)



            }



    }


    playanyanimation(sprite, animationname, source){


      battleparams[sprite].play({ key: animationname });


    }


    remaindle(){

        this.playanyanimation('playerSprite','player-idle','player');

        this.playanyanimation('enemySprite','enemy-idle','enemy');

        battleparams.waituntilidle = true;

    }

    playoneenemyattack(){

      this.playanymovableanimation('enemySprite','enemy-attack','enemy'); 

       setTimeout(() => {this.playanyanimation('playerSprite','player-gethit','player');}, 700);

       console.log(characterparams.Attacktwice);

       setTimeout(() => {

        this.remaindle();
        battleparams.sequence = [];

       console.log(battleparams.sequence);
       
  


      }, 700*2);
      
    

    }


    playmagic(magic,key, caster){

      console.log(characterparams.playerSprite);

      console.log(this.scene);

      console.log('magic:eartheffect,key:fx-earth');


      if (caster == 'player'){

        let newfx = new Fx(this.scene, magic, 400, 600, magic, 5);

        newfx.spritegen();
      

      setTimeout(() => {newfx.fxname.play({ key: key, repeat: 0 }),       
      
      this.tweens.add({
        targets: newfx.fxname,
        x: 1600,
        y:600,
        duration: 700,
        ease: 'Linear'
          })

        }, 700)

        setTimeout(() => {
        
        this.playanyanimation('enemySprite','enemy-gethit','enemy');
      
        newfx.fxname.destroy();
  
          }, 700*2 )


        } else {

          let newfx = new Fx(this.scene, magic, 1400, 600, magic, 5);

          newfx.spritegen();
    
          setTimeout(() => {newfx.fxname.play({ key: key, repeat: 0 }),       
      
          this.tweens.add({
            targets: newfx.fxname,
            x: 400,
            y:600,
            duration: 700,
            ease: 'Linear'
              })
    
            }, 700)
    
            setTimeout(() => {
            
            this.playanyanimation('playerSprite','player-gethit','player');
          
            newfx.fxname.destroy();
    
       
              }, 700*2 )

        }


        }


        handlesequenceanimation(){


          battleparams.sequence.forEach((element, index) => {

            const hyphenIndex = element.indexOf('-');

            const formatedelement = element.substring(0, hyphenIndex);

            const afterHyphen = element.substring(hyphenIndex + 1);

            const action = afterHyphen.slice(0, 6);

            const fxcaster = element.slice(element.indexOf('!') + 1);

            const elementalkeyword = element.slice(0, element.indexOf('!')).slice(element.indexOf('-') + 1);

       
            setTimeout(() => {

            if(action == 'attack'){

                this.playanymovableanimation(`${formatedelement}Sprite`, element, formatedelement);

                let copie = battleparams.damageturnlog.map(e => {
                  
                  if(e>1000000){return `${Math.round(e/1000000)}M`} else {return  Math.round(e)};
                  
                });

                battleparams.damagedoneTxt.setText(copie.join('/'));


            } else if(formatedelement == 'fx'){

              let key = `fx-${elementalkeyword}`;

              let magic = `${elementalkeyword}effect`;

              console.log(key,magic);

              this.playmagic(magic,key,fxcaster);


            } else {


              this.playanyanimation(`${formatedelement}Sprite`, element, formatedelement);

            }


          }, 700*(1+index))


          setTimeout(() => {

          this.playoneenemyattack();

          console.log(battleparams.sequence);

          battleparams.damageturnlog=[];

           
          }, 700*(1+battleparams.sequence.length))




          })

       

        }



    create ()
    {
      this.add.sprite(900, 450, 'prisonfont').setScale(0.4);

        this.createAnimation();

        this.createUI();

        this.remaindle();

        // battleparams.firesprite = this.add.sprite(battleparams.playerSprite.x-20, battleparams.playerSprite.y-290, 'fireeffect').setScale(5);


      console.log(battleparams.enemy[battleparams.enemy.length-1]);

        this.events.on('CritChecker', () =>  {

          if (battleparams.rollitonce[0] ==true) {

          if((inventoryparams.equippedweapon[0] == undefined)||(inventoryparams.equippedweapon[0].length == 0)) {

            let random = this.random(100);

            random<10? (battleparams.sequence.push('player-attack','enemy-gethit'), console.log(battleparams.sequence), characterparams.Crittrigger = true,characterparams.BDM = characterparams.BDM*characterparams.CritD, battleparams.eventslog.push(`Turn ${battleparams.turn}: Critical strike!`)) : characterparams.BDM = characterparams.BDM ;
          
          
          } else {
            
            let random = this.random(100);

            random<(10+inventoryparams.equippedweapon[0].crit)? (battleparams.sequence.push('player-attack','enemy-gethit'), console.log(battleparams.sequence), characterparams.Crittrigger = true,characterparams.BDM = characterparams.BDM*(characterparams.CritD*inventoryparams.equippedweapon[0].critDamage), battleparams.eventslog.push(`Turn ${battleparams.turn}: Critical strike!`)) : characterparams.BDM = characterparams.BDM ;
          
            console.log(characterparams.CritD);

          }

    
          battleparams.rollitonce[0]=false;

          }

        })

        this.events.on('LuckystrikeChecker', () => {

          if (battleparams.rollitonce[1] ==true) {

          let random = this.random(100)/100;

          random<characterparams.LStrike? characterparams.BDM = characterparams.BDM*1.5 : characterparams.BDM = characterparams.BDM;

          battleparams.rollitonce[1]=false;

          }

        })

        this.events.on('ElementChecker', () => {

          if (battleparams.rollitonce[5] ==true) {

          if((inventoryparams.equippedweapon[0] == undefined)||(inventoryparams.equippedweapon[0].length == 0)) {

            let elementmultiplier = characterparams.fire*0.05+characterparams.ice*0.05+characterparams.thunder*0.05+characterparams.earth*0.05;

            characterparams.BDM=characterparams.BDM*(1+elementmultiplier);
          
            console.log(battleparams.sequence);

          }
          
          
          else {

          let El = inventoryparams.equippedweapon[0].element;

          let El2 = inventoryparams.equippedweapon[1]?.element;
          
          battleparams.sequence.push(`fx-${El}!player`);

          if(battleparams.styles[battleparams.choosedstyle].equiped2weapon == true) {battleparams.sequence.push(`fx-${El2}!player`);};

            if ((inventoryparams.equippedweapon[0].element == battleparams.enemy[battleparams.enemy.length-1].element)|| 
               (inventoryparams.equippedweapon[1]?.element == battleparams.enemy[battleparams.enemy.length-1].element))
            
            {
              
              inventoryparams.equippedweapon[1]?.element? characterparams.BDM=characterparams.BDM*(characterparams[El2]+1) : characterparams.BDM=characterparams.BDM*(characterparams[El]+1);

              console.log(`elem damage:${characterparams.BDM}`);
            
            } else {
              
              let elementmultiplier = characterparams.fire*0.05+characterparams.ice*0.05+characterparams.thunder*0.05+characterparams.earth*0.05;

              characterparams.BDM=characterparams.BDM*(1+elementmultiplier);           
            
            }

          } ;

          battleparams.rollitonce[5] = false;
        }

        })


        this.events.on('TypeChecker', () => {

          if (battleparams.rollitonce[6] ==true) {

          if((inventoryparams.equippedweapon[0] == undefined)||(inventoryparams.equippedweapon[0].length == 0)) {

            characterparams.BDM=characterparams.BDM;

          }
          
          
          else {

          let enemyType = battleparams.enemy[battleparams.enemy.length-1].potencie;

          let El = inventoryparams.equippedweapon[0].potentie;

          let El2 = inventoryparams.equippedweapon[1]?.potentie;

              if((enemyType == El)||(enemyType == El2)){

                characterparams.BDM = characterparams.BDM*1.5;

                battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM*0.5;

              } else {};
   
          } ;

          battleparams.rollitonce[6] = false;

        }


        })



        this.events.on('EvadeChecker', () => {

          if (battleparams.rollitonce[2] ==true) {

          let random = this.random(100)/100;

          random<characterparams.Evasion ? (battleparams.sequence.push('player-defense'), console.log(battleparams.sequence) , battleparams.enemy[battleparams.enemy.length-1].BDM = 0.001, battleparams.eventslog.push(`Turn ${battleparams.turn}: You evade enemy attack!`)) : battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM;

          battleparams.rollitonce[2]=false;


          }

        })

        this.events.on('DamageMitigation', () => {

          if (battleparams.rollitonce[7] ==true) {

          let El = battleparams.enemy[battleparams.enemy.length-1].element;

          // console.log(battleparams.enemy[battleparams.enemy.length-1].BDM, characterparams[El]);

          battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM*characterparams[El]*(1-characterparams.Defense);

          // console.log(battleparams.enemy[battleparams.enemy.length-1].BDM);

          battleparams.rollitonce[7] = false;

          }

        })


        this.events.on('ElementalExposure', () => {

          if (battleparams.rollitonce[8] ==true) {

            console.log(battleparams.sequence);

            let ennemystrenght = battleparams.enemy[battleparams.enemy.length-1].element2;

            // battleparams.sequence.push(`fx-${ennemystrenght}!enemy`);

            // console.log(ennemystrenght);

            let playerexposition = characterparams[`${ennemystrenght}Resistance`]

            battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM*playerexposition;

            battleparams.rollitonce[8] = false;

          }

        })

        this.events.on('LuckChecker', () => {

          if (battleparams.rollitonce[3] ==true) {

          let random = this.random(100)/100;

          // console.log(random, characterparams.Luck , random< characterparams.Luck);

          if (random<characterparams.Luck)  {let perfectstrike = battleparams.enemy[battleparams.enemy.length-1].HP*0.10 ;battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP*0.9;
            
            battleparams.eventslog.push(`Turn ${battleparams.turn}: Luck! You made a perfect strike dealing ${perfectstrike} damages`);
          
            battleparams.sequence.push('player-attack','enemy-gethit');

            battleparams.damageturnlog.push(perfectstrike);
          
          };

            console.log(battleparams.sequence);

          battleparams.rollitonce[3] = false;

        } 


        })


        this.events.on('SpeedChecker', () => {

          if (battleparams.rollitonce[4] ==true) {

            //enemy strike after every player action

            let ennemystrenght = battleparams.enemy[battleparams.enemy.length-1].element2;

            battleparams.sequence.push(`fx-${ennemystrenght}!enemy`);

             //enemy strike after every player action

            let bonus = battleparams.styles[battleparams.choosedstyle].speedbonus;

            console.log(bonus);

            let delta = characterparams.Speed - battleparams.enemy[battleparams.enemy.length-1].speed+bonus;

            let random = this.random(100)/100;
  
            if (random<delta/100)  {battleparams.enemy[battleparams.enemy.length-1].BDM = 0.0001;
            
              battleparams.eventslog.push(`Turn ${battleparams.turn}: You attack twice!`)

              characterparams.Attacktwice = true;

            };

            console.log(`double: ${random}`);
  
            battleparams.rollitonce[4] = false;
  
          } 


        })

      

        this.events.on('BattleStatus', () =>  {

          if(battleparams.countitonce == true) {

          if (characterparams.HP<0)  {this.playanyanimation('playerSprite','player-death','player'), battleparams.waituntilidle = false, battleparams.battleover = true, console.log(battleparams.sequence.length), battleparams.nblose=battleparams.nblose+1, setTimeout(() => this.scene.stop().start('Reward'),12000)};

          if (battleparams.enemy[battleparams.enemy.length-1].HP<0)  {this.playanyanimation('enemySprite','enemy-death','enemy'),battleparams.battleover = true, battleparams.waituntilidle = false,battleparams.battleover = true, battleparams.nbwin=battleparams.nbwin+1, (setTimeout(() => this.scene.stop().start('Reward'),12000))};

          battleparams.countitonce = false;

        }

        })


      this.events.on('Handleequippedweapon', () =>  {

        if(battleparams.handleonce[0] == true) {

        if(inventoryparams.equippedweapon[0] == undefined) {characterparams.outputdamage.push(characterparams.BDM*inventoryparams.weaponset[0].attack);} 

        else { characterparams.outputdamage.push(characterparams.BDM*inventoryparams.equippedweapon[0].attack);}

        battleparams.enemy[battleparams.enemy.length-1].outputdamage.push(battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack);
    
        // console.log(characterparams.Crittrigger);

        characterparams.HP = characterparams.HP - battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack;

        
        if(inventoryparams.equippedweapon[0] == undefined) {

          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.weaponset[0].attack;

          battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack)} damages. You received ${Math.round(battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack)} damages.`)

          battleparams.damageturnlog.push(Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack));

          // console.log(battleparams.eventslog);

        } else {

          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.equippedweapon[0].attack;

        battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*inventoryparams.equippedweapon[0].attack)} damages. You received ${Math.round(battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack)} damages.`)

        battleparams.damageturnlog.push(Math.round(characterparams.BDM*inventoryparams.equippedweapon[0].attack));

        // console.log(battleparams.eventslog);

      };

      battleparams.handleonce[0] = false;

     }


      })


      this.events.on('double', () => {

        if(battleparams.handleonce[1] == true) {

        if(inventoryparams.equippedweapon[0] == undefined) {characterparams.outputdamage.push(characterparams.BDM*inventoryparams.weaponset[0].attack);} 

        else { characterparams.outputdamage.push(characterparams.BDM*inventoryparams.equippedweapon[0].attack);}
  
  
        if(inventoryparams.equippedweapon[0] == undefined) {
  
          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.weaponset[0].attack;
  
          battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack)} damages from your second attack.`)
  
          battleparams.damageturnlog.push(Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack));

          battleparams.sequence.push('player-attack', 'enemy-gethit');

          // console.log(battleparams.eventslog);
  
        } else {
  
          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.equippedweapon[0].attack;
  
        battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*inventoryparams.equippedweapon[0].attack)} damages from your second attack.`)
  
        battleparams.damageturnlog.push(Math.round(characterparams.BDM*inventoryparams.equippedweapon[0].attack));

        battleparams.sequence.push('player-attack', 'enemy-gethit');

        // console.log(battleparams.eventslog);
  
      };

    }

      battleparams.handleonce[1] = false;

      })

      

      this.events.on('PlayerAttack', () =>  {

       // console.log(battleparams.battleover );

        // console.log(battleparams.rollitonce);

        if(battleparams.waituntilidle == true){
      
          if (battleparams.playitonce == true){
  
          if (battleparams.battleover == false) {

            battleparams.sequence = [];
  
          characterparams.Crittrigger = false;
  
          console.log(characterparams.BDM, battleparams.enemy[battleparams.enemy.length-1].BDM)
  
          characterparams.BDM = characterparams.DefaultBDM;
  
          this.events.emit('CritChecker');
  
          this.events.emit('LuckystrikeChecker');
  
          this.events.emit('ElementChecker');
  
          this.events.emit('LuckChecker');
  
          this.events.emit('DamageMitigation');
  
          this.events.emit('ElementalExposure');
  
          this.events.emit('TypeChecker');
  
          this.events.emit('EvadeChecker');
  
          this.events.emit('SpeedChecker');
  
            // console.log(inventoryparams.weaponset[0]);
  
          this.events.emit('Handleequippedweapon');
  
            if(characterparams.Crittrigger == false){
  
              battleparams.sequence.push('player-attack2','enemy-gethit');
              console.log(battleparams.sequence);
            };
  
            characterparams.Crittrigger = false;
  
            if(characterparams.Attacktwice == false){
  
              this.handlesequenceanimation();
           
            } 
  
          characterparams.BDM = characterparams.DefaultBDM;
  
          battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].defaultBDM;
  

       
          if(characterparams.Attacktwice == true){

  
            characterparams.Crittrigger = false;
  
            characterparams.BDM = characterparams.DefaultBDM;
  
            battleparams.rollitonce = [true,true,false,true, false, true, false, false];
  
          this.events.emit('CritChecker');
  
          this.events.emit('LuckystrikeChecker');
  
          this.events.emit('ElementChecker');
  
          this.events.emit('LuckChecker');

          battleparams.handleonce[1] = true;
  
         this.events.emit('double');

         characterparams.Attacktwice = false;

               if (battleparams.styles[battleparams.choosedstyle].nesteddouble == true) {

         battleparams.handleonce[4] = true;

         this.events.emit('SpeedChecker');
 
         battleparams.handleonce[1] = true;
 
        this.events.emit('double');

        characterparams.Attacktwice = false;

        battleparams.handleonce[4] = true;

        this.events.emit('SpeedChecker');

        battleparams.handleonce[1] = true;

       this.events.emit('double');


                 }
      

          console.log(battleparams.sequence);
  
          characterparams.Crittrigger = false;
  
          this.handlesequenceanimation();

            battleparams.sequence = [];

  
          }
  
          battleparams.turn = battleparams.turn+1;
     
          this.events.emit('BattleStatus');
  
        } else {this.events.emit('GameOver')}
  
        battleparams.playitonce = false;
  
      }
  
        }
  
        battleparams.waituntilidle = false;
  
    
             });

    


      if (battleparams.doitonce == true) {

      battleparams.attackbutton.on('pointerdown', () => {this.events.emit('PlayerAttack')});

      battleparams.doitonce = false;

    };




    this.input.on('pointerdown', () => {


      battleparams.doitonce = true;

      battleparams.rollitonce = [true,true,true,true, true, true, true, true, true];

      battleparams.countitonce = true;

      battleparams.playitonce = true;

      battleparams.handleonce = [true, true];

      battleparams.updateitonce = true;

 
    });

    this.events.on('GameOver', () => {

      this.add.text(700, 50, `Battle over, please wait few sec`, { font: '30px Arial', fill: '#ffffff', marginLeft: '40 vw' });
            

    })
   

    }


    update () 
    {
      battleparams.damagedoneTxt.setX(battleparams.enemySprite.x);

      battleparams.damagedoneTxt.setY(battleparams.enemySprite.y);

      battleparams.damagereceivedTxt.setX(battleparams.playerSprite.x);

      battleparams.damagereceivedTxt.setY(battleparams.playerSprite.y);

      battleparams.HHPTxt.setX(battleparams.playerSprite.x-100);

      battleparams.HHPTxt.setY(battleparams.playerSprite.y-100);

      battleparams.HPTxt.setX(battleparams.enemySprite.x-100);

      battleparams.HPTxt.setY(battleparams.enemySprite.y-100);


      // if(battleparams.updateitonce == true) {

      // battleparams.eventslog.forEach((element,ind) => {

      

      //   if (ind<12 ) {this.add.text(100, 340+(40*(ind+1)), `${element}`, { font: '16px Arial', fill: '#ffffff' });}
 
      //   else if (ind<30 ) {this.add.text(700, 100+(40*(ind+1-12)), `${element}`, { font: '16px Arial', fill: '#00FF00' });}
 
      //   else {this.add.text(1300, 100+(40*(ind+1-30)), `${element}`, { font: '16px Arial', fill: '#ffffff' });}

        

      //  })

      //  battleparams.updateitonce = false;

      // }
   


      battleparams.ratioTxt.setText(`Wins ${battleparams.nbwin}, Loses ${battleparams.nblose}`);

      // battleparams.damagedoneTxt.setText(`Damage done: ${characterparams.outputdamage[battleparams.turn-1]}`);


      battleparams.turnTxt.setText(`Actual turn: ${battleparams.turn}`);

      battleparams.damagereceivedTxt.setText(`${Math.round(battleparams.enemy[battleparams.enemy.length-1].outputdamage[battleparams.turn-1] )}`);

      battleparams.HHPTxt.setText(`Your HP: ${characterparams.HP}`);

      battleparams.HPTxt.setText(`Enemy HP: ${battleparams.enemy[battleparams.enemy.length-1].HP }`);

  

    }


    }

    
    const battleparams = new Battlescene();


    class Inventory extends Phaser.Scene
{
    weaponset = [];
    equippedweapon = [];


  constructor() {
    super('Inventory'); // Scene key
  }


    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('Items', './Default_few_sword_for_an_rpg_game_3.jpg');



    }



    create ()
    {
      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(1300, 450, 'Items').setScale(0.5);

      let title = this.add.text(100, 60, `Left-click the weapon to equip it`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
  
       inventoryparams.equippedtext = this.add.text(100, 100, `Currently equipped: ${inventoryparams.equippedweapon[0]?.name}, potencie: ${inventoryparams.equippedweapon[0]?.potentie}, element: ${inventoryparams.equippedweapon[0]?.element}, %crit: ${inventoryparams.equippedweapon[0]?.crit}, critDamage: ${inventoryparams.equippedweapon[0]?.critDamage}`).setInteractive();
  
       if (battleparams.styles[battleparams.choosedstyle].equiped2weapon ==true) {

       let title2 = this.add.text(100, 140, `Right-click the weapon to equip it`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
  
       inventoryparams.equippedtext2 = this.add.text(100, 180, `Currently equipped: ${inventoryparams.equippedweapon[1]?.name}, potencie: ${inventoryparams.equippedweapon[1]?.potentie}, element: ${inventoryparams.equippedweapon[1]?.element}, %crit: ${inventoryparams.equippedweapon[1]?.crit}, critDamage: ${inventoryparams.equippedweapon[1]?.critDamage}`).setInteractive();
  
       };

      if (battleparams.styles[battleparams.choosedstyle].name!='barehands style') {

      inventoryparams.weaponset.forEach((selection,ind) => {

        let weapon = this.add.text(100, 180+(40*(ind+2)), `${selection.name}, power: ${Math.round(selection.attack)}, potencie: ${selection.potentie}, element: ${selection.element}, %crit: ${Math.round(selection.crit)}, critDamage: ${selection.critDamage}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

        weapon.on('pointerdown', (element) => {

          console.log(element.button);

          if(element.button == 0) {

                console.log(inventoryparams.equippedweapon);

                inventoryparams.equippedweapon.splice(0 ,1 , selection);

            }

        })

        if (battleparams.styles[battleparams.choosedstyle].equiped2weapon ==true) {

        weapon.on('pointerdown', (element) => {

          if(element.button == 2) {

          console.log(inventoryparams.equippedweapon);

          inventoryparams.equippedweapon.splice(1 ,1 , selection);

  
          }

     })

    }
        
      })

    };

      console.log(inventoryparams.weaponset);


      let back = this.add.text(1200, 60, `Back to main`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      back.on('pointerdown', () => (this.scene.stop().start('Main')));



    }


    update () 
    {

      inventoryparams.equippedtext.setText(`Currently equipped: ${inventoryparams.equippedweapon[0]?.name}, potencie: ${inventoryparams.equippedweapon[0]?.potentie}, element: ${inventoryparams.equippedweapon[0]?.element}, %crit: ${inventoryparams.equippedweapon[0]?.crit}, critDamage: ${inventoryparams.equippedweapon[0]?.critDamage}`);
    
      inventoryparams.equippedtext2?.setText(`Currently equipped: ${inventoryparams.equippedweapon[1]?.name}, potencie: ${inventoryparams.equippedweapon[1]?.potentie}, element: ${inventoryparams.equippedweapon[1]?.element}, %crit: ${inventoryparams.equippedweapon[1]?.crit}, critDamage: ${inventoryparams.equippedweapon[1]?.critDamage}`);
    

    }


    }

    const inventoryparams = new Inventory();


    class Reward extends Phaser.Scene
{
   


  constructor() {
    super('Reward'); // Scene key
  }


    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('treasure', './Default_treasure_for_rpg_game_1.jpg');



    }


    create ()
    {

      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(800, 500, 'treasure');

      characterparams.outputdamage = [];

      battleparams.enemy[battleparams.enemy.length-1].outputdamage = [];

      console.log(battleparams.enemy[battleparams.enemy.length-1]);

      battleparams.eventslog = [];

      battleparams.turn = 0;

      battleparams.doitonce = true;

      battleparams.battleover = false;

      battleparams.levelstacker = battleparams.levelstacker+0.1;

      battleparams.powerstacker = battleparams.powerstacker*1.25;

      characterparams.HP = characterparams.DefaultHP*battleparams.powerstacker*0.75;

      let title = this.add.text(100, 60, `Reward`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      let reward1 = this.add.text(100, 100, `Click me to Buff your Base Damage Multiplier by 15%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward1.on('pointerdown', () => {characterparams.DefaultBDM = characterparams.BDM*1.15; this.scene.stop().start('Main'), 3000});

      let reward2 = this.add.text(100, 140, `Click me to Buff your CritDamage by 40%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward2.on('pointerdown', () => {characterparams.CritD = (characterparams.CritD*1.4); this.scene.stop().start('Main'), 3000});

      let reward3 = this.add.text(100, 180, `Click me to Buff your Luckystrike chance by 40%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward3.on('pointerdown', () => {characterparams.LStrike = Math.min((characterparams.LStrike+0.4),1); this.scene.stop().start('Main'), 3000});


      let reward4 = this.add.text(100, 220, `Click me to Buff your Defense by 20%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward4.on('pointerdown', () => {characterparams.Defense = Math.min((characterparams.Defense*1.25), 0.8); this.scene.stop().start('Main'), 3000});
    
      let reward5 = this.add.text(100, 260, `Click me to Buff your evasion rate by 5%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward5.on('pointerdown', () => {characterparams.Evasion = Math.min((characterparams.Evasion+0.05),0.33); this.scene.stop().start('Main'), 3000});

      let reward6 = this.add.text(100, 300, `Click me to Buff your luck rate by 5%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward6.on('pointerdown', () => {characterparams.Luck = Math.min((characterparams.Luck+0.1),0.25); this.scene.stop().start('Main'), 3000 });

      let reward7 = this.add.text(100, 340, `Click me to Buff your fire potencie by 100%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward7.on('pointerdown', () => {characterparams.fire = (characterparams.fire+1); characterparams.iceResistance = (characterparams.iceResistance+1); this.scene.stop().start('Main'), 3000 });

      let reward8 = this.add.text(100, 380, `Click me to Buff your ice potencie by 100%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward8.on('pointerdown', () => {characterparams.ice = (characterparams.ice+1);characterparams.fireResistance = (characterparams.fireResistance+1); this.scene.stop().start('Main'), 3000 });

      let reward9 = this.add.text(100, 420, `Click me to Buff your thunder potencie by 100%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward9.on('pointerdown', () => {characterparams.thunder = (characterparams.thunder+1);characterparams.earthResistance = (characterparams.earthResistance+1); this.scene.stop().start('Main'), 3000 });

      let reward10 = this.add.text(100, 460, `Click me to Buff your earth potencie by 100%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward10.on('pointerdown', () => {characterparams.earth = (characterparams.earth+1); characterparams.thunderResistance = (characterparams.thunderResistance +1);  this.scene.stop().start('Main'), 3000 });

      let reward11 = this.add.text(100, 500, `Click me to Buff your speed by 5!`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward11.on('pointerdown', () => {characterparams.Speed = Math.min((characterparams.Speed+5),125);  this.scene.stop().start('Main'), 3000 });



    }


    update () 
    {



    }


    }

    const rewardparams = new Reward();


    class Enemy {
      constructor(health, attack, element, element2, HP, BDM, outputdamage, level, speed, potencie, defaultBDM) {
        this.health = health;
        this.attack = attack;
        this.element = element;
        this.element2 = element2;
        this.HP = HP;
        this.BDM = BDM;
        this.outputdamage = [...outputdamage];
        this.level = level;
        this.speed = speed;
        this.potencie = potencie;
        this.defaultBDM = defaultBDM;
  
      }
    

    }

    class Weapon {
      constructor(name, attack, crit, critDamage, index, potentie, element) {
        this.name = name;
        this.attack = attack;
        this.crit = crit;
        this.critDamage = critDamage;
        this.index = index;
        this.potentie = potentie;
        this.element = element;
      }
    
 
    }

    // battleparams.firesprite = this.add.sprite(battleparams.playerSprite.x-20, battleparams.playerSprite.y-290, 'fireeffect').setScale(5);

class Fx{
  constructor(scene, fxname, x, y, spritename, scale){
     this.scene = scene;
      this.fxname = fxname;
      this.x = x;
      this.y = y;
      this.spritename = spritename;
      this.scale = scale;

  }

    spritegen = () =>{



      console.log(this.scene);

      this.fxname = this.scene.scene.add.sprite(this.x, this.y, this.spritename).setScale(this.scale);

    }


  }

  const fxparams = new Fx();




const configmain = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    scene: [CharacterMenu, Battlescene, Inventory, Reward],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};



const game = new Phaser.Game(configmain);






