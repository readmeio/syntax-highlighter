import { mount } from 'enzyme';
import React from 'react';

import CodeEditor from '../src/codeEditor';

describe('<CodeEditor/>', () => {
  const getClientRectSpy = jest.fn(() => ({ width: 100 }));
  Range.prototype.getBoundingClientRect = getClientRectSpy;
  Range.prototype.getClientRects = getClientRectSpy;

  const node = mount(<CodeEditor code="console.log('Hello, world.');" lang="js" />);
  const cm = node.find('Controlled');

  it('should display a <CodeEditor> element', () => {
    expect(node.children('.CodeEditor')).toHaveLength(1);
  });

  it('should highlight code', () => {
    expect(cm.html()).toContain('cm-variable');
  });

  it('should set CodeMirror options', () => {
    expect('options' in cm.props()).toBe(true);
  });

  it('should set a sanitized language mode', () => {
    expect(node.props().lang).toBe('js');
    expect(cm.props().options.mode).toBe('javascript');
  });

  it('should set new language via props', () => {
    node.setProps({ lang: 'kotlin' });
    expect(node.props().lang).toBe('kotlin');

    setTimeout(() => {
      expect(cm.props().options.mode).toBe('clike');
    });
  });

  it('should take children as a code value', () => {
    const props = {
      children: 'const res = true;',
      lang: 'js',
    };

    const n2 = mount(<CodeEditor {...props} />);
    const cm2 = n2.find('Controlled');
    expect(cm2.prop('value')).toBe('const res = true;');
  });
});
