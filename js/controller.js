class Controller {
    constructor(name) {
        this.keyConfig = this.getKeyConfig(name);
        this.eventListeners = {
            'midiUp': [],
            'midiDown': [],
        };
        this.init(name);
    }

    // Retrieve a keyConfig for a certain MIDI
    getKeyConfig(name) {
        switch (name) {
            case 'WORLDE easy pad':
                return {
                    '185': {
                        '49': 'Repeat',
                        '47': 'Previous',
                        '48': 'Next',
                        '44': 'Record',
                        '46': 'Stop',
                        '45': 'Play',
                    },
                    '153': {
                        '1': 'Start',
                        '2': 'Select',
                        '39': 'Pad_1',
                        '48': 'Pad_2',
                        '45': 'Pad_3',
                        '43': 'Pad_4',
                        '51': 'Pad_5',
                        '49': 'Pad_6',
                        '36': 'Pad_7',
                        '38': 'Pad_8',
                        '40': 'Pad_9',
                        '42': 'Pad_10',
                        '44': 'Pad_11',
                        '46': 'Pad_12',
                    },
                };
            default:
                return undefined;
        }
    }

    async init(name) {
        try {
            // Check if WebMIDI is supported
            if (!navigator.requestMIDIAccess) throw new Error('Browser does not support WebMIDI API');
            // Initialize Pad
            const midi = await this.getMidi();
            const inputs = await this.getMidiInputs(midi);
            const pad = await this.getMidiPad(inputs, name);

            // Setup Events
            const boundOnMidiMessage = this.onMidiMessage.bind(this);
            pad.onmidimessage = boundOnMidiMessage;
        } catch (error) {
            console.warn(error);
        }
    }

    // Retrieve connected MIDI
    async getMidi() {
        const res = await navigator.requestMIDIAccess().then(this.onSucceed, this.onFailure);
        if (res.code) throw new Error(`MIDI Init Error. Could not find a midi.`);
        return res;
    }

    // Retrieves all input MIDI
    async getMidiInputs(midi) {
        const inputs = midi.inputs;
        if (inputs < 1) throw new Error(`MIDI Init Error. No midi inputs found.`);
        return inputs;
    }

    // Retrieves the correct MIDI
    async getMidiPad(inputs, name) {
        const iterator = inputs.values();
        let pad = iterator.next().value;
        if (!pad) throw new Error('No input pad was found.');
        if (!name) return pad;
        while (pad) {
            if (pad.name === name)
                return pad;
            pad = iterator.next().value;
        }
        throw new Error(`No pad with name "${name}" was found.`)
    }

    onMidiMessage(event) {
        const id = event.data[0];
        const keyCode = event.data[1];
        const value = event.data[2];
        const eventName = value > 0 ? 'midiDown' : 'midiUp';
        const detail = {
            'keyCode': keyCode,
            'value': value,
        };
        if (this.keyConfig) detail.keyName = this.keyConfig[id][keyCode];
        const midiEvent = new CustomEvent(eventName, {
            'detail': detail
        });

        // Throws the custom event on the callbacks
        this.runCallbacks(this.eventListeners[eventName], midiEvent);
    }

    runCallbacks(callbacks, event) {
        for (const cb of callbacks) {
            cb(event.detail);
        }
    }

    on(type, cb) {
        // Check if callback is a function.
        if (typeof (cb) !== 'function') throw new Error('Callback was not a function.');

        // Check if the listener type exists.
        if (!this.eventListeners[type]) throw new Error(
            `${type} is not a valid listener type ("midiUp" or "midiDown").`);

        // If correct add the listener.
        this.eventListeners[type].push(cb);
    }

}

export {Controller};
