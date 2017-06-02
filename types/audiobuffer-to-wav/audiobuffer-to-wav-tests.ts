import * as audioBufferToWav from 'audiobuffer-to-wav';

const buffer = new AudioBuffer();

audioBufferToWav(buffer);
audioBufferToWav(buffer, {});
audioBufferToWav(buffer, { float32: true });
