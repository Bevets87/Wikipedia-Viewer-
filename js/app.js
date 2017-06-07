(function () {
  'use strict'

  function App () {
    this.view = new app.View()
    this.controller = new app.Controller(this.view)
  }

  new App()
}())
