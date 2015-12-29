## Expression-Parser Mocha Runners
```css
@import "alpha-pre/mocha";
```
```html
<div id="mocha"></div>
```
```javascript
require("alpha-pre/mocha");
require("alpha-atom/atom");
mocha.setup('bdd');
require('./spec.js');
require('./spec-df.js');
require('./spec-1.0.js');
require('./spec-issues.js');

mocha.run();
```
