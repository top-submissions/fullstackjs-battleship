function createSoundController() {
  let isMuted = false;

  // Create audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  function playTone(frequency, duration, type = 'sine') {
    if (isMuted) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }

  return {
    playPlaceShip() {
      playTone(600, 0.1, 'sine');
    },

    playHit() {
      playTone(800, 0.15, 'square');
      setTimeout(() => playTone(600, 0.15, 'square'), 100);
    },

    playMiss() {
      playTone(200, 0.2, 'sine');
    },

    playGameOver() {
      playTone(400, 0.2, 'square');
      setTimeout(() => playTone(350, 0.2, 'square'), 200);
      setTimeout(() => playTone(300, 0.4, 'square'), 400);
    },

    toggleMute() {
      isMuted = !isMuted;
      return isMuted;
    },

    isMuted() {
      return isMuted;
    },
  };
}

export { createSoundController };
