import React, { useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use';

function nanuiStore() {
	const [commandPanelOpened, setCommandPanelOpened] = useLocalStorage(
		'command-panel-opened',
		'info'
	);

	return {
		commandPanelOpened,
		setCommandPanelOpened,
	};
}
export { nanuiStore };
