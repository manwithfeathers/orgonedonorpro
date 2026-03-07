# Orgone Donor Pro

A browser based musical instrument written in JavaScript / React. Tone JS library is used for synthesis and sequencing, and Motion library is used for movement and interaction with UI.

## How does it work

Spawn different synthesiser voices by clicking the plus signs. Move the icons around the screen to control pitch and density of rhythm. Rhythms are created using the Euclidean algorithm - see [this paper](https://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf) by Godfried Toussaint to learn more.

## Features

- 4 synth types
- async mode for different lengths of sequence. Normally sequences are 16 beats long, async mode will randomise this between 8 and 16.
- tempo control
- delay feedback control


## Built with

[React](https://react.dev/)
[React-Bootstrap](https://react-bootstrap.netlify.app/)
[Tone JS](https://tonejs.github.io/)
[Motion](https://motion.dev/)

## License

MIT 