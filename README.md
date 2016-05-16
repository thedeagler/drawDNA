DrawDNA
=====================

Easily create, share, and interact with secondary DNA structures.

### Usage

```
npm install
npm start
open http://localhost:3000
```

### File structure
root
* data
    * config.js (establish connection to db)
    * sequenceModel.js (define sequence model + defaults)
* public
    * resources (images and icons)
    * scripts
        * DNA.js                      (constructor for DNA. D3 force graph inside)
        * draw.js                     (main for draw.html)
        * Errors.js                   (custom error definition for DNA-related errors)
        * home.js                     (main for home.html)
        * infobox.js                  (info/edit box controller)
        * settings.js                 (settings/legend controller)
        * smooth-scroll.min.js        (create smooth scrolling effect)
        * Utils.js                    (App-wide utilities)
    * styles (stylesheets + animate.css for animations)
    * draw.html
    * home.html
* server.js (server entry point)
