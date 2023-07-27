using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using todo_backend.Controllers;
using todo_backend.Models;
using todo_backend.Services;
using Xunit;
using FluentAssertions;

/*
 * ## Please Note ##
 * There is a method in contructor of TaskService to add sample data
 * Please comment this method out before running tests
 */

namespace todo_app.tests
{
    public class TaskControllerTests
    {
        //Create
        [Fact]
        public void AddTasks_ShouldAddATask() {
            //Arrange
            var taskService = new TaskService();
            var controller = new TasksController(taskService);

            //Act
            TaskData newTask = new TaskData { id = 1, name = "Task A", priority = 2, status = "Completed" };

            //Assert data is added OK
            var okResult = controller.AddTask(newTask).Should().BeOfType<OkObjectResult>();

            //Assert First item is the same as the one added to list
            var model = okResult.Subject.Value.Should().BeOfType<TaskData>().Subject;

            model.Should().NotBeNull();
            model.Should().BeEquivalentTo(newTask);
        }

        //Read
        [Fact]
        public void GetAllTasks_ReturnsListOfTasks() {
            // Arrange
            var taskService = new TaskService();
            var controller = new TasksController(taskService);

            // Act
            var result = controller.GetAllTasks();

            // Assert List is sent back
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var model = okResult.Value.Should().BeOfType<List<TaskData>>().Subject;

            // Assert that the returned model is not null and empty.
            model.Should().NotBeNull();
            model.Should().BeEmpty();
        }

        // Update
        [Fact]
        public void UpdateTask_ShouldUpdateExistingTask()
        {
            // Arrange
            var taskService = new TaskService();
            var controller = new TasksController(taskService);
            var originalTask = new TaskData { id = 1, name = "Task A", priority = 2, status = "Not Started" };
            var updatedTask = new TaskData { id = 1, name = "Updated Task", priority = 3, status = "Completed" };
            controller.AddTask(originalTask);

            // Act
            var okObjectResult = controller.UpdateTask(1, updatedTask);

            // Assert that item returned has been changed and doesnt resemble original task
            okObjectResult.Should().BeOfType<OkObjectResult>();
            var taskList = (controller.GetAllTasks() as OkObjectResult)?.Value as List<TaskData>;
            taskList.Should().ContainEquivalentOf(updatedTask);
            taskList.Should().NotContain(originalTask);
        }

        // Delete
        [Fact]
        public void DeleteTask_ShouldDeleteExistingTask()
        {
            // Arrange
            var taskService = new TaskService();
            var controller = new TasksController(taskService);

            // Add a task to the list for deletion
            TaskData taskToDelete = new TaskData { id = 1, name = "Task A", priority = 2, status = "Completed" };
            controller.AddTask(taskToDelete);

            // Get the initial count of tasks
            int initialCount = taskService.GetAllTasks().Count;

            // Act
            var okResult = controller.DeleteTask(taskToDelete.id);

            // Assert assert that list has been reduced by 1 after task deletion
            okResult.Should().BeOfType<OkResult>(); 
            taskService.GetAllTasks().Should().HaveCount(initialCount - 1); 
        }
    }
}