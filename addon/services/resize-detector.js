/* global elementResizeDetectorMaker */

import $ from 'jquery';

import Service from '@ember/service';

import Ember from 'ember';

const {
  Logger: { error }
} = Ember;

export default Service.extend({

  init() {
    this._super(...arguments);
    this.detector = elementResizeDetectorMaker({
      strategy: "scroll"
    });
  },

  setup(selector, callback) {
    let [element] = $(selector).toArray();
    if (!element) {
      error(`service:resize-detector - could not find an element matching ${selector}`);
      return;
    }
    this.detector.listenTo(element, callback);
  },

  teardown(selector, callback) {
    let [element] = $(selector).toArray();
    if (element) {
      this.detector.removeListener(element, callback);
    }
  }

});
