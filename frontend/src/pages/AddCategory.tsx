// src/components/AddCategoryModal.tsx
import { useState } from 'react';
import Modal from '../components/Modal';
import axios from '../lib/axios';

export default function AddCategoryModal({ isOpen, onClose, onCreated }: {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        try {
            setLoading(true);
            await axios.post('/api/categories', { name });
            setName('');
            onCreated();
            onClose();
        } catch (err) {
            alert('Error creating category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col ">
                <h2 className="text-lg font-semibold mb-4">Add Category</h2>
                <input
                    type="text"
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border w-full p-2 mb-4 rounded"
                />
                <button data-testid="categoryAdd" onClick={handleCreate} className="bg-purple-400 hover:bg-purple-700 text-white px-4 py-2 rounded">
                    {loading ? "Loading" : "Add Category"}
                </button>
            </div>
        </Modal>
    );
}
