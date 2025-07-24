import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableTask from './SortableTask'; // individual draggable task card

import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import AddTaskModal from './AddTask';
import { ListPlus, Pencil, Trash2 } from "lucide-react";
import EditCategoryModal from './EditCategory';

export default function Column({ category, tasks, searchTerm, onTaskUpdate }) {
    const [items, setItems] = useState(tasks.map(t => t.id));
    const [updatedTasks, setUpdatedTasks] = useState(tasks);
    const [loading, setLoading] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

    useEffect(() => {
        let filterTasks = tasks;
        if (searchTerm) {
            filterTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setItems(filterTasks.map(t => t.id));
        setUpdatedTasks(filterTasks);
    }, [tasks, searchTerm]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        setItems(newOrder);

        // Prepare reordered tasks
        const reorderedTasks = newOrder.map((id, index) => ({
            id,
            position: index,
        }));

        try {
            await axios.post(`/api/categories/${category.id}/reorder`, {
                tasks: reorderedTasks,
            });
            onTaskUpdate(); // Refetch from backend
        } catch (err) {
            console.error('Failed to reorder:', err);
        }
    };

    const handleDelete = () => {
        try {
            axios.delete(`/api/categories/${category.id}`);
            onTaskUpdate(); // Refetch from backend
        } catch (err) {
            console.error('Failed to reorder:', err);
        }

    }

    const onDelete = async (taskId) => {
        try {
            setLoading(true)
            await axios.delete(`/api/tasks/${taskId}`);
            refetchTasks();
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    const refetchTasks = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/tasks?category_id=' + category.id);
            setUpdatedTasks(response.data);
            setItems(response.data.map(t => t.id));
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-[400px] max-w-[400px]  flex-1 p-4 m-2">
            <div className="flex items-center justify-between mb-4 flex-row bg-purple-400 text-white p-2  rounded shadow">
                <h2 className="text-[16px] font-bold p-1">{category.name}</h2>

                <div className="inline-flex gap-1">
                    <button title="Add Task" className="text-green-800 px-0  py-0  cursor-pointer" onClick={() => {
                        setActiveCategoryId(category.id);
                        setShowTaskModal(true);
                    }}><ListPlus /></button>
                    <button title="Edit Category" onClick={() => {
                        setShowCategoryModal(true)
                    }} className="text-green-800 underline text-xs"><Pencil /></button>
                    <button title="Delete Category" className="text-red-700  px-0 py-0   cursor-pointer" onClick={handleDelete}><Trash2 /></button>
                </div>
            </div>
            {loading && <div>Loading...</div>}
            {updatedTasks.length === 0 && <p className="px-4">No Tasks Created</p>}
            {
                !loading &&
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                            {items.map(id => {
                                const task = updatedTasks.find(t => t.id === id);
                                return <SortableTask key={task.id} task={task} handleDelete={onDelete} handleRefresh={refetchTasks} />;
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            }

            <AddTaskModal
                isOpen={showTaskModal}
                onClose={() => setShowTaskModal(false)}
                categoryId={activeCategoryId!}
                onCreated={refetchTasks}
            />
            <EditCategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                category={category!}
                onUpdated={onTaskUpdate} />
        </div >
    );

    // const { setNodeRef } = useDroppable({ id: category.id });
    // const [tasks, setTasks] = useState([]);
    // useEffect(() => {
    //     setTasks(category.tasks);
    // }, [category])
    // const refetchTasks = async () => {
    //     try {
    //         const response = await axios.get('/api/tasks?category_id=' + category.id);
    //         setTasks(response.data);
    //     } catch (err) {
    //         console.error('Failed to fetch tasks:', err);
    //     }
    // };


    // return (
    //     <div ref={setNodeRef} className="w-64 bg-gray-100 p-2 rounded">
    //         <h2 className="font-bold text-lg mb-2">{category.name}</h2>
    //         <AddTask categoryId={category.id} onCreated={refetchTasks} />
    //         {tasks.map(task => (
    //             <TaskCard key={task.id} task={task} />
    //         ))}
    //     </div>
    // );
}
