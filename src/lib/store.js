import React, { createContext, useContext } from 'react';
import { nanuiStore } from '../core/nanuiStore';

/* 
===============================================================================
=====  Provider e Hook (Não mexer)
================================================================================== 
*/
let storesMap;
const StateContext = createContext();
export let stores;
let _storesObj;

const getProvider = (STORES) => ({ children }) => {
	_storesObj = STORES;
	// map that stores initialized versions of all user store hooks
	// complain if no instances provided for initialization
	const contextStories = Object.keys(STORES).map((x) => STORES[x]);
	storesMap = new Map();
	if (!contextStories || !contextStories.length) {
		throw new Error(
			'You must provide stores list to a <Provider> for initialization!'
		);
	}
	// initialize store hooks
	// this is required because react expects the same number
	// of hooks to be called on each render
	// so if we run init in useStore hook - it'll break on re-render
	contextStories.forEach((store) => {
		storesMap.set(store, store());
	});

	stores = Object.keys(STORES).reduce(
		(acc, x) => ({
			...acc,
			[x]: storesMap.get(STORES[x]),
		}),
		{}
	);

	// return provider with stores map
	return (
		<StateContext.Provider value={storesMap}>{children}</StateContext.Provider>
	);
};

export function useStore(storeInit) {
	const map = useContext(StateContext);

	// complain if no map is given
	if (!map) {
		throw new Error('You must wrap your components with a <Provider>!');
	}

	const instance = map.get(storeInit);

	// complain if instance wasn't initialized
	if (!instance) {
		throw new Error('Provided store instance did not initialized correctly!');
	}

	return instance;
}

export function initStore(customStores) {
	return getProvider({ nanuiStore, ...customStores });
}
