
class CharacterMenu extends Phaser.Scene
{
    BDM=1;
    CritD=1.7;
    LStrike=0.20;
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
    Luck = 0.06;
    outputdamage = [];
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

      console.log( battleparams.dungeoncompletionbonus);

      console.log( trainingmapparams.floor );

      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(1600, 500, 'charactersheet');


      let title = this.add.text(100, 60, `Character stat`, { font: '25px Arial', fill: '#ffffff' });
        
      characterparams.ratioTxt = this.add.text(1550, 60, `Wins ${battleparams.nbwin}, Loses ${battleparams.nblose}`, { font: '26px Arial', fill: '#ffffff' });
  
      let stat1 = this.add.text(100, 100, `BaseDamageMultiplier: ${characterparams.DefaultBDM}`, { font: '16px Arial', fill: '#ffffff' });
      let stat2 = this.add.text(100, 140, `CritDamage: ${characterparams.CritD} (10% fixed rate occurence)`, { font: '16px Arial', fill: '#ffffff' });
      let stat3 = this.add.text(100, 180, `Luckystrike: ${characterparams.LStrike} (50% extra damage fixed %damage, Max value: 100%)`, { font: '16px Arial', fill: '#ffffff' });
      let stat4 = this.add.text(100, 220, `Defense: ${characterparams.Defense} (damage reduction, Max value: 80%)`, { font: '16px Arial', fill: '#ffffff' });
      let stat6 = this.add.text(100, 260, `Evade: ${characterparams.Evasion} (Full damage reduction, , Max value: 33%)`, { font: '16px Arial', fill: '#ffffff' });
      let stat7 = this.add.text(100, 340, `Physical potencie: ${characterparams.PhysicalP} (Provide damage and defense against Physical type foes)`, { font: '16px Arial', fill: '#ffffff' });
      let stat8 = this.add.text(100, 380, `Magical potencie: ${characterparams.MagicalP} (Provide damage and defense against Magical type foes)`, { font: '16px Arial', fill: '#ffffff' });
      let stat9 = this.add.text(100, 420, `Fire potencie: ${characterparams.fire} (deal extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat10 = this.add.text(100, 460, `Ice potencie: ${characterparams.ice} ( deal extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat11 = this.add.text(100, 500, `Thunder potencie: ${characterparams.thunder} ( deal extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat12 = this.add.text(100, 540, `Earth potencie: ${characterparams.earth} ( deal extra-damage against a vulnerablity. reduce your elemental defense)`, { font: '16px Arial', fill: '#ffffff' });
      let stat13 = this.add.text(100, 580, `Speed: ${characterparams.Speed} (Opportunity to strike again: , Max value: 125)`, { font: '16px Arial', fill: '#ffffff' });
      let stat14 = this.add.text(100, 620, `Luck: ${characterparams.Luck} (Remove 10% of the current enemy HP, Max value: 25%)`, { font: '16px Arial', fill: '#ffffff' });
      

      // console.log(trainingmapparams.dungeoncopie);

      let inventory = this.add.text(100, 700, `Open Inventory`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      inventory.on('pointerdown', () => (this.scene.stop().start('Inventory')));

      console.log(inventory);

      let battlestart = this.add.text(100, 740, `Resume dungeon`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      battlestart.on('pointerdown', () => this.scene.stop().start('Trainingmap'));

      let randomweapon = new Weapon(`old sword lvl ${battleparams.levelstacker}`, 10 * battleparams.levelstacker, Math.min(5*battleparams.levelstacker,30), 1.25*battleparams.levelstacker, 1, characterparams.potentie[this.random(1)], characterparams.element[this.random(3)]);

      inventoryparams.weaponset.length<15? inventoryparams.weaponset.push(randomweapon) : (inventoryparams.weaponset=[],inventoryparams.weaponset.push(randomweapon));

      // console.log(inventoryparams.weaponset);

      characterparams.actualstyle = this.add.text(1050, 50, `Actual style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let standardstyle = this.add.text(950, 200, `Click to switch to standard style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      standardstyle.on('pointerdown', () => (this.handlestyle(0)));

      let barehandstyle = this.add.text(950, 300, `Click to switch to barehandstyle style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let barehandstyletext = this.add.text(950, 340, `More speed, more opportunity to perform ability`, { font: '16px Arial', fill: '#000000' });

      barehandstyle.on('pointerdown', () => (this.handlestyle(1)));

      let doublestyle = this.add.text(950, 500, `Click to switch to doublesword style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let doublestyletext = this.add.text(950, 540, `Bear two elemental potencies to the battle`, { font: '16px Arial', fill: '#000000' });

      doublestyle.on('pointerdown', () => (this.handlestyle(2)));

      let bleedingstyle = this.add.text(950, 700, `Click to switch to bleeding style`, { font: '26px Arial', fill: '#000000' }).setInteractive();

      let bleedingstyletext = this.add.text(950, 740, `Deal fix amount of damage after successfully attacking a target between 4-8 times`, { font: '16px Arial', fill: '#000000' });

      bleedingstyle.on('pointerdown', () => (this.handlestyle(3)));


    }

    handlestyle(index){

        battleparams.choosedstyle = index;

        switch (index) {
          case 0: {

            inventoryparams.equippedweapon.pop();
            inventoryparams.equippedweapon.pop();
            inventoryparams.equippedweapon[0]= inventoryparams.weaponset[inventoryparams.weaponset.length-1];
            battleparams.styles[battleparams.choosedstyle].equiped2weapon = false;
            battleparams.styles[battleparams.choosedstyle].nesteddouble = false;
            // console.log(inventoryparams.equippedweapon);
            console.log(battleparams.choosedstyle);
            battleparams.styles[battleparams.choosedstyle].elementalanimation = true;

          }
            
            break;

            case 1: {

              inventoryparams.equippedweapon.pop();
              inventoryparams.equippedweapon.pop();
              battleparams.styles[battleparams.choosedstyle].equiped2weapon = false;
              battleparams.styles[battleparams.choosedstyle].nesteddouble = true;
              // console.log(inventoryparams.equippedweapon);
              console.log(battleparams.choosedstyle);
              battleparams.styles[battleparams.choosedstyle].elementalanimation = true;
  
            }
              
              break;

              case 2: {

                inventoryparams.equippedweapon.pop();
                inventoryparams.equippedweapon.pop();
                inventoryparams.equippedweapon[0]= inventoryparams.weaponset[inventoryparams.weaponset.length-1];
                inventoryparams.weaponset[inventoryparams.weaponset.length-2]? inventoryparams.equippedweapon[1]= inventoryparams.weaponset[inventoryparams.weaponset.length-2]: inventoryparams.equippedweapon[1]=inventoryparams.weaponset[inventoryparams.weaponset.length-1];
                battleparams.styles[battleparams.choosedstyle].equiped2weapon = true;
                battleparams.styles[battleparams.choosedstyle].nesteddouble = false;
                console.log(battleparams.choosedstyle);
                battleparams.styles[battleparams.choosedstyle].elementalanimation = true;
    
              }
                
                break;

                case 3: {

                  inventoryparams.equippedweapon.pop();
                  inventoryparams.equippedweapon.pop();
                  inventoryparams.equippedweapon[0]= inventoryparams.weaponset[inventoryparams.weaponset.length-1];
                  battleparams.styles[battleparams.choosedstyle].equiped2weapon = false;
                  battleparams.styles[battleparams.choosedstyle].nesteddouble = false;
                  // console.log(inventoryparams.equippedweapon);
                  console.log(battleparams.choosedstyle);
                  battleparams.styles[battleparams.choosedstyle].elementalanimation = false;
      
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
  doitonce = [true, true];
  eventslog = [];
  levelstacker = 1;
  rollitonce = [true,true,true,true, true, true, true, true, true, true,true];
  potentie = ['physical', 'magical'];
  element = ['fire', 'ice', 'thunder', 'earth'];
  nbwin = 0;
  nblose = 0;
  countitonce = true;
  powerstacker = 1;
  playitonce = true;
  handleonce = [true, true];
  updateitonce = [true, true];
  waituntilidle = true;
  sequence = [];
  damageturnlog = [];
  Critflag = false;
  dungeoncompletionbonus = 0;

  styles = [
  {name:'standard style', speedbonus: 0, equiped1weapon:true, equiped2weapon:false, nesteddouble: false, stackdamage:0, critbonus:0, luckbonus:0, elementalanimation: true},
   {name:'barehands style', speedbonus: 35, equiped1weapon:false, equiped2weapon:false, nesteddouble: true, stackdamage:0, critbonus:0, luckbonus: 0.1, elementalanimation: true},
    {name:'doublesword style', speedbonus: -100, equiped1weapon:true, equiped2weapon:true, nesteddouble: false, stackdamage:0, critbonus:0, luckbonus:0, elementalanimation: true},
    {name:'bleeding style', speedbonus: 0, equiped1weapon:true, equiped2weapon:false, nesteddouble: false, stackdamage:1, critbonus:-50, luckbonus:-0.5, elementalanimation: false},

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

      let title = this.add.text(100, 60, `Battle lvl ${battleparams.levelstacker}`, { font: '60px Arial', fill: '#ffffff' });

      battleparams.ratioTxt = this.add.text(1400, 60, `Wins ${battleparams.nbwin}, Loses ${battleparams.nblose}`, { font: '26px Arial', fill: '#ffffff' });

      let randomstacktrigger = Math.random()*4+4;

      const enemy = new Enemy(undefined,20*battleparams.levelstacker, battleparams.element[this.random(3)], battleparams.element[this.random(3)], 500*battleparams.powerstacker, 1*(battleparams.powerstacker),[],battleparams.levelstacker,90, battleparams.potentie[this.random(1)],1*(battleparams.powerstacker),randomstacktrigger,randomstacktrigger);

      battleparams.enemy.push(enemy);

      let enemyannouce = this.add.text(1100, 100, `An enemy is coming: Weakness: ${battleparams.enemy[battleparams.enemy.length-1].element} & Strenght: ${battleparams.enemy[battleparams.enemy.length-1].element2} & Type: ${battleparams.enemy[battleparams.enemy.length-1].potencie}`, { font: '16px Arial', fill: '#ffffff' });

      battleparams.currentstyle = this.add.text(100, 260, `Currentstyle: ${characterparams.choosedstyle}`, { font: '24px Arial', fill: '#ffffff' });

      battleparams.attackbutton = this.add.text(100, 300, `Click me to attack`, { font: '32px Arial', fill: '#ffffff' }).setInteractive();

      let Activatestandard = this.add.text(100, 340, `Activate Standard style`, { font: '24px Arial', fill: '#ffffff' }).setInteractive();

      Activatestandard.on('pointerdown', () => (battleparams.battleover == false?characterparams.handlestyle(0):''));

      let Activatebarehands = this.add.text(100, 380, `Activate Barehands style`, { font: '24px Arial', fill: '#ffffff' }).setInteractive();

      Activatebarehands.on('pointerdown', () => (battleparams.battleover == false?characterparams.handlestyle(1):''));

      let Activatesdouble = this.add.text(100, 420, `Activate Doublesword style`, { font: '24px Arial', fill: '#ffffff' }).setInteractive();

      Activatesdouble.on('pointerdown', () => (battleparams.battleover == false?characterparams.handlestyle(2):''));

      let Activatesstack = this.add.text(100, 460, `Activate Bleeding style`, { font: '24px Arial', fill: '#ffffff' }).setInteractive();

      Activatesstack.on('pointerdown', () => (battleparams.battleover == false?characterparams.handlestyle(3):''));

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



    playmagic(magic,key, caster){

      // console.log(characterparams.playerSprite);

      // console.log(this.scene);

      // console.log('magic:eartheffect,key:fx-earth');


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

              // console.log(key,magic);

              this.playmagic(magic,key,fxcaster);


            } else {


              this.playanyanimation(`${formatedelement}Sprite`, element, formatedelement);

            }


          }, 700*(1+index))


          setTimeout(() => {

           this.remaindle();

            battleparams.sequence = [];

              battleparams.damageturnlog=[];

          // console.log(battleparams.sequence);

           
          }, 700*(1+battleparams.sequence.length))




          })

       

        }


        elementcompare(){

            let elementone = inventoryparams.equippedweapon[0].element;
            let elementtwo = inventoryparams.equippedweapon[1].element;

            let characterstatone = characterparams[elementone];
            let characterstattwo = characterparams[elementtwo];

            if (characterstatone>characterstattwo) {return characterstatone} else {return characterstattwo};

        }



    create ()
    {
      this.add.sprite(900, 450, 'prisonfont').setScale(0.4);

        this.createAnimation();

        this.createUI();

        this.remaindle();


        this.events.on('CritChecker', () =>  {

          if (battleparams.rollitonce[0] ==true) {

          if((inventoryparams.equippedweapon[0] == undefined)||(inventoryparams.equippedweapon[0].length == 0)) {

            let random = this.random(100);

            console.log(`crit: ${random}`);

            let bonus = battleparams.styles[battleparams.choosedstyle].critbonus;

            random<10+bonus? (battleparams.Critflag = true,characterparams.BDM = characterparams.BDM*characterparams.CritD, battleparams.eventslog.push(`Turn ${battleparams.turn}: Critical strike! Roll: ${random}`)) : (characterparams.BDM = characterparams.BDM) ;
          
          
          } else {
            
            let random = this.random(100);

            let bonus = battleparams.styles[battleparams.choosedstyle].critbonus;

            random<(10+bonus+inventoryparams.equippedweapon[0].crit)? ( battleparams.Critflag = true ,characterparams.BDM = characterparams.BDM*(characterparams.CritD*inventoryparams.equippedweapon[0].critDamage), battleparams.eventslog.push(`Turn ${battleparams.turn}: Critical strike! Roll: ${random}`)) : (characterparams.BDM = characterparams.BDM) ;
          
            // console.log(characterparams.CritD);

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

          if ((battleparams.rollitonce[5] ==true)&&(battleparams.styles[battleparams.choosedstyle].elementalanimation == true)) {

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
              
              inventoryparams.equippedweapon[1]?.element? characterparams.BDM=characterparams.BDM*((this.elementcompare())*2) : characterparams.BDM=characterparams.BDM*(characterparams[El]*2);

              console.log(`elem damage:${characterparams.BDM}`);

            
            } else {
              
              let elementmultiplier = characterparams.fire*0.05+characterparams.ice*0.05+characterparams.thunder*0.05+characterparams.earth*0.05;

              characterparams.BDM=characterparams.BDM*(1+elementmultiplier); 
              
              console.log('this case');
            
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

          random<characterparams.Evasion ? (battleparams.sequence.push('player-defense') , battleparams.enemy[battleparams.enemy.length-1].BDM = 0.001, battleparams.eventslog.push(`Turn ${battleparams.turn}: You evade enemy attack!! Roll: ${random}`)) : battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM;

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

            // console.log(battleparams.sequence);

            // let ennemystrenght = battleparams.enemy[battleparams.enemy.length-1].element2;


            let ennemystrenght = battleparams.enemy[battleparams.enemy.length-1].element2;

            battleparams.sequence.push(`fx-${ennemystrenght}!enemy`);

            battleparams.sequence.push('enemy-attack','player-gethit');


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

          let bonus = battleparams.styles[battleparams.choosedstyle].luckbonus;

          // console.log(random, characterparams.Luck , random< characterparams.Luck);

            console.log(`luck: ${random}`);

          if (random<characterparams.Luck+bonus)  {let perfectstrike = battleparams.enemy[battleparams.enemy.length-1].HP*0.10 ;battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP*0.9;
            
            battleparams.eventslog.push(`Turn ${battleparams.turn}: Luck! You made a perfect strike dealing ${perfectstrike} damages! Roll: ${random}`);
          
            battleparams.sequence.push('player-attack','enemy-gethit');

            battleparams.damageturnlog.push(perfectstrike);
          
          };

            // console.log(battleparams.sequence);

          battleparams.rollitonce[3] = false;

        } 


        })


        this.events.on('SpeedChecker', () => {

          if (battleparams.rollitonce[4] ==true) {

            //enemy strike after every player action

   

             //enemy strike after every player action

            let bonus = battleparams.styles[battleparams.choosedstyle].speedbonus;

            let delta = characterparams.Speed - battleparams.enemy[battleparams.enemy.length-1].speed+bonus;

            let random = this.random(100)/100;

            console.log(random, delta/100);
  
            if (random<delta/100)  {battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM*0.2;
            
              battleparams.eventslog.push(`Turn ${battleparams.turn}: You get an extra-attack !! Roll: ${random}`)

              characterparams.Attacktwice = true;

            } else {characterparams.Attacktwice = false, battleparams.eventslog.push(`Turn ${battleparams.turn}: You missed your extra-attack. Roll: ${random}`)};

            // console.log(`double: ${random}`);
  
            battleparams.rollitonce[4] = false;
  
          } 


        })


        this.events.on('BleedStacker', () => {

          let weapondamage = inventoryparams.equippedweapon[0].attack + battleparams.dungeoncompletionbonus;

          if(battleparams.rollitonce[10] == true){

            battleparams.rollitonce[10] = false;

          let stackBDM = (characterparams.fire+characterparams.ice+characterparams.thunder+characterparams.earth)*4+4;

          let stackblast = weapondamage*stackBDM*characterparams.DefaultBDM;
    
          battleparams.enemy[battleparams.enemy.length-1].stacktrigger>0? (battleparams.enemy[battleparams.enemy.length-1].stacktrigger -= 1,
            
            battleparams.eventslog.push(`Turn ${battleparams.turn}: You stack one bleed, ${battleparams.enemy[battleparams.enemy.length-1].stacktrigger} stacks remaining before stagger your enemy.`),
            
            battleparams.sequence.push('player-attack','enemy-gethit')
            
            ) : (battleparams.enemy[battleparams.enemy.length-1].HP= battleparams.enemy[battleparams.enemy.length-1].HP-stackblast,

              battleparams.enemy[battleparams.enemy.length-1].stacktrigger = battleparams.enemy[battleparams.enemy.length-1].defaultstacktrigger,
    
          battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${stackblast} damages from bleeding.`),
  
          battleparams.damageturnlog.push(stackblast),

          battleparams.sequence.push(`fx-fire!player`,`fx-ice!player`,`fx-thunder!player`,`fx-earth!player`,'enemy-gethit','enemy-idle'));

          battleparams.handleonce[0] = false;
    
          console.log(battleparams.enemy[battleparams.enemy.length-1].stacktrigger);

            };


        })

      

        this.events.on('BattleStatus', () =>  {

          if(battleparams.countitonce == true) {

          if (characterparams.HP<0)  {this.playanyanimation('playerSprite','player-death','player'), battleparams.waituntilidle = false, battleparams.battleover = true, console.log(battleparams.sequence.length), battleparams.nblose=battleparams.nblose+1, setTimeout(() => this.scene.stop().start('Reward'),16000)};

          if (battleparams.enemy[battleparams.enemy.length-1].HP<0)  {this.playanyanimation('enemySprite','enemy-death','enemy'),battleparams.battleover = true, battleparams.waituntilidle = false,battleparams.battleover = true, battleparams.nbwin=battleparams.nbwin+1, (setTimeout(() => this.scene.stop().start('Reward'),16000))};

          battleparams.countitonce = false;

        }

        })


      this.events.on('Handleequippedweapon', () =>  {


        if((battleparams.handleonce[0] == true)&&(battleparams.styles[battleparams.choosedstyle].stackdamage== 0)) {

          battleparams.Critflag == true? (battleparams.Critflag = false, battleparams.sequence.push('player-attack','enemy-gethit')) : battleparams.sequence.push('player-attack2','enemy-gethit');

        if(inventoryparams.equippedweapon[0] == undefined) {characterparams.outputdamage.push(characterparams.BDM*inventoryparams.weaponset[0].attack);} 

        else { 
            
          let weapondamage = inventoryparams.equippedweapon[0].attack + battleparams.dungeoncompletionbonus;

          characterparams.outputdamage.push(characterparams.BDM*weapondamage);}

        let enemydamage = battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack;

        battleparams.enemy[battleparams.enemy.length-1].outputdamage.push(enemydamage);
    
        characterparams.HP = characterparams.HP - enemydamage;

        
        if(inventoryparams.equippedweapon[0] == undefined) {

          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.weaponset[0].attack;

          battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack)} damages. You received ${Math.round(battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack)} damages.`)

          battleparams.damageturnlog.push(Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack));

          // console.log(battleparams.eventslog);

        } else if ((battleparams.styles[battleparams.choosedstyle].stackdamage== 0)&&(inventoryparams.equippedweapon[0] != undefined)){

          let weapondamage = inventoryparams.equippedweapon[0].attack + battleparams.dungeoncompletionbonus;

          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*weapondamage;

        battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*weapondamage)} damages. You received ${Math.round(battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack)} damages.`)

        battleparams.damageturnlog.push(Math.round(characterparams.BDM*weapondamage));

        // console.log(battleparams.eventslog);

      };

      battleparams.handleonce[0] = false;

     } else if ((battleparams.styles[battleparams.choosedstyle].stackdamage== 1)&&(inventoryparams.equippedweapon[0] != undefined)&&(battleparams.handleonce[0] == true)) {

      console.log(battleparams.enemy, battleparams.enemy[battleparams.enemy.length-1].BDM, battleparams.enemy[battleparams.enemy.length-1].attack);

      let enemydamage = battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack;

      battleparams.enemy[battleparams.enemy.length-1].outputdamage.push(enemydamage);
    
      characterparams.HP = characterparams.HP - enemydamage;

      battleparams.eventslog.push(`Turn ${battleparams.turn}: You receivedstk1 ${enemydamage} damages.`)

          this.events.emit('BleedStacker');

        

     }

     battleparams.handleonce[0] = false;

      })


      this.events.on('double', () => {

        if((battleparams.handleonce[1] == true)&&(battleparams.styles[battleparams.choosedstyle].stackdamage== 0)) {

        if(inventoryparams.equippedweapon[0] == undefined) {characterparams.outputdamage.push(characterparams.BDM*inventoryparams.weaponset[0].attack);} 

        else {let weapondamage = inventoryparams.equippedweapon[0].attack + battleparams.dungeoncompletionbonus;

          characterparams.outputdamage.push(characterparams.BDM*weapondamage);}
  
  
        if(inventoryparams.equippedweapon[0] == undefined) {
  
          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.weaponset[0].attack;
  
          battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack)} damages from your extra-attack.`)
  
          battleparams.damageturnlog.push(Math.round(characterparams.BDM*inventoryparams.weaponset[0].attack));

          battleparams.Critflag == true? (battleparams.Critflag = false, battleparams.sequence.push('player-attack','enemy-gethit')) : battleparams.sequence.push('player-attack2','enemy-gethit');


          // console.log(battleparams.eventslog);
  
        } else {

          let weapondamage = inventoryparams.equippedweapon[0].attack + battleparams.dungeoncompletionbonus;
  
          battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*weapondamage;
  
        battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${Math.round(characterparams.BDM*weapondamage)} damages from your extra-attack.`)
  
        battleparams.damageturnlog.push(Math.round(characterparams.BDM*weapondamage));

        battleparams.Critflag == true? (battleparams.Critflag = false, battleparams.sequence.push('player-attack','enemy-gethit')) : battleparams.sequence.push('player-attack2','enemy-gethit');

        // console.log(battleparams.eventslog);
  
      };

    }

        else if ((battleparams.styles[battleparams.choosedstyle].stackdamage== 1)&&(inventoryparams.equippedweapon[0] != undefined)) {

      this.events.emit('BleedStacker');


      };

      battleparams.handleonce[1] = false;
      battleparams.Attacktwice= false;


      })


      this.events.on('oneturn', () => {

        if (battleparams.doitonce[1] == true) {

        characterparams.BDM = characterparams.DefaultBDM;
  
        battleparams.rollitonce = [true,true,false,true, false, true, false, false, false, true,true];

      this.events.emit('CritChecker');

      this.events.emit('LuckystrikeChecker');

      this.events.emit('ElementChecker');

      battleparams.rollitonce[3] =true;

      this.events.emit('LuckChecker');

      console.log(`oneturn: ${battleparams.turn}`);

      battleparams.doitonce[1] = false;

        };

  
      })

      this.events.on('Speedcheckereffect', () => {

        if (battleparams.rollitonce[9] == true ) {

        if(  characterparams.Attacktwice == true){

          battleparams.handleonce[1] = true;

          this.events.emit('double');

          console.log('proceffect');


         };

         battleparams.rollitonce[9] = false;

        }

      })

      

      this.events.on('PlayerAttack', () =>  {

       // console.log(battleparams.battleover );

        // console.log(battleparams.rollitonce);

        if(battleparams.waituntilidle == true){
      
          if (battleparams.playitonce == true){
  
          if (battleparams.battleover == false) {

            battleparams.sequence = [];
  
  
          characterparams.BDM = characterparams.DefaultBDM;
  
          this.events.emit('CritChecker');
  
          this.events.emit('LuckystrikeChecker');
  
          this.events.emit('DamageMitigation');
  
          this.events.emit('ElementalExposure');

          this.events.emit('LuckChecker');

          this.events.emit('ElementChecker');
  
          this.events.emit('TypeChecker');
  
          this.events.emit('EvadeChecker');
  
          this.events.emit('SpeedChecker');
  
            // console.log(inventoryparams.weaponset[0]);
  
          this.events.emit('Handleequippedweapon');
  

            if(characterparams.Attacktwice == false){
  
              this.handlesequenceanimation();
           
            }; 
  
          characterparams.BDM = characterparams.DefaultBDM;
  
          battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].defaultBDM;
  

       
          if((characterparams.Attacktwice == true)||(battleparams.styles[battleparams.choosedstyle].nesteddouble == true)){

              this.events.emit('oneturn');

              battleparams.handleonce[1] = true;

              this.events.emit('double');

               if (battleparams.styles[battleparams.choosedstyle].nesteddouble == true) {

                console.log(battleparams.sequence);

              battleparams.rollitonce[9] = true;

              battleparams.doitonce[1] = true;

              this.events.emit('oneturn');
           
              battleparams.rollitonce[4] = true;

               this.events.emit('SpeedChecker');

                this.events.emit('Speedcheckereffect');



                battleparams.rollitonce[9] = true;

                battleparams.doitonce[1] = true;

                this.events.emit('oneturn');

                battleparams.rollitonce[4] = true;

                 this.events.emit('SpeedChecker');

                 this.events.emit('Speedcheckereffect');


                 };
      

          // console.log(battleparams.sequence);
  
  
          this.handlesequenceanimation();

            battleparams.sequence = [];

            battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].defaultBDM;

  
          }
  
          battleparams.turn = battleparams.turn+1;
     
          this.events.emit('BattleStatus');
  
        } else {this.events.emit('GameOver')}
  
        battleparams.playitonce = false;
  
      }
  
        }
  
        battleparams.waituntilidle = false;
  
    
             });

    


      if (battleparams.doitonce[0] == true) {

      battleparams.attackbutton.on('pointerdown', () => {this.events.emit('PlayerAttack')});

      battleparams.doitonce[0] = false;

    };




    this.input.on('pointerdown', () => {


      battleparams.doitonce = [true, true];

      battleparams.rollitonce = [true,true,true,true, true, true, true, true, true, true, true];

      battleparams.countitonce = true;

      battleparams.playitonce = true;

      battleparams.handleonce = [true, true];

      battleparams.updateitonce = [true, true];

 
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


      ////////DEBUG

    //   if(battleparams.updateitonce[0] == true) {

    //     battleparams.eventslog.forEach((element,ind) => {
  
    //       // console.log(this);

    //   if (ind<12 ) {
          
    //     // this.add.text(100, 340+(40*(ind+1)), `${element}`, { font: '16px Arial', fill: '#ffffff' });
    
    //     battleparams.newmessage = new Message(`message${ind}`, this.scene, 100, 340+(40*(ind+1)), element );

    //     battleparams.newmessage.messagegen(16);

    //     // console.log(battleparams.newmessage.name);

    //     // battleparams.newmessage.name.destroy();

    
    // }

    //   else if (ind<30 ) {
        
    //     // this.add.text(700, 100+(40*(ind+1-12)), `${element}`, { font: '16px Arial', fill: '#ffffff' });

    //     battleparams.newmessage =  new Message(`message${ind}`, this.scene, 700, 100+(40*(ind+1-12)), element );
      
    //     battleparams.newmessage.messagegen(16);


    //   }

    //   else {
        
    //     // this.add.text(1300, 100+(40*(ind+1-30)), `${element}`, { font: '16px Arial', fill: '#ffffff' });

    //     battleparams.newmessage =  new Message(`message${ind}`, this.scene, 1300, 100+(40*(ind+1-30)), element );

    //     battleparams.newmessage.messagegen(16);
  

    //   }

      

    //  })

    //  battleparams.updateitonce[0] = false;

    // }

          //////DEBUG


      if(battleparams.updateitonce[0] == true) {

      battleparams.eventslog.forEach((element,ind) => {
          
          let newmessage = new Message(`message${ind}`, this.scene, 1100, 100+(40*(ind+1)), element );

            newmessage.messagegen(16);

            
            setTimeout(() => {

              newmessage.name.destroy(); 


            }, 5000)


            setTimeout(() => {

      
              battleparams.eventslog.shift();

      
            }, 10000)


       })

       battleparams.updateitonce[0] = false;

      }

   
      battleparams.ratioTxt.setText(`Wins ${battleparams.nbwin}, Loses ${battleparams.nblose}`);


      battleparams.turnTxt.setText(`Actual turn: ${battleparams.turn-1}`);

      battleparams.damagereceivedTxt.setText(`${Math.round(battleparams.enemy[battleparams.enemy.length-1].outputdamage[battleparams.turn-1] )}`);

      battleparams.HHPTxt.setText(`Your HP: ${characterparams.HP}`);

      battleparams.HPTxt.setText(`Enemy HP: ${battleparams.enemy[battleparams.enemy.length-1].HP }`);

      battleparams.currentstyle.setText(`Currentstyle: ${battleparams.styles[battleparams.choosedstyle].name}`);

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

          // console.log(element.button);

          if(element.button == 0) {

                // console.log(inventoryparams.equippedweapon);

                inventoryparams.equippedweapon.splice(0 ,1 , selection);

            }

        })

        if (battleparams.styles[battleparams.choosedstyle].equiped2weapon ==true) {

        weapon.on('pointerdown', (element) => {

          if(element.button == 2) {

          // console.log(inventoryparams.equippedweapon);

          inventoryparams.equippedweapon.splice(1 ,1 , selection);

  
          }

     })

    }
        
      })

    };

      // console.log(inventoryparams.weaponset);


      let back = this.add.text(1200, 60, `Back to main`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      back.on('pointerdown', () => (this.scene.stop().start('Main')));

      let back2 = this.add.text(1400, 60, `Resume/start dungeon`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      back2.on('pointerdown', () => (this.scene.stop().start('Trainingmap')));



    }


    update () 
    {

      inventoryparams.equippedtext?.setText(`Currently equipped: ${inventoryparams.equippedweapon[0]?.name}, potencie: ${inventoryparams.equippedweapon[0]?.potentie}, element: ${inventoryparams.equippedweapon[0]?.element}, %crit: ${inventoryparams.equippedweapon[0]?.crit}, critDamage: ${inventoryparams.equippedweapon[0]?.critDamage}`);
    
      inventoryparams.equippedweapon[1]? inventoryparams.equippedtext2?.setText(`Currently equipped: ${inventoryparams.equippedweapon[1]?.name}, potencie: ${inventoryparams.equippedweapon[1]?.potentie}, element: ${inventoryparams.equippedweapon[1]?.element}, %crit: ${inventoryparams.equippedweapon[1]?.crit}, critDamage: ${inventoryparams.equippedweapon[1]?.critDamage}`) : '';
    

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

      // console.log(battleparams.enemy[battleparams.enemy.length-1]);

      battleparams.eventslog = [];

      battleparams.turn = 0;

      battleparams.doitonce[0] = true;

      battleparams.battleover = false;

      battleparams.levelstacker = battleparams.levelstacker+0.1;

      battleparams.powerstacker = battleparams.powerstacker*1.25;

      characterparams.HP = characterparams.DefaultHP*battleparams.powerstacker*0.75;

      let title = this.add.text(100, 60, `Reward`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      let reward1 = this.add.text(100, 100, `Click me to Buff your Base Damage Multiplier by 15%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward1.on('pointerdown', () => {characterparams.DefaultBDM = characterparams.DefaultBDM*1.15; this.scene.stop().start('Trainingmap')});

      let reward2 = this.add.text(100, 140, `Click me to Buff your CritDamage by 40%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward2.on('pointerdown', () => {characterparams.CritD = (characterparams.CritD*1.4); this.scene.stop().start('Trainingmap')});

      let reward3 = this.add.text(100, 180, `Click me to Buff your Luckystrike chance by 40%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward3.on('pointerdown', () => {characterparams.LStrike = Math.min((characterparams.LStrike+0.4),1); this.scene.stop().start('Trainingmap')});


      let reward4 = this.add.text(100, 220, `Click me to Buff your Defense by 20%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward4.on('pointerdown', () => {characterparams.Defense = Math.min((characterparams.Defense*1.25), 0.8); this.scene.stop().start('Trainingmap')});
    
      let reward5 = this.add.text(100, 260, `Click me to Buff your evasion rate by 5%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward5.on('pointerdown', () => {characterparams.Evasion = Math.min((characterparams.Evasion+0.05),0.33); this.scene.stop().start('Trainingmap')});

      let reward6 = this.add.text(100, 300, `Click me to Buff your luck rate by 5%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward6.on('pointerdown', () => {characterparams.Luck = Math.min((characterparams.Luck+0.1),0.25); this.scene.stop().start('Trainingmap') });

      let reward7 = this.add.text(100, 340, `Click me to Buff your fire potencie by 300%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward7.on('pointerdown', () => {characterparams.fire = (characterparams.fire+3); characterparams.iceResistance = (characterparams.iceResistance+0.1); this.scene.stop().start('Trainingmap') });

      let reward8 = this.add.text(100, 380, `Click me to Buff your ice potencie by 300%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward8.on('pointerdown', () => {characterparams.ice = (characterparams.ice+3);characterparams.fireResistance = (characterparams.fireResistance+0.1); this.scene.stop().start('Trainingmap') });

      let reward9 = this.add.text(100, 420, `Click me to Buff your thunder potencie by 300%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward9.on('pointerdown', () => {characterparams.thunder = (characterparams.thunder+3);characterparams.earthResistance = (characterparams.earthResistance+0.1); this.scene.stop().start('Trainingmap') });

      let reward10 = this.add.text(100, 460, `Click me to Buff your earth potencie by 300%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward10.on('pointerdown', () => {characterparams.earth = (characterparams.earth+3); characterparams.thunderResistance = (characterparams.thunderResistance +0.1);  this.scene.stop().start('Trainingmap') });

      let reward11 = this.add.text(100, 500, `Click me to Buff your speed by 5!`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward11.on('pointerdown', () => {characterparams.Speed = Math.min((characterparams.Speed+5),125);  this.scene.stop().start('Trainingmap') });



    }


    update () 
    {



    }


    }

    const rewardparams = new Reward();


    class Enemy {
      constructor(health, attack, element, element2, HP, BDM, outputdamage, level, speed, potencie, defaultBDM, stacktrigger, defaultstacktrigger) {
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
        this.stacktrigger = stacktrigger;
        this.defaultstacktrigger = defaultstacktrigger;

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

      // console.log(this.scene);

      this.fxname = this.scene.scene.add.sprite(this.x, this.y, this.spritename).setScale(this.scale);

    }


  }

      const fxparams = new Fx();


      class Message{
       constructor(name, scene, x , y, content){
        this.name = name;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.content = content;


    }

    messagegen = (size) => {

      this.name = this.scene.scene.add.text(this.x, this.y, this.content, { font: `${size}px Arial`, fill: '#ffffff' });

      return this.name;


    }



  }


  //  Toggle this to disable the room hiding / layer scale, so you can see the extent of the map easily!
const debug = false;

// Tile index mapping to make the code more readable
const TILES = {
    TOP_LEFT_WALL: 3,
    TOP_RIGHT_WALL: 4,
    BOTTOM_RIGHT_WALL: 23,
    BOTTOM_LEFT_WALL: 22,
    TOP_WALL: [
        { index: 39, weight: 4 },
        { index: 39, weight: 4 },
        { index: 39, weight: 4 },
        { index: 39, weight: 4 },
    ],
    LEFT_WALL: [
        { index: 21, weight: 4 },
        { index: 21, weight: 4 },
        { index: 21, weight: 4 },
        { index: 21, weight: 4 },
    ],
    RIGHT_WALL: [
        { index: 19, weight: 4 },
        { index: 19, weight: 4 },
        { index: 19, weight: 4 },
        { index: 19, weight: 4 },
    ],
    BOTTOM_WALL: [
        { index: 1, weight: 4 },
        { index: 1, weight: 4 },
        { index: 1, weight: 4 },
        { index: 1, weight: 4 },
    ],
    FLOOR: [
        { index: 6, weight: 20 },
        { index: 6, weight: 20 },
        { index: 6, weight: 20 },
        { index: 6, weight: 20 },
    ]
};


  class Trainingmap extends Phaser.Scene
  {
     doitonce = [true, true];
     dungeoncopie = [];
     activeRoom;
     dungeon;
     map;
     player;
     cursors;
     cam;
     layer;
     lastMoveTime = 0;
     exit;
     exitroom = [];
     saveplayercoordinate = [];
     discoverdrooms = [];
     treasure;
     treasureroom = [];
     getrewardonce = true;
     floor = 1;
     leveluponce = true;
     floorsize = 25;
     winflag = false;


    constructor() {
      super({key:'Trainingmap'}); // Scene key

    }
  
 
    preload ()
    {

        this.load.image('tiles', './buch-dungeon-tileset-extruded.png');
    }

    random(num){

      return Math.round(Math.random() * num);

  }

    resetdungeon(){

      trainingmapparams.exit = 0;
      trainingmapparams.exitroom = [];
      trainingmapparams.saveplayercoordinate = [];
      trainingmapparams.discoverdrooms = [];
      trainingmapparams.doitonce = [true, true];
      trainingmapparams.dungeoncopie = [];
      trainingmapparams.getrewardonce = true; 
      trainingmapparams.treasure = 0;
      trainingmapparams.treasureroom = [];
      trainingmapparams.leveluponce = true;
   
    }


    create ()
    {
      let floordisplay = this.add.text(1500, 30, `Actual floor: ${trainingmapparams.floor}`, { font: '40px Arial', fill: '#ffffff' });

      floordisplay.setScrollFactor(0);

      characterparams.actualstyle = this.add.text(16, 50, `Actual style`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      characterparams.actualstyle.setScrollFactor(0);
  
      let inventory = this.add.text(16, 100, `Press I to open inventory`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      inventory.setScrollFactor(0);

      this.input.keyboard.on('keydown-I', ()=> { trainingmapparams.saveplayercoordinate=[];trainingmapparams.saveplayercoordinate.push({x:trainingmapparams.player.x, y:trainingmapparams.player.y});this.scene.start('Inventory')})

      let style = this.add.text(16, 150, `Press C to open your style sheet`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      this.input.keyboard.on('keydown-C', ()=> { trainingmapparams.saveplayercoordinate=[];trainingmapparams.saveplayercoordinate.push({x:trainingmapparams.player.x, y:trainingmapparams.player.y});this.scene.start('Main')})

      style.setScrollFactor(0);

      inventoryparams.equippedtext = this.add.text(16, 200, `Currently equipped: ${inventoryparams.equippedweapon[0]?.name}, potencie: ${inventoryparams.equippedweapon[0]?.potentie}, element: ${inventoryparams.equippedweapon[0]?.element}, %crit: ${inventoryparams.equippedweapon[0]?.crit}, critDamage: ${inventoryparams.equippedweapon[0]?.critDamage}`).setInteractive();
      
      inventoryparams.equippedtext.setScrollFactor(0);


      if (trainingmapparams.doitonce[0] == true){

        this.dungeon = new Dungeon({
            width: 100,
            height: 100,
            rooms: {
                width: { min: 7, max: 20, onlyOdd: true },
                height: { min: 7, max: 20, onlyOdd: true }
            }

        });

        
        do {
          trainingmapparams.exit = Math.floor(Math.random() * this.dungeon.rooms.length);
        } while (trainingmapparams.exit == 0);

        do {
          trainingmapparams.treasure = Math.floor(Math.random() * this.dungeon.rooms.length);
        } while ((trainingmapparams.treasure == 0)||(trainingmapparams.exit == trainingmapparams.treasure));

        trainingmapparams.doitonce[0] = false;

      }

        trainingmapparams.dungeoncopie.push(this.dungeon);


        // Creating a blank tilemap with dimensions matching the dungeon
        this.map = this.make.tilemap({ tileWidth: 16, tileHeight: 16, width: this.dungeon.width, height: this.dungeon.height });

        // addTilesetImage: function (tilesetName, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid)

        var tileset = this.map.addTilesetImage('tiles', 'tiles', 16, 16, 1, 2);

        this.layer = this.map.createBlankLayer('Layer 1', tileset);

        if (!debug)
        {
            this.layer.setScale(3);
        }

        // Fill with black tiles
        this.layer.fill(20);

        // Use the array of rooms generated to place tiles in the map

        // console.log(this.dungeon.rooms);

        this.dungeon.rooms.forEach(function (room, index) {
            var x = room.x;
            var y = room.y;
            var w = room.width;
            var h = room.height;
            var cx = Math.floor(x + w / 2);
            var cy = Math.floor(y + h / 2);
            var left = x;
            var right = x + (w - 1);
            var top = y;
            var bottom = y + (h - 1);

            // Fill the floor with mostly clean tiles, but occasionally place a dirty tile
            // See "Weighted Randomize" example for more information on how to use weightedRandomize.
            this.map.weightedRandomize(TILES.FLOOR, x, y, w, h);

        
            // Place the room corners tiles
            this.map.putTileAt(TILES.TOP_LEFT_WALL, left, top);
            this.map.putTileAt(TILES.TOP_RIGHT_WALL, right, top);
            this.map.putTileAt(TILES.BOTTOM_RIGHT_WALL, right, bottom);
            this.map.putTileAt(TILES.BOTTOM_LEFT_WALL, left, bottom);

            // Fill the walls with mostly clean tiles, but occasionally place a dirty tile
            this.map.weightedRandomize(TILES.TOP_WALL, left + 1, top, w - 2, 1);
            this.map.weightedRandomize(TILES.BOTTOM_WALL, left + 1, bottom, w - 2, 1);
            this.map.weightedRandomize(TILES.LEFT_WALL, left, top + 1, 1, h - 2);
            this.map.weightedRandomize(TILES.RIGHT_WALL, right, top + 1, 1, h - 2);

            // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the rooms location
            var doors = room.getDoorLocations();

            for (var i = 0; i < doors.length; i++)
            {
                this.map.putTileAt(6, x + doors[i].x, y + doors[i].y);
            }


             if (trainingmapparams.exit == index) {

             this.layer.putTileAt(81, cx, cy); // Stairs
             trainingmapparams.exitroom.push(room);

             };

             if (trainingmapparams.treasure == index) {

              this.layer.putTileAt(166, cx, cy); // Chest
              trainingmapparams.treasureroom.push(room);
 
              };

        }, this);


        // Not exactly correct for the tileset since there are more possible floor tiles, but this will
        // do for the example.
        this.layer.setCollisionByExclusion([ 6, 7, 8, 26 ]);

        // Hide all the rooms
        if (!debug)
        {
            this.layer.forEachTile(function (tile) { tile.alpha = 0; });
        }

        // Place the player in the first room

        var playerRoom = this.dungeon.rooms[0];

        trainingmapparams.player = this.add.graphics({ fillStyle: { color: 0xedca40, alpha: 1 } }).fillRect(0, 0, this.map.tileWidth * this.layer.scaleX, this.map.tileHeight * this.layer.scaleY);

        if(trainingmapparams.doitonce[1]== true) {

          trainingmapparams.player.x = this.map.tileToWorldX(playerRoom.x + 1);
          trainingmapparams.player.y = this.map.tileToWorldY(playerRoom.y + 1);

        trainingmapparams.doitonce[1] = false;
          
      } else {

        console.log(trainingmapparams.saveplayercoordinate);

        trainingmapparams.player.x = trainingmapparams.saveplayercoordinate[0]?.x;

        trainingmapparams.player.y = trainingmapparams.saveplayercoordinate[0]?.y;

        this.setRoomAlpha(playerRoom, 1); 

        trainingmapparams.discoverdrooms?.forEach(room => {

          this.setRoomAlpha(room, 0.5);

          console.log(room);

        })

      };

        if (!debug)
        {
            this.setRoomAlpha(playerRoom, 1); // Make the starting room visible
        }

        // Scroll to the player
        this.cam = this.cameras.main;

        this.cam.setBounds(0, 0, this.layer.width * this.layer.scaleX, this.layer.height * this.layer.scaleY);
        this.cam.scrollX = trainingmapparams.player.x - this.cam.width * 0.5;
        this.cam.scrollY = trainingmapparams.player.y - this.cam.height * 0.5;

        this.cursors = this.input.keyboard.createCursorKeys();

        var help = this.add.text(16, 16, 'Arrows keys to move', {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#ffffff',
            fill: '#000000'
        });


        help.setScrollFactor(0);

        let randomweapon = new Weapon(`old sword lvl ${battleparams.levelstacker}`, 10 * battleparams.levelstacker, Math.min(5*battleparams.levelstacker,30), 1.25*battleparams.levelstacker, 1, characterparams.potentie[this.random(1)], characterparams.element[this.random(3)]);

        inventoryparams.weaponset.length<15? inventoryparams.weaponset.push(randomweapon) : (inventoryparams.weaponset=[],inventoryparams.weaponset.push(randomweapon));


      }
  

    

    update (time, delta)
    {
        this.dungeon = trainingmapparams.dungeoncopie[trainingmapparams.dungeoncopie.length-1];

        this.updatePlayerMovement(time);

        let playerTileX = this.scene.scene.map.worldToTileX(trainingmapparams.player.x);
        let playerTileY = this.scene.scene.map.worldToTileY(trainingmapparams.player.y);

        // Another helper method from the dungeon - dungeon XY (in tiles) -> room
        let room = this.dungeon.getRoomAt(playerTileX, playerTileY);

        // If the player has entered a new room, make it visible and dim the last room
        if (room && this.activeRoom && this.activeRoom !== room)
        {
            if (!debug)
            {
                this.setRoomAlpha(room, 1);
                this.setRoomAlpha(this.activeRoom, 0.5);

                trainingmapparams.discoverdrooms.push(room);

            }
        }


          let currentroom = this.dungeon.getRoomAt(playerTileX, playerTileY);

          if ( currentroom == trainingmapparams.exitroom[trainingmapparams.exitroom.length-1]){

             let message = new Message(`Endmessage`, this.scene, 400, 600, `You find the exit!, Do you want to proceed to next floor?` );

            message.messagegen(48).setScrollFactor(0);

            let message2 = new Message(`Yes`, this.scene, 400, 700, `Yes, Press ENTER` );

            message2.messagegen(48).setScrollFactor(0);

            this.input.keyboard.on('keydown-ENTER', ()=> {

              if(trainingmapparams.leveluponce == true){
              
                trainingmapparams.leveluponce = false;
              trainingmapparams.floor = trainingmapparams.floor+1;};

              if(trainingmapparams.floor == trainingmapparams.floorsize){

                trainingmapparams.winflag = true;
      
                let message3 = new Message(`Congrat`, this.scene, 400, 350, `Congrat! you complete the game!` );

                message3.messagegen(48).setScrollFactor(0);

                let score = battleparams.nbwin*5-battleparams.nblose*3

                let message4 = new Message(`Score`, this.scene, 400, 450, `Your score:${score}` );

                message4.messagegen(48).setScrollFactor(0);

              };


              if (trainingmapparams.winflag == false){

        
              setTimeout(() => {

                this.resetdungeon(); this.scene.stop().start('Main');
  
              }, 150)

                } else {{this.input.keyboard.off('keydown-ENTER')}};
  
    
            });

            setTimeout(() => {

              message.name.destroy();

              message2.name.destroy();

            },1);

        } else if (( currentroom != trainingmapparams.exitroom[trainingmapparams.exitroom.length-1])){this.input.keyboard.off('keydown-ENTER')};


        if ( currentroom == trainingmapparams.treasureroom[trainingmapparams.treasureroom.length-1]){

    

          if (trainingmapparams.getrewardonce == true){

            battleparams.dungeoncompletionbonus = battleparams.dungeoncompletionbonus +10*trainingmapparams.floor;

          let message = new Message(`Treasure`, this.scene, 300, 600, `You find  a chest! You get a permanant attack+${battleparams.dungeoncompletionbonus} bonus` );

          trainingmapparams.getrewardonce = false;

          console.log( battleparams.dungeoncompletionbonus);

          message.messagegen(48).setScrollFactor(0);

          setTimeout(() => {message.name.destroy()},2000);

        };

         

     };



        this.activeRoom = room;

        // Smooth follow the player
        var smoothFactor = 0.9;

        this.cam.scrollX = smoothFactor * this.cam.scrollX + (1 - smoothFactor) * (trainingmapparams.player.x - this.cam.width * 0.5);
        this.cam.scrollY = smoothFactor * this.cam.scrollY + (1 - smoothFactor) * (trainingmapparams.player.y - this.cam.height * 0.5);

        characterparams.actualstyle.setText(`Actual style: ${battleparams.styles[battleparams.choosedstyle].name}`);


    }

    // Helpers functions
    setRoomAlpha(room, alpha)
    {
        this.map.forEachTile(function (tile) {
            tile.alpha = alpha;
        }, this, room.x, room.y, room.width, room.height)
    }

    isTileOpenAt (worldX, worldY)
    {
        // nonNull = true, don't return null for empty tiles. This means null will be returned only for
        // tiles outside of the bounds of the map.
        var tile = this.map.getTileAtWorldXY(worldX, worldY, true);

        if (tile && !tile.collides)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    randomizebattle(){

      let random = Math.random();

      // console.log(random);
    
      random<0.0005? (trainingmapparams.saveplayercoordinate=[],trainingmapparams.saveplayercoordinate.push({x:trainingmapparams.player.x, y:trainingmapparams.player.y}),this.scene.stop().start('Battle')) : '';


    }


    updatePlayerMovement (time)
    {
        var tw = this.map.tileWidth * this.layer.scaleX;
        var th = this.map.tileHeight * this.layer.scaleY;
        var repeatMoveDelay = 100;

        if (time > this.lastMoveTime + repeatMoveDelay) {
            if (this.cursors.down.isDown)
            {
                if (this.isTileOpenAt(trainingmapparams.player.x, trainingmapparams.player.y + th))
                {
              
                  trainingmapparams.player.y += th;
                    this.lastMoveTime = time;
                   this.randomizebattle() ;
                }
            }
            else if (this.cursors.up.isDown)
            {
                if (this.isTileOpenAt(trainingmapparams.player.x, trainingmapparams.player.y - th))
                {
     
                  trainingmapparams.player.y -= th;
                    this.lastMoveTime = time;
                    this.randomizebattle() ;
                }
            }

            if (this.cursors.left.isDown)
            {
                if (this.isTileOpenAt(trainingmapparams.player.x - tw, trainingmapparams.player.y))
                {

                  trainingmapparams.player.x -= tw;
                    this.lastMoveTime = time;
                    this.randomizebattle() ;
                }
            }
            else if (this.cursors.right.isDown)
            {
                if (this.isTileOpenAt(trainingmapparams.player.x + tw, trainingmapparams.player.y))
                {
          
                  trainingmapparams.player.x += tw;
                    this.lastMoveTime = time;
                    this.randomizebattle() ;
                }
            }
        }
    }




      }


      const trainingmapparams = new Trainingmap();


const configmain = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    scene: [Trainingmap, CharacterMenu, Battlescene, Inventory, Reward],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};


const game = new Phaser.Game(configmain);


// Minified & modified dungeon generator at mikewesthad/dungeon (fork of nickgravelyn/dungeon)
!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.Dungeon=o():t.Dungeon=o()}("undefined"!=typeof self?self:this,function(){return function(t){function o(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}var e={};return o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},o.p="",o(o.s=1)}([function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={EMPTY:0,WALL:1,FLOOR:2,DOOR:3};o.default=r},function(t,o,e){"use strict";t.exports=e(2).default},function(t,o,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function t(t,o){var e=[],r=!0,i=!1,n=void 0;try{for(var h,a=t[Symbol.iterator]();!(r=(h=a.next()).done)&&(e.push(h.value),!o||e.length!==o);r=!0);}catch(t){i=!0,n=t}finally{try{!r&&a.return&&a.return()}finally{if(i)throw n}}return e}return function(o,e){if(Array.isArray(o))return o;if(Symbol.iterator in Object(o))return t(o,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=function(){function t(t,o){for(var e=0;e<o.length;e++){var r=o[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(o,e,r){return e&&t(o.prototype,e),r&&t(o,r),o}}(),a=e(3),s=e(4),u=r(s),f=e(0),l=r(f),d=e(5),m={width:50,height:50,rooms:{width:{min:5,max:15,onlyOdd:!1,onlyEven:!1},height:{min:5,max:15,onlyOdd:!1,onlyEven:!1},maxArea:150,maxRooms:50}},c=function(){function t(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t);var e=o.rooms||{};e.width=Object.assign({},m.rooms.width,e.width),e.height=Object.assign({},m.rooms.height,e.height),e.maxArea=e.maxArea||m.rooms.maxArea,e.maxRooms=e.maxRooms||m.rooms.maxRooms,e.width.min<3&&(e.width.min=3),e.height.min<3&&(e.height.min=3),e.width.max<e.width.min&&(e.width.max=e.width.min),e.height.max<e.height.min&&(e.height.max=e.height.min);var r=e.width.min*e.height.min;e.maxArea<r&&(e.maxArea=r),this.width=o.width||m.width,this.height=o.height||m.height,this.roomConfig=e,this.rooms=[],this.roomGrid=[],this.generate(),this.tiles=this.getTiles()}return h(t,[{key:"drawToConsole",value:function(t){(0,d.debugMap)(this,t)}},{key:"generate",value:function(){this.rooms=[],this.roomGrid=[];for(var t=0;t<this.height;t++){this.roomGrid.push([]);for(var o=0;o<this.width;o++)this.roomGrid[t].push([])}var e=this.createRandomRoom();e.setPosition(Math.floor(this.width/2)-Math.floor(e.width/2),Math.floor(this.height/2)-Math.floor(e.height/2)),this.addRoom(e);for(var r=5*this.roomConfig.maxRooms;this.rooms.length<this.roomConfig.maxRooms&&r>0;)this.generateRoom(),r-=1;for(var i=0;i<this.rooms.length;i++)for(var h=this.getPotentiallyTouchingRooms(this.rooms[i]),a=0;a<h.length;a++)if(!this.rooms[i].isConnectedTo(h[a])&&Math.random()<.2){var s=this.findNewDoorLocation(this.rooms[i],h[a]),u=n(s,2),f=u[0],l=u[1];this.addDoor(f),this.addDoor(l)}}},{key:"getRoomAt",value:function(t,o){return t<0||o<0||t>=this.width||o>=this.height?null:this.roomGrid[o][t][0]}},{key:"getMappedTiles",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t=Object.assign({},{empty:0,wall:1,floor:2,door:3},t),this.tiles.map(function(o){return o.map(function(o){return o===l.default.EMPTY?t.empty:o===l.default.WALL?t.wall:o===l.default.FLOOR?t.floor:o===l.default.DOOR?t.door:void 0})})}},{key:"addRoom",value:function(t){if(!this.canFitRoom(t))return!1;this.rooms.push(t);for(var o=t.top;o<=t.bottom;o++)for(var e=t.left;e<=t.right;e++)this.roomGrid[o][e].push(t);return!0}},{key:"canFitRoom",value:function(t){if(t.x<0||t.x+t.width>this.width-1)return!1;if(t.y<0||t.y+t.height>this.height-1)return!1;for(var o=0;o<this.rooms.length;o++)if(t.overlaps(this.rooms[o]))return!1;return!0}},{key:"createRandomRoom",value:function(){var t=0,o=0,e=0,r=this.roomConfig;do{t=(0,a.randomInteger)(r.width.min,r.width.max,{onlyEven:r.width.onlyEven,onlyOdd:r.width.onlyOdd}),o=(0,a.randomInteger)(r.height.min,r.height.max,{onlyEven:r.height.onlyEven,onlyOdd:r.height.onlyOdd}),e=t*o}while(e>r.maxArea);return new u.default(t,o)}},{key:"generateRoom",value:function(){for(var t=this.createRandomRoom(),o=150;o>0;){var e=this.findRoomAttachment(t);if(t.setPosition(e.x,e.y),this.addRoom(t)){var r=this.findNewDoorLocation(t,e.target),i=n(r,2),h=i[0],a=i[1];this.addDoor(h),this.addDoor(a);break}o-=1}}},{key:"getTiles",value:function(){for(var t=Array(this.height),o=0;o<this.height;o++){t[o]=Array(this.width);for(var e=0;e<this.width;e++)t[o][e]=l.default.EMPTY}for(var r=0;r<this.rooms.length;r++)for(var i=this.rooms[r],n=0;n<i.height;n++)for(var h=0;h<i.width;h++)t[n+i.y][h+i.x]=i.tiles[n][h];return t}},{key:"getPotentiallyTouchingRooms",value:function(t){for(var o=[],e=function(e,r,i){for(var n=i[r][e],h=0;h<n.length;h++)if(n[h]!=t&&o.indexOf(n[h])<0){var a=e-n[h].x,s=r-n[h].y;(a>0&&a<n[h].width-1||s>0&&s<n[h].height-1)&&o.push(n[h])}},r=t.x+1;r<t.x+t.width-1;r++)e(r,t.y,this.roomGrid),e(r,t.y+t.height-1,this.roomGrid);for(var i=t.y+1;i<t.y+t.height-1;i++)e(t.x,i,this.roomGrid),e(t.x+t.width-1,i,this.roomGrid);return o}},{key:"findNewDoorLocation",value:function(t,o){var e={x:-1,y:-1},r={x:-1,y:-1};return t.y===o.y-t.height?(e.x=r.x=(0,a.randomInteger)(Math.floor(Math.max(o.left,t.left)+1),Math.floor(Math.min(o.right,t.right)-1)),e.y=t.y+t.height-1,r.y=o.y):t.x==o.x-t.width?(e.x=t.x+t.width-1,r.x=o.x,e.y=r.y=(0,a.randomInteger)(Math.floor(Math.max(o.top,t.top)+1),Math.floor(Math.min(o.bottom,t.bottom)-1))):t.x==o.x+o.width?(e.x=t.x,r.x=o.x+o.width-1,e.y=r.y=(0,a.randomInteger)(Math.floor(Math.max(o.top,t.top)+1),Math.floor(Math.min(o.bottom,t.bottom)-1))):t.y==o.y+o.height&&(e.x=r.x=(0,a.randomInteger)(Math.floor(Math.max(o.left,t.left)+1),Math.floor(Math.min(o.right,t.right)-1)),e.y=t.y,r.y=o.y+o.height-1),[e,r]}},{key:"findRoomAttachment",value:function(t){var o=(0,a.randomPick)(this.rooms),e=0,r=0;switch((0,a.randomInteger)(0,3)){case 0:e=(0,a.randomInteger)(o.left+2-(t.width-1),o.right-2),r=o.top-t.height;break;case 1:e=o.left-t.width,r=(0,a.randomInteger)(o.top+2-(t.height-1),o.bottom-2);break;case 2:e=o.right+1,r=(0,a.randomInteger)(o.top+2-(t.height-1),o.bottom-2);break;case 3:e=(0,a.randomInteger)(o.left+2-(t.width-1),o.right-2),r=o.bottom+1}return{x:e,y:r,target:o}}},{key:"addDoor",value:function(t){for(var o=this.roomGrid[t.y][t.x],e=0;e<o.length;e++){var r=o[e],i=t.x-r.x,n=t.y-r.y;r.tiles[n][i]=l.default.DOOR}}}]),t}();o.default=c},function(t,o,e){"use strict";function r(t,o){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=e.onlyOdd,h=void 0!==r&&r,a=e.onlyEven,s=void 0!==a&&a;return h?n(t,o):s?i(t,o):Math.floor(Math.random()*(o-t+1)+t)}function i(t,o){t%2!=0&&t<o&&t++,o%2!=0&&o>t&&o--;var e=(o-t)/2;return 2*Math.floor(Math.random()*(e+1))+t}function n(t,o){t%2==0&&t++,o%2==0&&o--;var e=(o-t)/2;return 2*Math.floor(Math.random()*(e+1))+t}function h(t){return t[r(0,t.length-1)]}Object.defineProperty(o,"__esModule",{value:!0}),o.randomInteger=r,o.randomEvenInteger=i,o.randomOddInteger=n,o.randomPick=h},function(t,o,e){"use strict";function r(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function t(t,o){for(var e=0;e<o.length;e++){var r=o[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(o,e,r){return e&&t(o.prototype,e),r&&t(o,r),o}}(),n=e(0),h=function(t){return t&&t.__esModule?t:{default:t}}(n),a=function(){function t(o,e){r(this,t),this.width=o,this.height=e,this.setPosition(0,0),this.doors=[],this.tiles=[];for(var i=0;i<this.height;i++){for(var n=[],a=0;a<this.width;a++)0==i||i==this.height-1||0==a||a==this.width-1?n.push(h.default.WALL):n.push(h.default.FLOOR);this.tiles.push(n)}}return i(t,[{key:"setPosition",value:function(t,o){this.x=t,this.y=o,this.left=t,this.right=t+(this.width-1),this.top=o,this.bottom=o+(this.height-1),this.centerX=t+Math.floor(this.width/2),this.centerY=o+Math.floor(this.height/2)}},{key:"getDoorLocations",value:function(){for(var t=[],o=0;o<this.height;o++)for(var e=0;e<this.width;e++)this.tiles[o][e]==h.default.DOOR&&t.push({x:e,y:o});return t}},{key:"overlaps",value:function(t){return!(this.right<t.left)&&(!(this.left>t.right)&&(!(this.bottom<t.top)&&!(this.top>t.bottom)))}},{key:"isConnectedTo",value:function(t){for(var o=this.getDoorLocations(),e=0;e<o.length;e++){var r=o[e];if(r.x+=this.x,r.y+=this.y,r.x-=t.x,r.y-=t.y,!(r.x<0||r.x>t.width-1||r.y<0||r.y>t.height-1)&&t.tiles[r.y][r.x]==h.default.DOOR)return!0}return!1}}]),t}();o.default=a},function(t,o,e){"use strict";function r(t){var o=t.roomGrid.map(function(t){return t.map(function(t){return(""+t.length).padStart(2)})});console.log(o.map(function(t){return t.join(" ")}).join("\n"))}function i(t){var o,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e=Object.assign({},{empty:" ",emptyColor:"rgb(0, 0, 0)",wall:"#",wallColor:"rgb(255, 0, 0)",floor:"_",floorColor:"rgb(210, 210, 210)",door:".",doorColor:"rgb(0, 0, 255)",fontSize:"15px"},e);for(var r="",i=[],n=0;n<t.height;n+=1){for(var a=0;a<t.width;a+=1){var s=t.tiles[n][a];s===h.default.EMPTY?(r+="%c"+e.empty,i.push("color: "+e.emptyColor+"; font-size: "+e.fontSize)):s===h.default.WALL?(r+="%c"+e.wall,i.push("color: "+e.wallColor+"; font-size: "+e.fontSize)):s===h.default.FLOOR?(r+="%c"+e.floor,i.push("color: "+e.floorColor+"; font-size: "+e.fontSize)):s===h.default.DOOR&&(r+="%c"+e.door,i.push("color: "+e.doorColor+"; font-size: "+e.fontSize)),r+=" "}r+="\n"}(o=console).log.apply(o,[r].concat(i))}Object.defineProperty(o,"__esModule",{value:!0}),o.debugRoomGrid=r,o.debugMap=i;var n=e(0),h=function(t){return t&&t.__esModule?t:{default:t}}(n)}])});



