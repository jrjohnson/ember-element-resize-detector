import { htmlSafe } from '@ember/template';
import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | resize detector', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{resize-detector}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#resize-detector}}
        template block text
      {{/resize-detector}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  test('it triggers an action when target changes sizes', async function(assert) {

    assert.expect(2);

    this.set('style', htmlSafe('width: 300px; height: 300px;'));

    let received;
    this.actions.resized = function(lastSize){
      received = lastSize;
    };

    await render(hbs`
      {{resize-detector '#square' on-resize=(action 'resized')}}
      <div id="square" style={{style}}></div>
    `);

    later(() => {
      assert.deepEqual(received, { width: 300, height: 300 }, 'initial render caused size to be received');

      this.set('style', htmlSafe('width: 200px; height: 200px;'));
    }, 20);

    later(() => {
      assert.deepEqual(received, { width: 200, height: 200 }, 'received updated size');
    }, 70);

    return settled();
  });
});