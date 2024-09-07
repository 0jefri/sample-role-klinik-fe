import React from 'react';
import { useState, useCallback } from 'react';
import { isArrayExist } from '../../utils';

export const $fieldRoleName = 'role';
export const $fieldRoleItem = 'role_item';

export const useConfigRole = () => {
	const [state, setState] = useState({});

	const update = useCallback(
		(name, value) => {
			setState((currentState) => ({ ...currentState, [name]: value }));
		},
		[setState]
	);

	const onChange = useCallback(
		(e) => {
			const newValue = e?.target?.value || '';
			const name = e?.target?.name || '';
			if (name) {
				update(name, newValue);
			}
		},
		[update]
	);

	const onAddNewRoleItem = useCallback(
		(item) => {
			if (item) {
				const current = state[$fieldRoleItem] || [];
				const found = current.filter((v) => v.id == item.id);
				const itemHasSelected = isArrayExist(found);
				if (!itemHasSelected) {
					update($fieldRoleItem, [...current, item]);
				}
			}
		},
		[update, state]
	);

	const onRemoveRoleItem = useCallback(
		(item) => {
			if (item) {
				let newRoleItem = (state[$fieldRoleItem] || []).filter((v) => v.id != item.id);
				update($fieldRoleItem, newRoleItem);
			}
		},
		[update, state]
	);

	return {
		state,
		onChange,
		onAddNewRoleItem,
		onRemoveRoleItem,
	};
};
