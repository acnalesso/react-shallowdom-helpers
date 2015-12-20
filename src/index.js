const React = require("./vendor/react-with-addons");
let shallowRenderer;

const callFinderBasedOnSelector = (finder, component, selector) => {
   if (selector.indexOf('.') === 0) {
     return finder.findByClass(component, selector.replace('.', ''));
   }

   if (selector.indexOf('#') === 0) {
     return finder.findById(component, selector.replace('#',''));
   }

   return finder.findByTag(component, selector);
};

const getText = (component) => {
   return component.props.children;
};

class Finders {
  findAllByClass(component, className, result = [], index = 0, done = false) {
    // Checks the parent
    if (component && component.props && component.props.className && component.props.className.indexOf(className) > -1) {
      result.push(component);
      if (done) { return result; }
    }

    // Checks if child has any props
    if (component && component[index] && component[index].props) {
      if (component[index].props.className && component[index].props.className.indexOf(className) > -1) {
        result.push(component[index]);
        if (done) { return result[index]; }
      }

      // Checks if child has any children
      if (typeof(component[index].props.children) !== 'undefined') {
        this.findAllByClass(component[index].props.children, className, result, 0, done);
      }

      // increments index and checks the next child, leaf.
      this.findAllByClass(component, className, result, ++index, done);
    }

    if (component && component.props && component.props.children !== undefined) {
      this.findAllByClass(component.props.children, className, result, 0, done);
    }

    return result;
 };

  findByClass(component, className) {
    const result = this.findAllByClass(component, className, [], 0, true);

    if (result.length === 0) {
      throw(`Could not find rendered element by class name: ${className}.`);
    } else {
      return result[0];
    }
  }

  findById(component, id, result = [], index = 0) {
    // Checks the parent
    if (component && component.props && component.props.id && component.props.id === id) {
      result.push(component);
    }

    // Checks if child has any props
    if (component && component[index] && component[index].props) {
      if (component[index].props.id && component[index].props.id === id) {
        result.push(component[index]);
      }


      // Checks if child has any children
      if (typeof(component[index].props.children) !== 'undefined') {
        this.findById(component[index].props.children, id, result, 0);
      }

      // increments index and checks the next child, leaf.
      this.findById(component, id, result, ++index);
    }

    if (component && component.props && component.props.children !== undefined) {
      this.findById(component.props.children, id, result, 0);
    }

    return result;

    //if (index > component.length) {
    //  throw(`Could not find rendered component with id: ${id}. Make sure you have it defined in your render method!`);
    //}

    //if (component.props && component.props.id === id) {
    //  return component;
    //}

    //if (component[index] && component[index].props && component[index].props.id === id) {
    //  return component[index];
    //} else {
    //  index++;
    //}

    //if (Object.prototype.toString.call(component) === '[object Array]') {
    //  return this.findById(component, id, index++);
    //} else {
    //  return this.findById(component.props.children, id, 0);
    //}
  }

  findByTag(component, tag, index = 0) {
    if (index > component.length) {
      throw(`Could not find rendered component with tag: ${tag}. Make sure you have it defined in your render method!`);
    }

    if (component.type === tag) {
      return component;
    }

    if (component[index] && component[index].type && component[index].type === tag) {
      return component[index];
    } else {
      index++;
    }

    if (Object.prototype.toString.call(component) === '[object Array]') {
      return this.findByTag(component, tag, index++);
    } else {
      return this.findByTag(component.props.children, tag, 0);
    }
  }

}

const finders = new Finders();

module.exports = {
 TestUtils: React.addons.TestUtils,

 render: (component) => {
    shallowRenderer = React.addons.TestUtils.createRenderer();

    shallowRenderer.render(component);

    const mountedInstance = shallowRenderer.getMountedInstance();
    mountedInstance.componentDidMount && mountedInstance.componentDidMount();

    return shallowRenderer.getRenderOutput();
 },

 getMountedInstance: () => {
   return shallowRenderer.getMountedInstance();
 },

 reRenderMountedInstance: () => {
   return shallowRenderer.getRenderOutput();
 },

 click: (component, selector) => {
   const element = callFinderBasedOnSelector(finders, component, selector);
   return element.props.onClick({ target: { }});
 },

 change: (component, selector, change) => {
  const element = callFinderBasedOnSelector(finders, component, selector);
  return element.props.onChange({ target: { text: change }});
 },

 findAllByClass: finders.findAllByClass,
 findByClass: finders.findByClass,
 findByTag: finders.findByTag,
 findById: (component, id) => {
   const result = finders.findById(component, id, []);

   if (result.length === 0) {
     throw(`Could not find element by id: ${id}`);
   }

   return result[0];
 },

 getTextByTag: (component, tag) => {
   return getText(finders.findByTag(component, tag));
 },
 getTextByClass: (component, className) => {
   return getText(finders.findByClass(component, className));
 },
 getTextById: (component, id) => {
   return getText(finders.findById(component, id)[0]);
 },

 getInnerChildren: function (component, index = 0) {
   if (component.props === undefined || component.props.children === undefined || index > component.props.children.length) {
     return undefined;
   }

   if (Object.prototype.toString.call(component.props.children[index]) === '[object Array]' || Object.prototype.toString.call(component.props.children[index]) === '[object String]') {
     return component.props.children[index];
   } else {
     return this.getInnerChildren(component, ++index);
   }
 }

};
