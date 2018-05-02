import * as tf from '@tensorflow/tfjs';

/**
 * Main application to start on window load
 */
class Main {
  /**
   * Constructor creates and initializes the variables needed for
   * the application
   */
  constructor() {
    // Initiate variables

    tf.loadModel('model/model.json').then((model) => {
      this.model = model;
      this.enableGeneration();
    });
  }

  /**
   * Called after model has finished loading or generating. 
   * Sets up UI elements.
   */
  enableGeneration() {

  }
}

window.addEventListener('load', () => new Main());
