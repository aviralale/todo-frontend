import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API_URL, axiosInstance } from "../api/api";
import { Task } from "../lib/types";
import debounce from "lodash/debounce";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false); // New state for preview mode
  const [isCompleted, setIsCompleted] = useState(false); // State for completion status
  const { id } = useParams<{ id: string }>();

  // Fetch task data
  const fetchTask = async () => {
    try {
      const response = await axiosInstance.get<Task>(`${API_URL}tasks/${id}/`);
      setTask(response.data);
      setEditedTask(response.data);
      setIsCompleted(response.data.is_completed); // Initialize isCompleted from the backend
      setError(null);
    } catch (error) {
      setError("Failed to fetch task. Please try again.");
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save task data
  const saveTask = async (updatedData: Partial<Task>) => {
    setIsSaving(true);
    try {
      const response = await axiosInstance.patch<Task>(
        `${API_URL}tasks/${id}/`,
        updatedData
      );
      setTask(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to save changes. Please try again.");
      console.error("Error saving task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data: Partial<Task>) => {
      saveTask(data);
    }, 1000),
    []
  );

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedTask = { ...editedTask, [name]: value };
    setEditedTask(updatedTask);
    debouncedSave(updatedTask);
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full min-h-screen p-4">
      {task ? (
        <div className="space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              name="title"
              value={editedTask.title || ""}
              onChange={handleInputChange}
              onBlur={() => debouncedSave(editedTask)}
              className="block w-full text-2xl font-bold border-none focus:outline-none focus:border-blue-500"
              placeholder="Untitled"
            />
          </div>

          {/* Description */}
          <div>
            {isPreviewMode ? (
              // Preview Mode: Render pre-rendered HTML
              <div
                className=""
                onClick={() => setIsPreviewMode(false)} // Click to edit
                dangerouslySetInnerHTML={{
                  __html: task.description_html || "",
                }}
              />
            ) : (
              // Edit Mode: Textarea for editing
              <textarea
                name="description"
                value={editedTask.description || ""}
                onChange={handleInputChange}
                onBlur={() => debouncedSave(editedTask)}
                rows={6}
                className="block w-full border-none focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Write something..."
              />
            )}
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-between space-x-2 mt-2">
            {/* Completed/Due Button */}
            <button
              onClick={async () => {
                const newIsCompleted = !isCompleted; // Toggle the state
                setIsCompleted(newIsCompleted);

                // Send the updated `is_completed` value to the backend
                await saveTask({ is_completed: newIsCompleted });
              }}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {isCompleted ? "Completed" : "Due"}
            </button>

            {/* Edit/Preview Button */}
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {isPreviewMode ? "Edit" : "Preview"}
            </button>
          </div>

          {/* Saving Indicator */}
          {isSaving && (
            <span className="text-gray-500 text-sm">Saving changes...</span>
          )}
        </div>
      ) : (
        <div>No task found.</div>
      )}
    </div>
  );
};

export default TaskPage;
