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
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';
  
  /**
  The idea here is that both the client and the server will keep
  */

  var presenter = {
    Presenter: function(model, upstreamPresenter) {},
    
    PresenterToServer: function( /*http info*/ ) {},
    
    PresenterToDatabase: function( /*http info*/ ) {},
  };
  
  presenter

  return presenter;
});


(function() {

  var Presenter = function(options) { // options includes info about upstream datasource
  };
  
  Presenter.prototype.update = function(request) {  // request includes enough info to perform incremental update
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports.Presenter = Presenter;
  else
    window.Presenter = Presenter;
})();