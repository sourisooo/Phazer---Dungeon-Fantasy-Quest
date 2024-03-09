
class CharacterMenu extends Phaser.Scene
{
    BDM=1;
    CritD=2;
    LStrike=0.1;
    Defense=0.2;
    MDefense=0.2;
    Evasion=0.1;
    PhysicalP=1;
    fire = 3;
    ice = 1;
    thunder = 1;
    earth = 1;
    fireResistance = -3;
    iceResistance = 1;
    thunderResistance = 1;
    earthResistance = 1;
    Speed = 100;
    Luck = 0.05;
    outputdamage = [];
    Crittrigger = false;
    HP = 500;
    DefaultBDM = 1;

  constructor() {
    super('Main'); // Scene key
  }



    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('charactersheet', './Default_character_sheet_for_rpg_game_3.jpg');



    }


    random(num){

        return Math.floor(Math.random() * num);

    }



    create ()
    {

      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(1600, 500, 'charactersheet');


      let title = this.add.text(100, 60, `Character stat`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
        
      title.on('pointerdown', () => (console.log('hello')));
        
      let stat1 = this.add.text(100, 100, `BaseDamageMultiplier: ${characterparams.DefaultBDM}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat2 = this.add.text(100, 140, `CritDamage: ${characterparams.CritD} (10% fixed rate occurence)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat3 = this.add.text(100, 180, `Luckystrike: ${characterparams.LStrike} (50% extra damage fixed damage)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat4 = this.add.text(100, 220, `Defense: ${characterparams.Defense} (Small damage mitigation but garanteed)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat5 = this.add.text(100, 260, `Magical Defense: ${characterparams.MDefense} (Small magical damage mitigation but garanteed)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat6 = this.add.text(100, 300, `Evade: ${characterparams.Evasion} (Full damage mitigation but weak occurence)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat7 = this.add.text(100, 340, `Physical potencie: ${characterparams.PhysicalP} (Physical extra damage also reduce you Magical defense)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat8 = this.add.text(100, 380, `Magical potencie: ${characterparams.PhysicalP} (Magical extra damage also reduce you Physical defense)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat9 = this.add.text(100, 420, `Fire potencie: ${characterparams.Firep} (deal double extra-damage against a vulnerablity but half extra damage otherwise. Also reduce your overall defense against the opposite element)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat10 = this.add.text(100, 460, `Ice potencie: ${characterparams.Icep} ( deal double extra-damage against a vulnerablity but half extra damage otherwise. Also reduce your overall defense against the opposite element)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat11 = this.add.text(100, 500, `Thunder potencie: ${characterparams.Thunderp} ( deal double extra-damage against a vulnerablity but half extra damage otherwise. Also reduce your overall defense against the opposite element)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat12 = this.add.text(100, 540, `Earth potencie: ${characterparams.Earthp} ( deal double extra-damage against a vulnerablity but half extra damage otherwise. Also reduce your overall defense against the opposite element)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat13 = this.add.text(100, 580, `Speed: ${characterparams.Speed} (Determine how many action you can perform per turn based on your opponent speed)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      let stat14 = this.add.text(100, 620, `Luck: ${characterparams.Luck} (Kill your adversaire in one blow)`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      
      let inventory = this.add.text(100, 700, `Open Inventory`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      inventory.on('pointerdown', () => (this.scene.stop().start('Inventory')));

      let battlestart = this.add.text(100, 740, `Start Battle`, { font: '26px Arial', fill: '#ffffff' }).setInteractive();

      battlestart.on('pointerdown', () => this.scene.stop().start('Battle'));

      let randomweapon = new Weapon(`old sword lvl ${battleparams.levelstacker}`, 10 * battleparams.levelstacker, 0.1, 0.1, 1, 'physical', 'fire');

      inventoryparams.weaponset.push(randomweapon);

      console.log(inventoryparams.weaponset);




    }


    update () 
    {
      
      // console.log(this.scene);

      // this.input.on('pointerdown', () => {this.scene.stop().start('Menu')})


 
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
  rollitonce = [true,true,true,true]


  constructor() {
    super('Battle'); // Scene key
  }
     


    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('Battletheme', './Default_two_knights_fighting_in_a_style_of_rpg_game_2d_style_3.jpg');



    }


    random(num){

        return Math.floor(Math.random() * num);

    }


    create ()
    {

      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(900, 400, 'Battletheme').setScale(0.5);


      let title = this.add.text(100, 60, `Battle lvl ${battleparams.levelstacker}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
  
      const enemy = new Enemy(300*battleparams.levelstacker,10*battleparams.levelstacker, 'fire', 50*battleparams.levelstacker*10, 1,[],battleparams.levelstacker);

      battleparams.enemy.push(enemy);

      console.log(battleparams.enemy[battleparams.enemy.length-1]);

      let enemyannouce = this.add.text(100, 100, `An ennemie is coming`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      let attackbutton = this.add.text(100, 140, `Click me to attack`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      battleparams.damagedoneTxt = this.add.text(100, 180, `Damage done: ${characterparams.outputdamage[battleparams.turn-1]}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      battleparams.damagereceivedTxt = this.add.text(100, 220, `Damage received: ${battleparams.enemy[battleparams.enemy.length-1].outputdamage[battleparams.turn-1] }`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      battleparams.turnTxt = this.add.text(100, 260, `Actual Turn : ${battleparams.turn}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      battleparams.HHPTxt = this.add.text(100, 300, `You HP : ${characterparams.HP}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      
      battleparams.HPTxt = this.add.text(100, 340, `Ennemy HP : ${battleparams.enemy[battleparams.enemy.length-1].HP}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
      

        this.events.on('CritChecker', () =>  {

          if (battleparams.rollitonce[0] ==true) {

          let random = this.random(100);

          console.log(random);

          random<10? characterparams.BDM = characterparams.BDM*characterparams.CritD : characterparams.BDM = characterparams.BDM ;

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


          let El = inventoryparams.weaponset[0].element

        inventoryparams.weaponset[0].element == battleparams.enemy[battleparams.enemy.length-1].element ? characterparams.BDM=characterparams.BDM*characterparams[El]:characterparams.BDM=characterparams.BDM;

        })

        this.events.on('EvadeChecker', () => {

          if (battleparams.rollitonce[2] ==true) {

          let random = this.random(100)/100;

          random<characterparams.Evasion ? battleparams.enemy[battleparams.enemy.length-1].BDM = 0.001 : battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM;

          battleparams.rollitonce[2]=false;

          }

        })

        this.events.on('DamageMitigation', () => {

          let El = battleparams.enemy[battleparams.enemy.length-1].element;

          // console.log(battleparams.enemy[battleparams.enemy.length-1].BDM, characterparams[El]);

          battleparams.enemy[battleparams.enemy.length-1].BDM = battleparams.enemy[battleparams.enemy.length-1].BDM*characterparams[El]*(1-characterparams.Defense);

          // console.log(battleparams.enemy[battleparams.enemy.length-1].BDM);

        })

        this.events.on('LuckChecker', () => {

          if (battleparams.rollitonce[3] ==true) {

          let random = this.random(100)/100;

          console.log(random, characterparams.Luck , random< characterparams.Luck);

          if (random<characterparams.Luck)  {battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP*0.1; alert("Luck! Your opponent is seriously wounded ")};

          battleparams.rollitonce[3] = false;

        } 


        })

      

        this.events.on('BattleStatus', () =>  {

          if (characterparams.HP<0)  {battleparams.battleover = true, setTimeout(() => this.scene.pause().start('Reward'),3000)};

          if (battleparams.enemy[battleparams.enemy.length-1].HP<0)  {battleparams.battleover = true, (setTimeout(() => this.scene.pause().start('Reward'),3000))};


        })


      this.events.on('PlayerAttack', () =>  {

        console.log(battleparams.battleover );

        console.log(battleparams.rollitonce);

        if (battleparams.battleover == false) {

        // let random = this.random(100);

        // let multiplier = characterparams.BDM;

        this.events.emit('CritChecker');

        this.events.emit('LuckystrikeChecker');

        this.events.emit('ElementChecker');

        this.events.emit('LuckChecker');


        if(inventoryparams.equippedweapon[0] == undefined) {characterparams.outputdamage.push(characterparams.BDM*inventoryparams.weaponset[0].attack);} 

        else { characterparams.outputdamage.push(characterparams.BDM*inventoryparams.equippedweapon[0].attack);}


        this.events.emit('DamageMitigation');

        this.events.emit('EvadeChecker');

        battleparams.enemy[battleparams.enemy.length-1].outputdamage.push(battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack);
    
        // console.log(characterparams.Crittrigger);

        characterparams.HP = characterparams.HP - battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack;

        battleparams.enemy[battleparams.enemy.length-1].HP = battleparams.enemy[battleparams.enemy.length-1].HP  - characterparams.BDM*inventoryparams.weaponset[0].attack;

        battleparams.eventslog.push(`Turn ${battleparams.turn}: You deal ${characterparams.BDM*inventoryparams.weaponset[0].attack} damages. You received ${battleparams.enemy[battleparams.enemy.length-1].BDM*battleparams.enemy[battleparams.enemy.length-1].attack} damages.`)


        battleparams.turn = battleparams.turn+1;

        characterparams.BDM = characterparams.DefaultBDM;

        battleparams.enemy[battleparams.enemy.length-1].BDM = 1;

        // console.log(this.scene.manager.scenes);

        this.events.emit('BattleStatus');

        // console.log(inventoryparams.weaponset)

        // console.log(characterparams.outputdamage);

        // console.log(battleparams.enemy[battleparams.enemy.length-1].outputdamage);

        // console.log(battleparams.enemy[battleparams.enemy.length-1])

        // return characterparams.outputdamage;  

      } else {this.events.emit('GameOver')}
       
      
      });

    
      

      if (battleparams.doitonce == true) {

      attackbutton.on('pointerdown', () => {this.events.emit('PlayerAttack')});

      battleparams.doitonce = false;

    };


    this.input.on('pointerdown', () => {


      battleparams.doitonce = true;

      battleparams.rollitonce = [true, true, true , true];

 
    });

    this.events.on('GameOver', () => {

      this.add.text(700, 50, `Battle over, please wait few sec`, { font: '30px Arial', fill: '#ffffff', marginLeft: '40 vw' });
            

    })
   

    }


    update () 
    {

      // console.log(battleparams.eventslog);


      battleparams.eventslog.forEach((element,ind) => {

       if (ind<12 ) {this.add.text(100, 340+(40*(ind+1)), `${element}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();}

       else {this.add.text(800, 100+(40*(ind+1-12)), `${element}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();}

  
      })


      battleparams.damagedoneTxt.setText(`Damage done: ${characterparams.outputdamage[battleparams.turn-1]}`);

      // setTimeout(() => {
      //   // Code to be executed after the delay
      //   battleparams.damagedoneTxt.visible = false;
      // }, 2000); // Delay in milliseconds

      battleparams.turnTxt.setText(`Actual turn: ${battleparams.turn}`);

      battleparams.damagereceivedTxt.setText(`Damage received: ${battleparams.enemy[battleparams.enemy.length-1].outputdamage[battleparams.turn-1] }`);

      battleparams.HHPTxt.setText(`Your HP: ${characterparams.HP}`);

      battleparams.HPTxt.setText(`Enemy HP: ${battleparams.enemy[battleparams.enemy.length-1].HP }`);

      // console.log(this.battleover, battleparams.enemy[battleparams.enemy.length-1].HP);

      // console.log(this.scene);

      // this.input.on('pointerdown', () => {this.scene.stop().start('Main')})

    

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


    random(num){

        return Math.floor(Math.random() * num);

    }


    create ()
    {
      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(1300, 450, 'Items').setScale(0.5);

      
      let title = this.add.text(100, 60, `Inventory click the weapon to equip it`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
  
       inventoryparams.equippedtext = this.add.text(100, 100, `Currently equipped ${inventoryparams.equippedweapon[0]}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();
  

      inventoryparams.weaponset.forEach((selection,ind) => {

        let weapon = this.add.text(100, 60+(40*(ind+2)), `${selection.name}, power: ${selection.attack}`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

        weapon.on('pointerdown', (element) => {

                console.log(inventoryparams.equippedweapon);

                inventoryparams.equippedweapon = [];

              inventoryparams.equippedweapon.push(selection);

        })
        
      })

      console.log(inventoryparams.weaponset);


      let back = this.add.text(500, 60, `Back to main`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      back.on('pointerdown', () => (this.scene.stop().start('Main')));



    }


    update () 
    {

      // console.log(this.scene);

      // this.input.on('pointerdown', () => {this.scene.stop().start('Main')})

      inventoryparams.equippedtext.setText(`Currently equipped: ${inventoryparams.equippedweapon[0]?.name}`);
    

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


    random(num){

        return Math.floor(Math.random() * num);

    }


    create ()
    {

      this.sprites = this.physics.add.group({ immovable: false });

      let sprite = this.sprites.create(800, 500, 'treasure');

      characterparams.HP = 5000;

      characterparams.outputdamage = [];

      battleparams.enemy[battleparams.enemy.length-1].HP = 3000;

      battleparams.enemy[battleparams.enemy.length-1].outputdamage = [];

      console.log(battleparams.enemy[battleparams.enemy.length-1]);

      battleparams.eventslog = [];

      battleparams.turn = 0;

      battleparams.doitonce = true;

      battleparams.battleover = false;

      battleparams.levelstacker = battleparams.levelstacker+0.5;

      let title = this.add.text(100, 60, `Reward`, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      let reward1 = this.add.text(100, 100, `Click me to Buff your BDM by 20%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward1.on('pointerdown', () => {characterparams.DefaultBDM = characterparams.BDM*1.2; this.scene.stop().start('Main'), 3000});

      let reward2 = this.add.text(100, 140, `Click me to Buff your CritDamage by 75%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward2.on('pointerdown', () => {characterparams.CritD = (characterparams.CritD+0.75); this.scene.stop().start('Main'), 3000});

      let reward3 = this.add.text(100, 180, `Click me to Buff your Luckystrike chance by 20%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward3.on('pointerdown', () => {characterparams.LStrike = (characterparams.LStrike+0.2); this.scene.stop().start('Main'), 3000});

      let reward4 = this.add.text(100, 220, `Click me to Buff your Defense by 50%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward4.on('pointerdown', () => {characterparams.Defense = (characterparams.Defense+0.5); this.scene.stop().start('Main'), 3000});

      let reward5 = this.add.text(100, 260, `Click me to Buff your evasion by 10%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward5.on('pointerdown', () => {characterparams.Evasion = (characterparams.Evasion+0.1); this.scene.stop().start('Main'), 3000});

      let reward6 = this.add.text(100, 300, `Click me to Buff your luck by 10%! `, { font: '16px Arial', fill: '#ffffff' }).setInteractive();

      reward6.on('pointerdown', () => {characterparams.Luck = (characterparams.Luck+0.1); this.scene.stop().start('Main'), 3000 });


    }


    update () 
    {

      // console.log(this.scene);

      // this.input.on('pointerdown', () => {this.scene.stop().start('Main')})

    

    }


    }

    const rewardparams = new Reward();


    class Enemy {
      constructor(health, attack, element, HP, BDM, outputdamage, level) {
        this.health = health;
        this.attack = attack;
        this.element = element;
        this.HP = HP;
        this.BDM = BDM;
        this.outputdamage = [...outputdamage];
        this.level = level;
      }
    
      // Enemy methods
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
    
      // Enemy methods
    }




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






