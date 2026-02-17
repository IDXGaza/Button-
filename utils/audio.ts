
export const playZaSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    
    const now = ctx.currentTime;
    
    // 1. الجزء الأساسي (الطنين الصوتي)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now); 
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.3);
    
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.2, now + 0.02);
    oscGain.gain.linearRampToValueAtTime(0.15, now + 0.2);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    // 2. الجزء الاحتكاكي (الهسيس العالي الحاد)
    const noiseOsc = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    noiseOsc.type = 'square'; 
    noiseOsc.frequency.setValueAtTime(4000, now);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3800, now);
    filter.Q.setValueAtTime(5, now);
    
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    // التوصيل
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    noiseOsc.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // تشغيل وإيقاف
    osc.start(now);
    noiseOsc.start(now);
    
    osc.stop(now + 0.5);
    noiseOsc.stop(now + 0.5);
    
  } catch (e) {
    console.error("Audio error:", e);
  }
};
