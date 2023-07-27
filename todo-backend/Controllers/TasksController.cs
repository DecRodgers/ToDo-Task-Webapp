using Microsoft.AspNetCore.Mvc;
using todo_backend.Models;
using todo_backend.Services;

namespace todo_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService taskService;
        public TasksController(TaskService TaskService) {
            this.taskService = TaskService;            
        }

        [HttpGet]
        public IActionResult GetAllTasks() {
            var tasks = taskService.GetAllTasks();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] TaskData taskData)
        {
            if (taskService.GetAllTasks().Exists(t => t.name == taskData.name))
            {
                return BadRequest("Task with the same name already exists.");
            }
            if (taskData.priority < 1)
            {
                return BadRequest("Priority cannot be 0 or a negative number.");
            }
            taskService.AddTask(taskData.name, taskData.priority, taskData.status);
            TaskData? addedTask = taskService.GetAllTasks().FirstOrDefault(t => t.name == taskData.name);
            return Ok(addedTask);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskData task) {
            taskService.UpdateTask(id, task);
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id) {
            if (taskService.GetAllTasks().Exists(t => t.id == id)) {
                taskService.DeleteTask(id);
                return Ok();
            } else {
                return BadRequest("The selected task doesn't exist.");
            }
        }
    }
}