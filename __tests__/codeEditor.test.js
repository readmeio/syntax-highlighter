import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import CodeEditor from '../src/codeEditor';

describe('<CodeEditor/>', () => {
  const getClientRectSpy = jest.fn(() => ({ width: 100 }));
  Range.prototype.getBoundingClientRect = getClientRectSpy;
  Range.prototype.getClientRects = getClientRectSpy;

  it('should display a <CodeEditor> element', () => {
    render(<CodeEditor code="console.log('Hello, world.');" lang="javascript" />);

    expect(screen.getByRole('textbox')).toBeVisible();
  });

  it('should highlight code', () => {
    render(<CodeEditor code="console.log('Hello, world.');" lang="javascript" />);

    expect(screen.getByText('console')).toHaveClass('cm-variable');
  });

  it('should set CodeMirror options', () => {
    render(<CodeEditor code="console.log('Hello, world.');" lang="javascript" theme="neo" />);
    // eslint-disable-next-line testing-library/no-node-access
    const [editor] = document.getElementsByClassName('CodeEditor');

    // eslint-disable-next-line testing-library/no-node-access
    expect(editor.children[0]).toHaveClass('cm-s-neo');
  });

  it('should set a sanitized language mode', () => {
    render(<CodeEditor code="console.log('Hello, world.');" lang="js" />);

    expect(screen.getByText('console')).toHaveClass('cm-variable');
  });

  it.skip('should set new language via props', () => {
    const { rerender } = render(<CodeEditor code="console.log('Hello, world.');" />);
    expect(screen.getByText("console.log('Hello, world.');")).toBeVisible();

    rerender(<CodeEditor code="console.log('Hello, world.');" lang="javascript" />);
    return waitFor(() => expect(screen.getByText('console')).resolves.toHaveClass('cm-variable'));
  });

  it('should take children as a code value', () => {
    const props = {
      children: 'const res = true;',
      lang: 'javascript',
    };

    render(<CodeEditor {...props} />);
    expect(screen.getByText('const')).toBeVisible();
  });
});
