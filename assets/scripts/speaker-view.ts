// Adapte la vue présentateur du plugin Notes : slides réduites à gauche, notes en grand à droite,
// et taille de police ajustée pour que chaque note tienne sans barre de défilement.

const SPEAKER_WINDOW_NAME = 'reveal.js - Notes';
const MAX_FONT_SIZE = 34;
const MIN_FONT_SIZE = 14;

const STYLE = `
    body { font-family: system-ui, sans-serif; }
    #speaker-layout { display: none !important; }

    #current-slide, #upcoming-slide {
        display: block !important;
        left: 0 !important;
        width: 32% !important;
        padding: 30px 6px 6px !important;
    }
    #current-slide { top: 0 !important; height: 58% !important; }
    #upcoming-slide { top: 58% !important; height: 42% !important; }

    #current-slide::before,
    #upcoming-slide .label {
        position: absolute;
        top: 4px;
        left: 6px;
        height: auto;
        line-height: 1.6;
        padding: 0 10px;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
    #current-slide::before {
        content: '● En cours';
        background: #E8590C;
        color: #fff;
    }
    #upcoming-slide .label {
        background: #ddd;
        color: #555;
    }
    #current-slide iframe { border: 4px solid #E8590C !important; border-radius: 6px; }
    #upcoming-slide iframe { border: 2px dashed #aaa !important; border-radius: 6px; opacity: 0.55; }

    #speaker-controls {
        top: 0 !important;
        left: 32% !important;
        right: auto !important;
        width: 68% !important;
        height: 100% !important;
        padding: 6px 6px 6px 16px !important;
        display: flex;
        flex-direction: column;
        overflow: hidden !important;
        font-size: 16px !important;
    }
    .speaker-controls-time {
        flex: none;
        padding: 4px 8px 8px !important;
        margin-bottom: 6px !important;
    }
    .speaker-controls-time .timer,
    .speaker-controls-time .clock { font-size: 1.4em !important; }
    .speaker-controls-time .pacing-title,
    .speaker-controls-time .pacing { display: none !important; }

    .speaker-controls-notes:not(.hidden) {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        padding: 0 8px !important;
    }
    .speaker-controls-notes .label { display: none; }
    .speaker-controls-notes .value {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        margin: 0 !important;
        line-height: 1.35 !important;
        color: #111;
    }
    .speaker-controls-notes .value p { margin: 0 0 0.45em; }
    .speaker-controls-notes .value b { color: #E8590C; }
    .speaker-controls-notes .value code {
        font-size: 0.9em;
        padding: 0 0.15em;
        background: #f1ece4;
        border-radius: 3px;
    }
`;

function enhance(win: Window): void {
    const doc = win.document;
    const value = doc.querySelector<HTMLElement>('.speaker-controls-notes .value');

    if (!doc.head || !value) {
        return;
    }

    const upcomingLabel = doc.querySelector('#upcoming-slide .label');
    if (upcomingLabel) {
        upcomingLabel.textContent = 'Suivante';
    }

    const style = doc.createElement('style');
    style.textContent = STYLE;
    doc.head.appendChild(style);

    const fit = () => {
        let size = MAX_FONT_SIZE;
        value.style.fontSize = `${size}px`;

        while (size > MIN_FONT_SIZE && value.scrollHeight > value.clientHeight) {
            size--;
            value.style.fontSize = `${size}px`;
        }
    };

    new (win as Window & typeof globalThis).MutationObserver(fit).observe(value, { childList: true, subtree: true, characterData: true });
    win.addEventListener('resize', fit);
    fit();
}

export function customizeSpeakerView(): void {
    const nativeOpen = window.open.bind(window);

    window.open = (url?: string | URL, target?: string, features?: string): Window | null => {
        if (target !== SPEAKER_WINDOW_NAME) {
            return nativeOpen(url, target, features);
        }

        const win = nativeOpen(url, target, 'width=1400,height=850');

        // Le plugin écrit le HTML de la vue juste après l'ouverture : on attend la fin de cette écriture.
        if (win) {
            setTimeout(() => enhance(win));
        }

        return win;
    };
}
