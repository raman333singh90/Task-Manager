import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import AddCategoryModal from './AddCategory';
import AddCategory from './AddCategory';
import Column from './Column'; // Columns for categories

export interface Task {
    id: number;
    title: string;
    description: string;
    category_id: number;
    position: number;
}

export interface Category {
    id: number;
    name: string;
    tasks: Task[];
}

export default function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (err) {
            console.error('Failed to fetch:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="p-0 pt-0">
            <div className="flex justify-between items-center mb-1 flex-row px-6 bg-white rounded py-1 border-b-bg-gray-200 shadow">
                <h1 className="text-3xl font-semibold mb-1 text-[20px]">Task Manager</h1>
                <div className="flex flex-row gap-4  ">
                    <div className="p-2 ">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full min-w-64 h-8 p-1 border rounded"
                        />
                    </div>
                    <button className="bg-purple-400 hover:bg-purple-700 text-white py-1 px-2 rounded font-semibold text-[14px] max-h-8 mt-2" onClick={() => setShowCategoryModal(true)}>+ Add Category</button>
                </div>
            </div>
            {loading && <div>Loading...</div>}
            {!loading &&
                <div className="space-x-8  flex w-full overflow-x-auto bg-white max-h-[74vh] overflow-auto">
                    {categories.map((category) => (
                        <Column
                            key={category.id}
                            category={category}
                            searchTerm={searchTerm}
                            tasks={category.tasks.sort((a, b) => a.position - b.position)}
                            onTaskUpdate={fetchData}
                        />
                    ))}
                </div>
            }
            <AddCategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onCreated={fetchData}
            />
        </div>
    );
}
