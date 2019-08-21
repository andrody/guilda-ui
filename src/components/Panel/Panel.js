import React from 'react';
import './style.css';
import cx from 'classnames';
import {
	Panel as FabricPanel,
	// PanelType,
} from 'office-ui-fabric-react/lib/Panel';

function Panel({ children, ...props }) {
	return <FabricPanel {...props}>{children}</FabricPanel>;
}

export default Panel;
