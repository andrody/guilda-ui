import React from 'react';
// Styled components 💅 is library that allows you create components easily and
// style them, css-in-js style. It's totally optional, but I prefer to use it
// to build things quickly and have them look great every step of the way.
// import styled from 'styled-components';
import './style.css';
import cx from 'classnames';

// Style components take CSS in a template string. Even Sass functions with work!
// Each element is a property of styled, like h3, p, div, etc...
// const ButtonWrapper = styled.button`
// 	border-radius: 8px;
// 	color: #fff;
// 	background: mediumvioletred;
// 	padding: 8px 15px;
// 	border: none;
// 	outline: none;
// `;

// Components are functions, and they must start with a capital letter
function Button({ primary, className, text, ...props }) {
	return (
		<button className={cx('guilda-btn', className, { primary })} {...props}>
			<div className="guilda-btn-text">{text}</div>
		</button>
	);
}

// This export will be picked up in ./index.js
export default Button;
