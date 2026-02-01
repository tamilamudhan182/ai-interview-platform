export const speak = (text: string) => {
    if (!window.speechSynthesis) {
        console.warn('Text-to-Speech not supported in this browser.');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to use a decent voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v =>
        v.name.includes('Google US English') ||
        v.name.includes('Microsoft David') ||
        v.lang === 'en-US'
    );

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
};

export const cancelSpeech = () => {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
};
