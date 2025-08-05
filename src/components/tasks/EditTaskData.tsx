import { getTaskById } from "@/services/TaskService";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  // Project id
  const params = useParams();
  const projectId = params.projectId!;

  // Task id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, // Convert a true if the variable have a value or not
  });

  if (isLoading) return <p>Cargando tarea...</p>;
  if (isError || !data) return <p>Error al cargar la tarea.</p>;
  if (data) return <EditTaskModal data={data} />;
}
