import $ from 'jquery';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { bind, scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/resize-detector';

export default Component.extend({
  layout,
  tagName: '',
  resizeDetector: service(),

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, this.setup);
  },

  setup() {
    this.callback = bind(this, this.onResize);
    this.get('resizeDetector').setup(this.get('selector'), this.callback);
  },

  teardown() {
    this.get('resizeDetector').teardown(this.get('selector'), this.callback);
  },

  onResize(element) {
    let $el = $(element);
    /* eslint ember/closure-actions:0 */
    this.sendAction('on-resize', {
      width: $el.width(),
      height: $el.height()
    }, element);
  },

  willDestroyElement() {
    this.teardown();

    this._super(...arguments);
  }
}).reopenClass({
  positionalParams: ['selector']
});
