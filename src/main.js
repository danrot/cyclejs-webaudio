import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import WebAudioDriver from './WebAudioDriver';
import App from './App';

function main(sources) {
    return new App(sources);
}

run(main, {
    DOM: makeDOMDriver('#app'),
    WebAudio: WebAudioDriver
});
