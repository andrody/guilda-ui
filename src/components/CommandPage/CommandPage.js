import React, { useMemo } from 'react';
import cx from 'classnames';
// import { getIconClassName } from '@uifabric/styling';
// import { useLocalStorage } from 'react-use';
import './style.css';
import { stores } from '../../lib/store';
import { CommandBar } from '../index';

function CommandPage({
	className,
	commandBarProps,
	commandPanels = {},
	children,
	...props
}) {
	const { commandPanelOpened } = stores.nanuiStore;
	const isCommandPanelOpen = useMemo(
		() =>
			Object.keys(commandPanels).findIndex((x) => x === commandPanelOpened) >
			-1,
		[commandPanels, commandPanelOpened]
	);

	return (
		<section
			className={cx('command-page-space', className, {
				isCommandPanelOpen,
			})}
			{...props}
		>
			<CommandBar className="command-bar" {...commandBarProps} />
			<section className="command-page">
				<section className="command-page-content">{children}</section>
				<section className="command-page-panel">{commandPanels.info}</section>
			</section>
		</section>
	);
}

export default CommandPage;
