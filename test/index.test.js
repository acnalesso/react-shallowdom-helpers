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
      it('finds all', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);

        const found = ShallowDomHelpers.findAllByClass(renderedComponent, 'all');
        expect(found.length).to.eq(22);
      });

      it('returns an empty array when find all finds nothing', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);

        const found = ShallowDomHelpers.findAllByClass(renderedComponent, 'nothing');
        expect(found.length).to.eq(0);
      });

      it('finds one element by class name', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findByClass(renderedComponent, 'class-name');
        expect(found.props.className).to.eq('class-name')
      });

      it('throws an error when an element is not found', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        expect(function () {
          ShallowDomHelpers.findByClass(renderedComponent, 'not-class-name');
        }).to.throw('Could not find element by class name: not-class-name')
      });

      it('finds an element that is nested and has two class names', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findByClass(renderedComponent, 'second-name');
        expect(found.props.className).to.eq('first-name second-name')
      });
    });

    describe('By tag', () => {
      it('finds all elements by tag', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findAllByTag(renderedComponent, 'hr');
        expect(found.length).to.eq(2)
      });

      it('throws an error when an element is not found', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        expect(function () {
          ShallowDomHelpers.findByTag(renderedComponent, 'noTag');
        }).to.throw('Could not find element by tag name: noTag')
      });

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

      it('throws an error when element is found found by id', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        expect(function () {
          ShallowDomHelpers.findById(renderedComponent, 'no_id_here');
        }).to.throw('Could not find element by id: no_id_here')
      });

      it('finds by id and element is deep down in the tree', () => {
        const renderedComponent = ShallowDomHelpers.render(<Finders />);
        const found = ShallowDomHelpers.findById(renderedComponent, 'deep_down');
        expect(found.props.id).to.eq('deep_down')
      });
    });
  });

  describe('Events', () => {
    describe('onClick', () => {

      it('allows devs to pass in the event payload', () => {
        let event;
        const onClick = (e) => { event = e; }
        const renderedComponent = ShallowDomHelpers.render(<Component callMe={onClick} />);

        ShallowDomHelpers.click(renderedComponent, '.click-me', { target: { className: 'click-me'} });

        expect(event.target.className).to.equal('click-me');
      });

      it('passes an empty event payload when not explicitly passed in', () => {
        let event;
        const onClick = (e) => { event = e; }
        const renderedComponent = ShallowDomHelpers.render(<Component callMe={onClick} />);

        ShallowDomHelpers.click(renderedComponent, '.click-me');

        expect(Object.prototype.toString.call(event)).to.equal('[object Object]');
      });
    });

    describe('onChange', () => {

      it('allows devs to pass in the event payload', () => {
        let event;
        const onChange = (e) => { event = e; }
        const renderedComponent = ShallowDomHelpers.render(<Component onChange={onChange} />);


        ShallowDomHelpers.change(renderedComponent, 'input', { target: { text: "1234" }});

        expect(event.target.text).to.equal('1234');
      });

      it('passes an empty event payload when not explicitly passed in', () => {
        let emptyEvent;
        const onChange = (e) => { emptyEvent = e; }
        const renderedComponent = ShallowDomHelpers.render(<Component onChange={onChange} />);

        ShallowDomHelpers.change(renderedComponent, 'input');

        expect(Object.prototype.toString.call(emptyEvent)).to.equal('[object Object]');
      });
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
