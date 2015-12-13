import ShallowDomHelpers from "../src/index";
import Component from "./support/Component.react";
import Todo from "./support/Todo.react";
import Finders from "./support/Finders.react";

describe('ReactShallowDomHelpers', () => {
  it('has TestUtils in it', () => {
    expect(ShallowDomHelpers.TestUtils).to.not.be.undefined;
  });

  describe('Helpers', () => {
    it('renders a component', () => {
      const renderedComponent = ShallowDomHelpers.render(<Component />);

      expect(renderedComponent.type).to.eq('div');
    });

    it('re-renders a mounted instance', () => {
      ShallowDomHelpers.render(<Component />);

      const renderedComponent = ShallowDomHelpers.reRenderMountedInstance();
      expect(renderedComponent).to.not.be.undefined;
    });

    describe('Hooks', () => {
      describe('Is defined', () => {
        it('componentDidMount', () => {
          ShallowDomHelpers.render(<Component />);

          expect(ShallowDomHelpers.getMountedInstance().state.status).to.eq(true);
        });
      });

      describe('Is not defined', () => {
        it('componentDidMount', () => {
          ShallowDomHelpers.render(<Todo />);
          const { status } = ShallowDomHelpers.getMountedInstance().state;

          expect(status).to.eq(false);
        });
      });
    });

    it('gets the mounted instance', () => {
      const renderedComponent = ShallowDomHelpers.render(<Component />);

      expect(ShallowDomHelpers.getMountedInstance()).to.not.be.undefined
    });
  });

  describe('Finder', () => {
    describe('By class', () => {
      it('finds element with a single class name', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findByClass(renderedComponent, 'class-name');
        expect(found.props.className).to.eq('class-name')
      });

      it('finds an element that is nested and has two class names', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findByClass(renderedComponent, 'second-name');
        expect(found.props.className).to.eq('first-name second-name')
      });
    });

    describe('By tag', () => {
      it('finds element by tag name and element is not nested', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findByTag(renderedComponent, 'div');
        expect(found.type).to.eq('div')
      });

      it('finds element by tag name and element is nested', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findByTag(renderedComponent, 'p');
        expect(found.type).to.eq('p')
      });
    });

    describe('Finds by id', () => {
      it('finds by id and element is not nested', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findById(renderedComponent, 'id-here');
        expect(found.props.id).to.eq('id-here')
      });

      it('finds by id and element is nested', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findById(renderedComponent, 'nested');
        expect(found.props.id).to.eq('nested')
      });
    });
  });

  describe('Events', () => {
    it('onClick', (done) => {
      const onClick = () => { done(); }
      const renderedComponent = ShallowDomHelpers.render(<Component callMe={onClick} />);

      ShallowDomHelpers.click(renderedComponent, '.click-me');
    });

    it('onChange', (done) => {
      const onChange = () => { done(); }
      const renderedComponent = ShallowDomHelpers.render(<Component onChange={onChange} />);

      ShallowDomHelpers.change(renderedComponent, 'input', '1234');
    });
  });

  describe('Extractors', () => {
    it('gets inner children', () => {
      const renderedComponent = ShallowDomHelpers.render(<Component>Inner Children</Component>);

      const innerChildren = ShallowDomHelpers.getInnerChildren(renderedComponent);
      expect(innerChildren).to.eq('Inner Children');
    });

    it('gets text by tag', () => {
      const renderedComponent = ShallowDomHelpers.render(<Component />);
      const text = ShallowDomHelpers.getTextByTag(renderedComponent, 'h1');
      expect(text).to.eq('Content');
    });

    it('gets text by class', () => {
      const renderedComponent = ShallowDomHelpers.render(<Component />);
      const text = ShallowDomHelpers.getTextByClass(renderedComponent, 'text');
      expect(text).to.eq('Content');
    });

    it('gets text by id', () => {
      const renderedComponent = ShallowDomHelpers.render(<Component />);
      const text = ShallowDomHelpers.getTextById(renderedComponent, 'content');
      expect(text).to.eq('Content');
    });
  });
});
