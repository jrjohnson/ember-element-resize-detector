import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['resizable-container'],
  
  style: computed('height', 'width', function(){
    return htmlSafe(`height: ${this.get('height')}px; width: ${this.get('width')}px;}`);
  })
});