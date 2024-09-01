import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";

import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

import "./bootstrap";

document.addEventListener("DOMContentLoaded", (event) => {
    Prism.plugins.NormalizeWhitespace.setDefaults({
        "remove-trailing": true,
        "remove-indent": true,
        "left-trim": true,
        "right-trim": true, 
    });

    Prism.highlightAll();
});
