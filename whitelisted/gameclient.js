window.onload = function() {
  
  var socket = io();
  
  socket.on("handshake", function(data) {
    console.log("got handshake: " + data);
    socket.emit("handshake2", data);
  });

  var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create });

  function preload() {
    game.load.image('logo', 'phaser.png');
    game.load.image('ButtonBinarySliderOn', 'ButtonBinarySliderOn.png')
    game.load.image('ButtonBinarySliderOff', 'ButtonBinarySliderOff.png')
  }
  
  // Default model object. TODO: replace with server/db integration
  function modelDefault() {
    return {
      sectorAlignment: [
        { name: "Sector 1", inBusinessPlan: false, inProductDev: false, planDevPercent: 0.0, productDevPercent: 0.0 },
        { name: "Sector 2", inBusinessPlan: false, inProductDev: false, planDevPercent: 0.0, productDevPercent: 0.0 },
      ]
    }
  }
  
  function freshRenderState() {
    return {
      leftMargin: 20,
      x: 20,
      y: 20
    }
  }

  function create() {
    buildAccordingTo(modelDefault())
    //buildAccordingTo('ButtonBinarySliderOff')
  }
  
  function buildAccordingTo(model) {
    game.world.destroy(true, true)
    var renderState = freshRenderState()
    
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    
    var textStyle = { font: "24px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle" };
    renderState.textStyle = textStyle;

    var columnHeaderStyle = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle" };
    renderState.columnHeaderStyle = columnHeaderStyle;

    // TODO: header
    
    // TODO: choose which body to render    
    addSectorPivots(model, renderState)
    
    //game.add.button(30, 20, model, actionOnClick, this, 0, 0, 0);
  }
  
  function addSectorPivots(model, renderState) {
    var addColumnHeader = function() {
      var headerText1 = game.add.text(0, 0, "Sector", renderState.columnHeaderStyle);
      headerText1.setTextBounds(renderState.x, renderState.y + 3, 150, 50);
      renderState.x += 150;

      var headerText2 = game.add.text(0, 0, "In Plan", renderState.columnHeaderStyle);
      headerText2.setTextBounds(renderState.x + 20, renderState.y + 3, 100, 50);
      renderState.x += 100;

      var headerText2 = game.add.text(0, 0, "In Dev", renderState.columnHeaderStyle);
      headerText2.setTextBounds(renderState.x + 20, renderState.y + 3, 100, 50);

      renderState.y += 50;
      renderState.x = renderState.leftMargin;
    }
    var addSector = function(which) {
      var sector = objectPath.get(model, ["sectorAlignment", which]); //model.sectorAlignment[which];

      var text = game.add.text(0, 0, sector.name, renderState.textStyle);
      text.setTextBounds(renderState.x, renderState.y + 3, 150, 50);
      renderState.x += 150;

      var updateInBusinessPlan = function() {
        sector.inBusinessPlan = !sector.inBusinessPlan;
        buildAccordingTo(model);
      }
      var inBusinessPlanImageKey = sector.inBusinessPlan ? 'ButtonBinarySliderOn' : 'ButtonBinarySliderOff';
      var enableInBusinessPlan = game.add.button(renderState.x, renderState.y, inBusinessPlanImageKey, updateInBusinessPlan, this, 0, 0, 0);
      renderState.x += 100;

      var updateInProductDev = function() {
        sector.inProductDev = !sector.inProductDev;
        buildAccordingTo(model);
      }
      var inProductDevImageKey = sector.inProductDev ? 'ButtonBinarySliderOn' : 'ButtonBinarySliderOff';
      var enableInProductDev = game.add.button(renderState.x, renderState.y, inProductDevImageKey, updateInProductDev, this, 0, 0, 0);

      renderState.y += 50;
      renderState.x = renderState.leftMargin;
    }
    addColumnHeader();
    for(i = 0; i < model.sectorAlignment.length; i++) {
      addSector(i);
    }
  }

  //function actionOnClick() {
  //  buildAccordingTo('ButtonBinarySliderOn')
    //}

};
