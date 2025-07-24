import { useState, useEffect } from 'react';
import Modal from './../components/Modal';
import axios from '../lib/axios';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onUpdated: () => void;
    task: { id: number; title: string; description: string; category_id: number } | null;
};

export default function EditTaskModal({ isOpen, onClose, onUpdated, task }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleUpdate = async () => {
        if (!task) return;
        setLoading(true);
        try {
            await axios.put(`/api/tasks/${task.id}`, { title, description });
            onUpdated();
            onClose();
        } catch {
            alert('Error updating task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 mb-2 rounded w-full"
                    placeholder="Task title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 mb-4 rounded w-full"
                    placeholder="Task description"
                />
                <button
                    onClick={handleUpdate}
                    className="bg-purple-400 hover:bg-puple-600 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </Modal>
    );
}
