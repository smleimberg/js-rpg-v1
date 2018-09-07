# JS-RPG-V1

- V1 was built with impress.js (THIS VERSION)
    - On [GitHub](https://github.com/smleimberg/js-rpg-v1/) and [Bitbucket](https://bitbucket.org/smleimberg/js-rpg-v1/)
    - not mobile friendly (no on screen controls, impress.js would not load in mobile browsers during beta releases)
    - each map is a carefully hand crafted HTML page (painful)
    - uses jquery.cookie.js for game saves (requires web server so pages can pass cookies)
    - slow glitchy movement on slower devices (builds all map elements despite screen size and uses CSS3 transforms for animations)
- V2 was built with jQuery
    - On [GitHub](https://github.com/smleimberg/js-rpg-v2/) and [Bitbucket](https://bitbucket.org/smleimberg/js-rpg-v2/)
    - more mobile friendly
    - maps are generated using static JSON files
    - uses local storage for game saves
    - still slow glitchy movement on slower devices (builds all map elements despite screen size and uses JS for animations)
- V3 was built with React
    - On [GitHub](https://github.com/smleimberg/js-rpg-v3/) and [Bitbucket](https://bitbucket.org/smleimberg/js-rpg-v3/)
    - very mobile friendly
    - maps are generated using static JSON files
    - can't save the game (passing data between parent and child components is a PITA so I moved on to V4)
    - much faster movement (only builds/shows elements that fit in your browser window)
- V4 was built with React + Redux (LATEST)
    - On [GitHub](https://github.com/smleimberg/js-rpg-v4/) and [Bitbucket](https://bitbucket.org/smleimberg/js-rpg-v4/)
    - very mobile friendly
    - maps are generated using static JSON files
    - uses local storage for game saves/states
    - same movement used in V3 (only builds/shows elements that fit in your browser window)
