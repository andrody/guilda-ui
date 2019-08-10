import React from 'react';
// Import the storybook libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Import our component from this folder
import CommandBarButton from './CommandBarButton';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

// Here we describe the stories we want to see of the Button. The component is
// pretty simple so we will just make two, one with text and one with emojis
// Simple call storiesOf and then chain .add() as many times as you wish
//
// .add() takes a name and then a function that should return what you want
// rendered in the rendering area
storiesOf('CommandBarButton')
	.add('with text', () => (
		<>
			<Fabric>
				<CommandBarButton
					data-automation-id="test"
					// checked={checked}
					iconProps={{ iconName: 'Add' }}
					text="Create account"
					menuProps={{
						items: [
							{
								key: 'emailMessage',
								text: 'Email message',
								iconProps: { iconName: 'Mail' },
							},
							{
								key: 'calendarEvent',
								text: 'Calendar event',
								iconProps: { iconName: 'Calendar' },
							},
						],
					}}
				/>
			</Fabric>
		</>
	))
	.add('with emoji', () => (
		<CommandBarButton onClick={action('clicked')} text="🚿 🚿 🐈 🐈" />
	));
