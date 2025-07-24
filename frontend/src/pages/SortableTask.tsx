import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Delete, Pencil } from 'lucide-react'; // Optional: drag handle icon
import { useState } from 'react';
import EditTaskModal from './EditTask';

type Task = {
    id: number | string;
    title: string;
    description: string;
};

type Props = {
    task: Task;
    handleDelete: (taskId: number | string) => void;
    handleRefresh: () => void;
};

export default function SortableTask({ task, handleDelete, handleRefresh }: Props) {

    const [showTaskModal, setShowTaskModal] = useState(false);
    const {
        setNodeRef,
        transform,
        transition,
        attributes,
        listeners,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white p-3 rounded shadow relative"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                </div>

                <div className="flex flex-row items-center gap-1 ml-2">

                    {/* Delete button */}
                    <button title="Edit Task" onClick={() => {
                        setShowTaskModal(true);
                    }} className="text-green-600 text-xs underline"><Pencil size={18} /></button>
                    <button
                        title="Delete Task"
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600  text-xs font-bold hover:underline "
                    >
                        <Delete size={18} />
                    </button>
                    {/* Drag handle (only this area is draggable) */}
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-gray-400"
                        title="Drag"
                    >
                        <GripVertical size={16} />
                    </div>
                </div>
            </div>
            <EditTaskModal
                isOpen={showTaskModal}
                onClose={() => setShowTaskModal(false)}
                task={task}
                onUpdated={handleRefresh} />
        </div>
    );
}
