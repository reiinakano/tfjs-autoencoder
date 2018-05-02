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
    this.originalImg = document.getElementById('original-img');
    this.noisyImg = document.getElementById('noisy-img');
    this.restoredImg = document.getElementById('restored-img');
    this.newDigit = document.getElementById('new-digit');
    this.newNoise = document.getElementById('new-noise');
    this.fixImg = document.getElementById('fix-img');

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
