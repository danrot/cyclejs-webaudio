import xs from 'xstream';
import { div, button } from '@cycle/dom';
import Track from './Track';

function intent(domSource) {
    return {
        addTrack$: domSource.select('.add-track').events('click').mapTo(1)
    };
}

function model(actions, trackWrapper) {
    return actions.addTrack$.fold(tracks => tracks.concat(trackWrapper()), []);
}

function view(state$) {
    const tracks$ = state$.map(tracks => {
            const tracksDom = tracks.map(track => track.DOM.map(dom => dom));
            return xs.combine(...tracksDom);
        })
        .flatten();

    const addTrackButton$ = xs.of(button('.add-track', 'Add track'));

    return xs.combine(tracks$, addTrackButton$)
        .map(([tracks, addTrackButton]) => div(
            tracks.concat([addTrackButton])
        ));
}

function audio(state$) {
    const tracks$ = state$.map(tracks => {
        const tracksWebAudio = tracks.map(track => track.WebAudio.map(webAudio => webAudio));
        return xs.combine(...tracksWebAudio);
    })
    .flatten();

    return tracks$.map(tracks => tracks.reduce((webAudios, webAudio) => {
        return {
            oscillators: webAudios.oscillators.concat(webAudio.oscillators)
        };
    }, { oscillators: [] }));
}

function makeTrackWrapper(domSource) {
    return function() {
        return Track({ DOM: domSource });
    };
}

function App(sources) {
    const trackWrapper = makeTrackWrapper(sources.DOM);

    const action$ = intent(sources.DOM);
    const state$ = model(action$, trackWrapper);
    const view$ = view(state$);
    const audio$ = audio(state$);

    return {
        DOM: view$,
        WebAudio: audio$
    };
}

export default App;
