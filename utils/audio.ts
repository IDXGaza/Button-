
export const playZaSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    
    // 1. المذبذب للجزء الصوتي (Vocal part)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime); // تردد منخفض للطنين
    
    oscGain.gain.setValueAtTime(0, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

    // 2. الضوضاء للجزء الاحتكاكي (Friction part - the 'zzz' hiss)
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(3500, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(1, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

    // التوصيل
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // البدء
    osc.start();
    noise.start();
    
    // التوقف التلقائي
    osc.stop(ctx.currentTime + 0.6);
    noise.stop(ctx.currentTime + 0.6);
    
  } catch (e) {
    console.error("Audio context error:", e);
  }
};
