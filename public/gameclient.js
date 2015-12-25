window.onload = function() {
  
  var socket = io();
  
  //socket.on("handshake", function(data) {
  //  console.log("got handshake: " + data);
  //  socket.emit("handshake2", data);
  //});
  
  var model = modelspawn(buildUI);  // spawn a model that rebuilds the UI view when updated
  
  //socket.on("model", function(m) {
  //  model = m;
  //  buildUI(model);
  //});

  var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create });

  function preload() {
    game.load.image('logo', 'phaser.png');
    game.load.image('ButtonBinarySliderOn', 'ButtonBinarySliderOn.png')
    game.load.image('ButtonBinarySliderOff', 'ButtonBinarySliderOff.png')
  }
  
  // Default model object. TODO: replace with server/db integration
  //function modelDefault() {
    //}
  
  function freshRenderState() {
    return {
      leftMargin: 20,
      x: 20,
      y: 20
    }
  }

  function create() {
    //console.log("objectPath = " + objectPath);
    //console.log("objectPath.get = " + objectPath.get);
    buildUI();
    //buildUI('ButtonBinarySliderOff')
  }
  
  function buildUI() {
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
    addSectorPivots(renderState)
    
    //game.add.button(30, 20, model, actionOnClick, this, 0, 0, 0);
  }
  
  function addSectorPivots(renderState) {
    var addColumnHeader = function() {
      var headerText1 = game.add.text(0, 0, "Sector", renderState.columnHeaderStyle);
      headerText1.setTextBounds(renderState.x, renderState.y + 3, 150, 50);
      renderState.x += 150;

      var headerText2 = game.add.text(0, 0, "In Plan", renderState.columnHeaderStyle);
      headerText2.setTextBounds(renderState.x + 20, renderState.y + 3, 100, 50);
      renderState.x += 120;

      var headerText2 = game.add.text(0, 0, "In Dev", renderState.columnHeaderStyle);
      headerText2.setTextBounds(renderState.x + 20, renderState.y + 3, 100, 50);

      renderState.y += 50;
      renderState.x = renderState.leftMargin;
    }
    var addSector = function(i) {
      //var sector = objectPath.get(model, ["sectorAlignment", which]); //model.sectorAlignment[which];

      var text = game.add.text(0, 0, model.get(["sector", i, "name"]), renderState.textStyle);
      text.setTextBounds(renderState.x, renderState.y + 3, 150, 50);
      renderState.x += 150;

      addOnOffSlider(model, ["sector", i, "inBusinessPlan"], renderState.x, renderState.y);
      renderState.x += 120;

      /*var updateInBusinessPlan = function() {
        sector.inBusinessPlan = !sector.inBusinessPlan;
        buildUI();
      }
      var inBusinessPlanImageKey = sector.inBusinessPlan ? 'ButtonBinarySliderOn' : 'ButtonBinarySliderOff';
      var enableInBusinessPlan = game.add.button(renderState.x, renderState.y, inBusinessPlanImageKey, updateInBusinessPlan, this, 0, 0, 0);
      renderState.x += 100;

      var updateInProductDev = function() {
        sector.inProductDev = !sector.inProductDev;
        buildUI();
      }
      var inProductDevImageKey = sector.inProductDev ? 'ButtonBinarySliderOn' : 'ButtonBinarySliderOff';
      var enableInProductDev = game.add.button(renderState.x, renderState.y, inProductDevImageKey, updateInProductDev, this, 0, 0, 0);
      */

      addOnOffSlider(model, ["sector", i, "inProductDev"], renderState.x, renderState.y);
      renderState.x = renderState.leftMargin;
      renderState.y += 50;
    }
    function addOnOffSlider(model, path, x, y) {
      var imagekey = model.get(path) ? 'ButtonBinarySliderOn' : 'ButtonBinarySliderOff';
      game.add.button(x, y, imagekey, function() { model.toggle(path) }, this, 0, 0, 0);
    }

    // Draw UI.
    addColumnHeader();
    for(i = 0; i < model.get(["sector"]).length; i++) {
      addSector(i);
    }
  }

  //function actionOnClick() {
  //  buildUI('ButtonBinarySliderOn')
    //}

};
