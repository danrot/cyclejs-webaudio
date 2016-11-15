export default function WebAudioDriver(instructions$) {
    const audioContext = new window.AudioContext();
    let oscillators = [];

    instructions$.addListener({
        next: instructions => {
            for (let i = 0; i < instructions.oscillators.length; ++i) {
                const isNewOscillator = !oscillators[i];
                if (isNewOscillator) {
                    oscillators[i] = audioContext.createOscillator();
                }

                oscillators[i].frequency.value = instructions.oscillators[i].frequency;

                if (isNewOscillator) {
                    oscillators[i].connect(audioContext.destination);
                    oscillators[i].start();
                }
            }
        }
    });
}
