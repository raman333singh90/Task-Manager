import { useState, useEffect } from 'react';
import Modal from './../components/Modal';
import axios from '../lib/axios';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onUpdated: () => void;
    category: { id: number; name: string } | null;
};

export default function EditCategoryModal({ isOpen, onClose, onUpdated, category }: Props) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) setName(category.name);
    }, [category]);

    const handleUpdate = async () => {
        if (!category) return;
        setLoading(true);
        try {
            await axios.put(`/api/categories/${category.id}`, { name });
            onUpdated();
            onClose();
        } catch {
            alert('Error updating category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border w-full p-2 mb-4 rounded"
                />
                <button
                    onClick={handleUpdate}
                    className="bg-purple-400 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </Modal>
    );
}
