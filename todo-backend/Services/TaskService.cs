using todo_backend.Models;

namespace todo_backend.Services
{
    public class TaskService
    {
        private List<TaskData> tasksList = new List<TaskData>();
        private int taskCounter;

        public TaskService() { 
            taskCounter = 0;
            //LoadSampleData();
        }

        public void AddTask(string taskName, int taskPriority,string taskStatus) {
            taskCounter++;            
            TaskData newTask = new TaskData {id=taskCounter, name=taskName, priority=taskPriority, status=taskStatus };
            tasksList.Add(newTask);
        }

        public List<TaskData> GetAllTasks() {
            return tasksList.OrderBy(t => t.priority).ToList();
        }

        public void UpdateTask(int Id, TaskData Task) {
            var existingTask = tasksList.Find(t => t.id == Id);
            if (existingTask != null)
            {
                existingTask.name = Task.name;
                existingTask.priority = Task.priority;
                existingTask.status = Task.status;
            }
        }

        public void DeleteTask(int Id) {
            tasksList.RemoveAll(t => t.id == Id);
        }

        public void LoadSampleData() {
            /*Load Sample Data*/
            tasksList.Add(new TaskData { id = 1, name = "Task A", priority = 1 ,status = "Completed" });
            tasksList.Add(new TaskData { id = 2, name = "Task B", priority = 2, status = "In Progress" });
            tasksList.Add(new TaskData { id = 3, name = "Task C", priority = 3, status = "Not Started" });
            tasksList.Add(new TaskData { id = 4, name = "Task D", priority = 1, status = "Not Started" });
            taskCounter += 4;
        }
    }
}
