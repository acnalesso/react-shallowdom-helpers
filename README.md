react-shallowdom-helpers
------------------------

# How to install
```bash
  npm install --save-dev react-shallowdom-helpers
```

### Helpers

#### render
```js
  import ShallowDOMHelpers from "react-shallowdom-helpers";

  const renderedComponent = ShallowDOMHelpers.render(<MyComponent>);
```

#### reRender
```js
  let renderedComponent = ShallowDOMHelpers.render(<MyComponent>);
  ShallowDOMHelpers.click(renderedComponent, '.toggle-modal');

  renderedComponent = ShallowDOMHelpers.reRender();
  // latest state is now set in the component
```

#### findByClass
  It returns the first element matching the class name.
```js
  ShallowDOMHelpers.findByClass(renderedComponent, 'class-name');
```

#### findByTag
  It returns the first element matching the tag.
```js
  ShallowDOMHelpers.findByTag(renderedComponent, 'p');
```

#### findById
  It returns the first element matching the id.
```js
  ShallowDOMHelpers.findById(renderedComponent, 'id-here');
```

#### getInnerChildren
```js
  ShallowDOMHelpers.render(<Component>Inner Children</Component>);
  const innerChildren = ShallowDOMHelpers.getInnerChildren(renderedComponent);
  // Inner Children
```

#### getTextByClass(renderedComponent, 'class-name-here');
```js
  const text = ShallowDOMHelpers.getTextByClass(renderedComponent, 'class-name-here');
  expect(text).to.eq('Text here');
```

#### getTextById
```js
  const text = ShallowDOMHelpers.getTextById(renderedComponent, 'id-here');
  expect(text).to.eq('Text here');
```

#### getTextByTag
```js
  const text = ShallowDOMHelpers.getTextByTag(renderedComponent, 'p');
  expect(text).to.eq('Text here');
```


#### click
```js
  // by class name
  ShallowDOMHelpers.click(renderedComponent, '.className');

  // by id
  ShallowDOMHelpers.click(renderedComponent, '#id');

  // by tag
  ShallowDOMHelpers.click(renderedComponent, 'p');
```

#### change
```js
  // by class name
  ShallowDOMHelpers.change(renderedComponent, '.className', '123');

  // by id
  ShallowDOMHelpers.change(renderedComponent, '#id', '123');

  // by tag
  ShallowDOMHelpers.change(renderedComponent, 'p', '123');
```


### Contributing
  Create a fork of the project. Add the functionality you want as well as tests and submit a PR.
### How to run the tests
```bash
  nvm use 5
  npm install
  npm test
```

### TODO
  * Simulate event payload when an event is trigger. (i.e Synthetic event)
  * Add more matchers
  * Refactor, refactor, refactor
