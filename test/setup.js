import chai from "chai";

const React = require("../src/vendor/react-with-addons");
let shallowRenderer;

global.expect = chai.expect;
global.TestUtils = React.addons.TestUtils;

global.React = React;
global.before = (callback) => {
    callback();
};

global.setState = (options) => {
    return global.getMountedInstance().setState(...options);
};

global.renderedComponent = () => {
    return shallowRenderer.getRenderOutput();
};

global.getMountedInstance = () => {
    return shallowRenderer.getMountedInstance();
};

global.renderIntoShallowDOM = (component) => {
    shallowRenderer = global.TestUtils.createRenderer();

    shallowRenderer.render(component);
    if (shallowRenderer.getMountedInstance().componentDidMount) {
        shallowRenderer.getMountedInstance().componentDidMount();
    }
    return shallowRenderer.getRenderOutput();
};

global.findElementWithTag = (component, tag, index = 0) => {
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
        return global.findElementWithTag(component, tag, index++);
    } else {
        return global.findElementWithTag(component.props.children, tag, 0);
    }
};

global.findElementWithId = (component, id, index = 0) => {
    if (index > component.length) {
        throw(`Could not find rendered component with id: ${id}. Make sure you have it defined in your render method!`);
    }

    if (component.props && component.props.id === id) {
        return component;
    }

    if (component[index] && component[index].props && component[index].props.id === id) {
        return component[index];
    } else {
        index++;
    }

    if (Object.prototype.toString.call(component) === '[object Array]') {
        return global.findElementWithId(component, id, index++);
    } else {
        return global.findElementWithId(component.props.children, id, 0);
    }
};

global.findElementWithClass = (component, className, index = 0) => {
    if (index > component.length) {
        throw(`Could not find rendered component with class: ${className}. Make sure you have it defined in your render method!`);
    }

    if (component.props && component.props.className === className) {
        return component;
    }

    if (component[index] && component[index].props && component[index].props.className === className) {
        return component[index];
    } else {
        index++;
    }

    if (Object.prototype.toString.call(component) === '[object Array]') {
        return global.findElementWithClass(component, className, index++);
    } else {
        return global.findElementWithClass(component.props.children, className, 0);
    }
};

global.getText = (component) => {
    return component.props.children;
}

global.getTextOfTag = (component, tag) => {
    return global.getText(global.findElementWithTag(component, tag));
};

global.getTextOfClass = (component, className) => {
    return global.getText(global.findElementWithClass(component, className));
};
