import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://crudcrud.com/api/95376cb18fe54f48943956f40af0f1a9/task';

  // b251a955cc334c90b595a3cdec0037ec
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    const id = task._id;
    const taskWithoutId = { ...task, _id: undefined };
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskWithoutId);
  }
}
