using System.Linq;
using todo_backend.Models;
using todo_backend.Services;
using Xunit;
using FluentAssertions;

/*
 * ## Please Note ##
 * There is a method in contructor of TaskService to add sample data
 * Please comment this method out before running tests
 */

namespace TodoApp.Tests
{
    public class TaskServiceTests
    {
        [Fact]
        public void AddTask_ShouldIncreaseTasksList() {
            // Arrange
            var taskService = new TaskService();
            var initialCount = taskService.GetAllTasks().Count;
            var newTask = new TaskData { id = 1, name = "New Task", priority = 1, status = "Not Started" };

            // Act
            taskService.AddTask(newTask.name, newTask.priority, newTask.status);

            // Assert
            taskService.GetAllTasks().Should().HaveCount(initialCount + 1);
        }

        [Fact]
        public void GetAllTasks_ReturnsSortedTasksByPriority() {
            // Arrange
            var taskService = new TaskService();

            // Act
            var tasks = taskService.GetAllTasks().ToList();

            // Assert
            tasks.Should().BeInAscendingOrder(t => t.priority);
        }
    }
}