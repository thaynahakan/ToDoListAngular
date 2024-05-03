import { Component } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  newTask(): void {
    this.selectedTask = { title: '', description: '', completed: false };
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => this.fetchTasks());
  }

  onSubmit(): void {
    if (this.selectedTask) {
      if (this.selectedTask.title.trim() && this.selectedTask.description.trim()) {
        if (this.selectedTask._id) {
          this.taskService.updateTask(this.selectedTask).subscribe(() => {
            this.fetchTasks();
            this.selectedTask = null;
          });
        } else {
          this.taskService.addTask(this.selectedTask).subscribe(() => {
            this.fetchTasks();
            this.selectedTask = null;
          });
        }
      } else {
        alert('Título e descrição são necessários.');
      }
    }
  }  

  clearSelection(): void {
    this.selectedTask = null;
  }
}
