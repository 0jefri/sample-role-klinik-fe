import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { isFn, isArrayExist } from '../utils';

export const FieldInputSelect = ({
	name,
	data,
	value: val,
	onChange,
	placeholder,

	keyId,
	keyLabel,
	keyDesc,
	isDisabled,
	isHide,

	// action
	clearOnSelection = false,
	onChangeItem,
}) => {
	const [value, setValue] = useState(val);
	const selectedValue = clearOnSelection ? '' : value?.[keyId];

	const handleChange = useCallback(
		(e) => {
			if (isArrayExist(data)) {
				const selectedId = e.target.value;
				const item = data.filter((item) => item[keyId] == selectedId);
				if (isArrayExist(item)) {
					setValue(item[0]);
				}
			}
		},
		[data, setValue]
	);

	useEffect(() => {
		if (isFn(onChange) && value !== undefined) {
			onChange(value, name);
		}
	}, [value]);

	return (
		<select
			className='select select-primary w-full max-w-xs bg-slate-50'
			name={name}
			value={selectedValue || ''}
			onChange={handleChange}
		>
			<option value='' disabled selected>
				{placeholder || 'Select'}
			</option>
			{isArrayExist(data)
				? data.map((item) => {
						const disabled = isFn(isDisabled) && isDisabled(item);
						const hidden = isFn(isHide) && isHide(item);

						return hidden ? null : (
							<option
								key={item[keyId]}
								value={item[keyId]}
								onClick={onChangeItem}
								className='flex flex-col gap-1'
								disabled={disabled || false}
							>
								{(isFn(keyLabel) ? <keyLabel {...item} /> : item[keyLabel]) ?? null}
								{(isFn(keyDesc) ? <keyDesc {...item} /> : item[keyDesc]) ?? null}
							</option>
						);
				  })
				: null}
		</select>
	);
};
