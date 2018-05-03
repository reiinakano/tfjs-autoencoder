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
    // Initialize images
    this.originalImg = document.getElementById('original-img');
    this.originalImg.style.width = "112px";
    this.originalImg.style.height = "112px";
    this.noisyImg = document.getElementById('noisy-img');
    this.noisyImg.style.width = "112px";
    this.noisyImg.style.height = "112px";
    this.restoredImg = document.getElementById('restored-img');
    this.restoredImg.style.width = "112px";
    this.restoredImg.style.height = "112px";

    // Initialize buttons
    this.newDigit = document.getElementById('new-digit');
    this.newDigit.onclick = () => this.updateInputTensor();
    this.newNoise = document.getElementById('new-noise');
    this.newNoise.onclick = () => this.updateNoiseTensor();

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
    this.noiseTensor = tf.randomNormal([28, 28, 1], 0, 0.5);
    this.updateInputTensor();
  }

  updateInputTensor() {
    // TODO: Don't load this in immediately. Add it with noise.
    let randInt = Math.floor(Math.random() * 1002);
    let temp = new Image();
    temp.src = 'test_digits/' + randInt + '.png';
    temp.onload = () => {
      if (this.inputTensor) {
        this.inputTensor.dispose();
      }
      this.inputTensor = tf.tidy(() =>
        tf.fromPixels(temp, 1).toFloat().div(tf.scalar(255))
      );
      tf.toPixels(this.inputTensor, this.originalImg);
      this.updateDistortedTensor();
    }
  }

  updateNoiseTensor() {
    this.noiseTensor.dispose();
    this.noiseTensor = tf.randomNormal([28, 28, 1], 0, 0.5);
    this.updateDistortedTensor();
  }

  updateDistortedTensor() {
    if (this.distortedTensor) {
      this.distortedTensor.dispose();
    }
    this.distortedTensor = tf.tidy(() => {
      return this.noiseTensor.add(this.inputTensor).clipByValue(0, 1);
    });
    tf.toPixels(this.distortedTensor, this.noisyImg);
    this.updateFixedTensor();
  }

  updateFixedTensor() {
    if (this.fixedTensor) {
      this.fixedTensor.dispose();
    }
    this.fixedTensor = tf.tidy(() => {
      return this.model.predict(this.distortedTensor.expandDims()).squeeze();
    });
    tf.toPixels(this.fixedTensor, this.restoredImg);
  }
}

window.addEventListener('load', () => new Main());
