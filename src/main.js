// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import DhwaniViewPort from '@/components/dhwani-viewport/dhwani-viewport'
import BohemianDhwani from '@/components/dhwani-viewport/dhwani-viewport-components/static/BohemianDhwani'
import DhwaniAbout from '@/components/dhwani-viewport/dhwani-viewport-components/static/DhwaniAbout'
import Workspace1 from '@/components/dhwani-viewport/dhwani-viewport-components/common/Workspace1'
import Workspace2 from '@/components/dhwani-viewport/dhwani-viewport-components/common/Workspace2'
import NotFound from '@/components/404'

Vue.config.productionTip = false

const routes = {
  '/': BohemianDhwani,
  '/about': DhwaniAbout
}

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
// eslint-disable-next-line
const vm = new Vue({
  el: '#dhwani-viewport',
  data: function () {
    return {
      currentRoute: window.location.pathname
    }
  },
  methods: {
    switchWorkspaceInit: function (createElement, ElementComponent) {
      if (this._currentComponent == null || this._currentComponent === ElementComponent) {
        this._currentComponent = ElementComponent
        this._currentWorkspace = 2
        console.log('gets here')
        return createElement('div', {}, [createElement(DhwaniViewPort, {}, [createElement(Workspace1, {}, [this.$slots.default, createElement(ElementComponent, {}, [])]), createElement(Workspace2, {}, [this.$slots.Workspace2])])])
      } else {
        var returnCreateElement = null
        if (this._currentWorkspace === 1) {
          this._currentWorkspace = 2
          console.log('shifted workspace to 2')
          returnCreateElement = createElement('div', {}, [createElement(DhwaniViewPort, {}, [createElement(Workspace1, {}, [this.$slots.default, createElement(this._currentComponent, {}, [])]), createElement(Workspace2, {}, [this.$slots.Workspace2, createElement(ElementComponent, {}, [])])])])
          this._currentComponent = ElementComponent
          return returnCreateElement
        } else if (this._currentWorkspace === 2) {
          this._currentWorkspace = 1
          console.log('shifted workspace to 1')
          returnCreateElement = createElement('div', {}, [createElement(DhwaniViewPort, {}, [createElement(Workspace1, {}, [this.$slots.default, createElement(ElementComponent, {}, [])]), createElement(Workspace2, {}, [this.$slots.Workspace2, createElement(this._currentComponent, {}, [])])])])
          this._currentComponent = ElementComponent
          return returnCreateElement
        }
      }
    },
    ViewComponent: function () {
      return routes[this.currentRoute] || NotFound
    },
    InitChange: function (newPath) {
      window.history.pushState('', '', newPath)
      this.currentRoute = newPath
      // console.log(this.currentRoute, this.ViewComponent())
    }
  },
  created: function () {
    // non reactive data
    this.__currentWorkspace = null
    this.__currentComponent = null
    this.$bus.$on('changePath', function (newPath) {
      vm.InitChange(newPath)
    })
  },
  render: function (createElement) {
    // console.log('hello')
    return this.switchWorkspaceInit(createElement, this.ViewComponent())
  }
})
