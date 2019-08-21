import React from 'react';
// Import the storybook libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Import our component from this folder
import RequestInspector from './RequestInspector';

// Here we describe the stories we want to see of the Button. The component is
// pretty simple so we will just make two, one with text and one with emojis
// Simple call storiesOf and then chain .add() as many times as you wish
//
// .add() takes a name and then a function that should return what you want
// rendered in the rendering area

export const envs = [
	{ url: 'https://www.staging.com.br/api', key: 'staging' },
	{ url: 'https://prod.com.br/api', key: 'production' },
	{ url: 'http://localhost:3000/api', key: 'localhost' },
	{ url: 'mock', key: 'mock' },
];

storiesOf('RequestInspector')
	.add('default', () => <RequestInspector envs={envs} />)
	.add('left', () => <RequestInspector envs={envs} left />);
