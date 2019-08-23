import React from 'react';
import { toast as toastify, Flip } from 'react-toastify';
import { getIconClassName } from '@uifabric/styling';

const defaultToastProps = {
	position: 'bottom-left',
	autoClose: 6000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
};

const CloseButton = ({ closeToast }) => (
	<button className="nanui-toast-close-button-space" onClick={closeToast}>
		<div className="nanui-toast-close-button">
			<i className="fal fa-times" />
		</div>
	</button>
);

function getIcon(type) {
	switch (type) {
		case 'success':
			return getIconClassName('SkypeCheck');
		case 'error':
			return getIconClassName('ErrorBadge');
		case 'delete':
			return getIconClassName('Delete');
		case 'warn':
			return getIconClassName('Error');
		default:
			return '';
	}
}

export function toast(message, type = 'info', { icon, ...configs } = {}) {
	const messageComponent = (
		<span className="toast-message">
			{type && type !== 'info' && (
				<i className={`${getIcon(icon || type)} toast-type-icon`} />
			)}
			{message}
		</span>
	);
	toastify[type](messageComponent, {
		...defaultToastProps,
		...configs,
	});
}

export function initToast(configs) {
	return toastify.configure({
		className: 'nanui-toast',
		transition: Flip,
		closeButton: <CloseButton />,
		...configs,
	});
}
