import ReactDOM from 'react-dom';
import syntaxHighlighter from '../src/index';

ReactDOM.render(
  syntaxHighlighter('console.log("Hello, world!");', 'js', { dark: true }),
  document.getElementById('root')
);
