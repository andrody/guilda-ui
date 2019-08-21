import React from 'react';
import { ChoiceGroup as FabricChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import './style.css';
// import cx from 'classnames';

function ChoiceGroup(props) {
	return <FabricChoiceGroup {...props} />;
}

export default ChoiceGroup;
