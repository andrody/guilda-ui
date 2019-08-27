import React, { useState, useMemo } from 'react';
import { nanuiStore } from '../core/nanuiStore';
import { useStore } from '../lib/store';

export function useCommand() {
	const { setCommandPanelOpened } = useStore(nanuiStore);

	const infoBarItem = useMemo(
		() => ({
			key: 'info',
			name: 'Info',
			ariaLabel: 'Info',
			iconProps: {
				iconName: 'Info',
			},
			iconOnly: true,
			onClick: () =>
				setCommandPanelOpened((openPanel) =>
					openPanel === 'info' ? false : 'info'
				),
		}),
		[]
	);

	return {
		infoBarItem,
	};
}
