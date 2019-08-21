import { configure } from '@storybook/react';
import { initializeIcons } from '@uifabric/icons'


const req = require.context('../src/components', true, /[^/]+\/stories.js$/);

function loadStories() {
	initializeIcons()
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
