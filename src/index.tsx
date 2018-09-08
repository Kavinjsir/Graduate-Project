import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from  './components';

async function main(): Promise<void> {
  const main = document.createElement('div');
  main.setAttribute('id', 'main');
  document.body.appendChild(main);

  ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    main
  );
}

main();