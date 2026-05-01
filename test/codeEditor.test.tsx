import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest';

import CodeEditor from '../src/codeEditor';

describe('<CodeEditor/>', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalGetBoundingClientRect: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalGetClientRects: any;
  // eslint-disable-next-line @vitest/require-mock-type-parameters
  const getClientRectSpy = vi.fn(() => ({ width: 100 }));

  beforeEach(() => {
    originalGetBoundingClientRect = Range.prototype.getBoundingClientRect;
    originalGetClientRects = Range.prototype.getClientRects;
    // @ts-expect-error mock types
    Range.prototype.getBoundingClientRect = getClientRectSpy;
    // @ts-expect-error mock types
    Range.prototype.getClientRects = getClientRectSpy;
  });

  afterEach(() => {
    Range.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    Range.prototype.getClientRects = originalGetClientRects;
    getClientRectSpy.mockRestore();
  });

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

  it.todo('should set new language via props', () => {
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
