import React from 'react';
import { useState } from 'react';
import { useConfigRole, $fieldRoleName, $fieldRoleItem } from './config';
import { FieldInputSelect } from '../../components/FieldInputSelect';
import { isArrayExist } from '../../utils';

const dataDummy = [
	{ id: 1, AccesseName: 'Lihat Pasien', AccesseDescription: 'User dapat melihat data pasien' },
	{
		id: 2,
		AccesseName: 'Tambah Pasien',
		AccesseDescription: 'User dapat menambahkan data pasien',
	},
	{ id: 3, AccesseName: 'Edit Pasien', AccesseDescription: 'User dapat mengedit data pasien' },
	{ id: 4, AccesseName: 'Hapus Pasien', AccesseDescription: 'User dapat menghapus data pasien' },
];

export const PageRoles = () => {
	const { state, onChange, onAddNewRoleItem, onRemoveRoleItem } = useConfigRole();
	const displayedData = state[$fieldRoleItem] || [];

	console.log('state: ', state);

	return (
		<div className='flex flex-col max-w-md mx-auto mt-6 gap-6 bg-slate-200 py-4'>
			<input
				type='text'
				placeholder='Add Role'
				className='input input-primary bg-slate-50 w-full max-w-xs'
				name={$fieldRoleName}
				onChange={onChange}
			/>
			<div className='overflow-x-auto'>
				<table className='table'>
					<thead className='text-black'>
						<tr>
							<th>No</th>
							<th>Accesse Name</th>
							<th>AccesseDescription</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className='text-neutral-950'>
						{displayedData.length === 0 ? (
							<tr>
								<td colSpan='4' className='text-center py-4'>
									No Data Available
								</td>
							</tr>
						) : (
							displayedData.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.AccesseName}</td>
									<td>{item.AccesseDescription}</td>
									<td>
										<button
											className='btn btn-outline btn-primary'
											onClick={() => onRemoveRoleItem(item)}
											children='Delete'
										/>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
				<div className='mt-4 flex gap-6'>
					<FieldInputSelect
						data={dataDummy}
						keyId='id'
						keyLabel='AccesseName'
						keyDesc='AccesseDescription'
						placeholder='Autocomplete pilihan akses data'
						isHide={(item) => {
							const hasSelected = displayedData.filter((v) => v.id == item.id);
							if (isArrayExist(hasSelected)) return true;
						}}
						onChange={(item) => {
							onAddNewRoleItem(item);
						}}
						clearOnSelection
					/>
				</div>
			</div>
			<div className='flex flex-row gap-2 mt-6'>
				<button className='btn btn-info'>Save</button>
				<button className='btn btn-error'>Cancel</button>
			</div>
		</div>
	);
};
