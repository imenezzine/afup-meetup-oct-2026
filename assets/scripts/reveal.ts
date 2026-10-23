// @ts-ignore
import Reveal from 'reveal.js';
// @ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
// @ts-ignore
import Math from 'reveal.js/plugin/math/math.esm.js';
// @ts-ignore
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
// @ts-ignore
import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js';
// @ts-ignore
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import { customizeSpeakerView } from './speaker-view';

customizeSpeakerView();

const deck = new Reveal({
    slideNumber: 'c/t',
    history: true,
    plugins: [
        Markdown,
        Math,
        Highlight,
        Zoom,
        Notes,
    ],
});

deck.initialize({
    navigationMode: 'linear',
});
