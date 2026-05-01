import React from 'react';

const HelloWorld = function HelloWorld() {
  return <span>Hello World</span>;
};

HelloWorld.displayName = 'HelloWorld';

console.log(React.renderToString(<HelloWorld />));
