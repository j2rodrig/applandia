/*
  Copyright (C) 2015 Jonathan Rodriguez at the University of Waterloo, Ontario, Canada.
  Credit to Mario Casciaro of object-path (2015) for the approach to module wrapping.
*/
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.modelspawn = factory();
  }
})(this, function(){
  'use strict';

  var modelspawn = function(refreshFn) {
    // Default model data
    var model = {
      networkSkill: 0.0,
      sector: [
        { name: "Sector 1", inBusinessPlan: false, inProductDev: false, planDevPercent: 0.0, productDevPercent: 0.0 },
        { name: "Sector 2", inBusinessPlan: false, inProductDev: false, planDevPercent: 0.0, productDevPercent: 0.0 },
      ],
    };
    
    model.get = function(path, defaultValue) {
      return objectPath.get(model, path, defaultValue);
    };
    model.set = function(path, value, doNotReplace) {
      objectPath.set(model, path, value, doNotReplace);
      if (typeof(refreshFn) !== "undefined") refreshFn();
    };
    model.setNoUpdate = function(path, value, doNotReplace) {
      objectPath.set(model, path, value, doNotReplace);
    };
    model.toggle = function(path, beforeToggleDefaultValue) {
      model.set(path, !model.get(path, beforeToggleDefaultValue));
    };
    return model;
  };
  
  return modelspawn;
});
