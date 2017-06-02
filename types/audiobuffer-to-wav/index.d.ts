// Type definitions for audiobuffer-to-wav 1.0
// Project: https://github.com/Jam3/audiobuffer-to-wav
// Definitions by: Ragg <https://github.com/Ragg->
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface AudioBufferLike {
    sampleRate: number;
    numberOfChannels: number;
    getChannelData: (channel: number) => Float32Array;
}

interface EncodeOptions {
    float32?: boolean;
}

declare function audioBufferToWav(buffer: AudioBufferLike, opts?: EncodeOptions): ArrayBuffer;
export = audioBufferToWav;
