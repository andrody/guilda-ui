import React, { useState, useMemo } from 'react';
import './style.css';
import cx from 'classnames';
import { getIconClassName } from '@uifabric/styling';
import Draggable from 'react-draggable';
import { useLocalStorage } from 'react-use';
import { Panel, PanelType } from '../Panel';
import ChoiceGroup from '../ChoiceGroup';
import { TextField, Stack, Button } from '../index.js';

const options = [
	{
		key: 'staging',
		iconProps: { iconName: 'DataManagementSettings' },
		text: 'Staging',
	},
	{
		key: 'production',
		iconProps: { iconName: 'Database' },
		text: 'Produção',
		disabled: true,
	},
	{
		key: 'localhost',
		iconProps: { iconName: 'TestBeaker' },
		text: 'Localhost',
	},
	{
		key: 'mock',
		iconProps: { iconName: 'FileCode' },
		text: 'Mock',
	},
	{
		key: 'custom',
		iconProps: { iconName: 'WindowEdit' },
		text: 'Custom',
	},
];

function RequestInspector({ className, left, envs, onChange, ...props }) {
	const [environment, setEnvironment] = useLocalStorage('nanui-env', envs[0]);
	const [isOpen, setIsOpen] = useState(false);
	const [pos, setPos] = useLocalStorage('nanui-inspector-pos', {
		x: 0,
		y: 0,
	});

	const columnProps = {
		tokens: { childrenGap: 15 },
		styles: { root: { width: 300 } },
	};

	function _onChange(e, option) {
		const newEnv = {
			...option,
			url: (envs.find((x) => x.key === option.key) || {}).url || '',
		};
		setEnvironment(newEnv);

		if (onChange) onChange(newEnv);
	}

	const footer = () => (
		<div>
			<Button
				primary
				onClick={() => setIsOpen(false)}
				style={{ marginRight: '8px' }}
			>
				Save
			</Button>
			<Button onClick={() => setIsOpen(false)}>Cancel</Button>
		</div>
	);

	const selectedEnvOption = useMemo(
		() => options.find((x) => x.key === environment.key),
		[environment]
	);

	return (
		<>
			<Draggable
				axis="y"
				defaultPosition={pos}
				onStop={(e, p) => setPos({ x: 0, y: p.y })}
			>
				<button
					className={cx('nanui-btn request-inspector', className, {
						left,
						right: !left,
					})}
					onClick={() => setIsOpen(true)}
				>
					<i
						className={getIconClassName(selectedEnvOption.iconProps.iconName)}
					/>
					{environment.key === 'custom'
						? environment.url
						: selectedEnvOption.text}
				</button>
			</Draggable>
			<Panel
				isOpen={isOpen}
				// isBlocking={false}
				onDismiss={() => setIsOpen(false)}
				type={left ? PanelType.customNear : PanelType.smallFixedRight}
				headerText="Select a Environment"
				closeButtonAriaLabel="Close"
				customWidth={340}
				isLightDismiss={true}
				// onRenderFooterContent={footer}
			>
				<Stack {...columnProps}>
					<ChoiceGroup
						label="Environments"
						selectedKey={environment.key}
						onChange={_onChange}
						options={options}
					/>
					<TextField
						label="Domain"
						value={environment.url}
						onChange={(ev, url) =>
							setEnvironment({
								key: 'custom',
								url,
							})
						}
					/>
				</Stack>
			</Panel>
		</>
	);
}

export default RequestInspector;
