// src/components/AddTaskModal.tsx
import { useState } from 'react';
import Modal from '../components/Modal';
import axios from '../lib/axios';

export default function AddTaskModal({ isOpen, onClose, categoryId, onCreated }: {
    isOpen: boolean;
    onClose: () => void;
    categoryId: number;
    onCreated: () => void;
}) {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');

    const handleCreate = async () => {
        try {
            setLoading(true);
            await axios.post('/api/tasks', {
                title,
                description,
                category_id: categoryId,
            });
            setTitle('');
            setDescription('');
            onCreated();
            onClose();
        } catch (err) {
            alert('Error creating task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Add Task</h2>
                <input
                    type="text"
                    placeholder="Add Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border w-full p-2 mb-2 rounded"
                />
                <textarea
                    placeholder="Add Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border w-full p-2 mb-4 rounded"
                />
                <button data-testid="taskAdd" onClick={handleCreate} className="bg-purple-400 hover:bg-purple-700 text-white px-4 py-2 rounded ">
                    {loading ? " Creating..." : "Add Task"}
                </button>
            </div>
        </Modal>
    );
}
