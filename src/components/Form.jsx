import React from 'react';
import { useState } from 'react';

export const Form = () => {
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

	const [displayedData, setDisplayedData] = useState([]);
	const [remainingData, setRemainingData] = useState(dataDummy);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleSelectChange = (e) => {
		const selectedId = e.target.value;
		const selectedData = remainingData.find((item) => item.id === parseInt(selectedId));
		setSelectedItem(selectedData);
	};

	const handleAddData = () => {
		if (selectedItem) {
			// Tambahkan data yang dipilih ke tabel
			setDisplayedData([...displayedData, selectedItem]);

			// Hapus data dari remainingData
			const newRemainingData = remainingData.filter((item) => item.id !== selectedItem.id);
			setRemainingData(newRemainingData);

			// Reset pilihan di dropdown
			setSelectedItem(null);
		}
	};

	const handleDeleteData = (id) => {
		const deletedData = displayedData.find((item) => item.id === id);
		const newDisplayedData = displayedData.filter((item) => item.id !== id);
		setDisplayedData(newDisplayedData);
		setRemainingData([...remainingData, deletedData]);
	};
	return (
		<div className='flex flex-col max-w-md mx-auto mt-6 gap-6 bg-slate-200 py-4'>
			<input
				type='text'
				placeholder='Add Role'
				className='input input-primary bg-slate-50 w-full max-w-xs'
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
											onClick={() => handleDeleteData(item.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
				<div className='mt-4 flex gap-6'>
					{remainingData.length > 0 && (
						<select
							className='select select-primary w-full max-w-xs bg-slate-50'
							onChange={handleSelectChange}
							value={selectedItem ? selectedItem.id : ''}
						>
							<option value='' disabled selected>
								Autocomplete pilihan akses data
							</option>
							{remainingData.map((item) => (
								<option key={item.id} value={item.id}>
									{item.AccesseName} - {item.AccesseDescription}
								</option>
							))}
						</select>
					)}
					<button className='btn btn-active btn-primary' onClick={handleAddData}>
						Add
					</button>
				</div>
			</div>
			<div className='flex flex-row gap-2 mt-6'>
				<button className='btn btn-info'>Save</button>
				<button className='btn btn-error'>Cancel</button>
			</div>
		</div>
	);
};
