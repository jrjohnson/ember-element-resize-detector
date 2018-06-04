import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  notify: service(),

  actions: {
    resize({ width, height }, element) {
      this.get('notify').info(`${element.id} resized to ${width} by ${ height }`);
    }
  }
});