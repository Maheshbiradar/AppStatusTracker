// Code goes here!
import { ProjectInput } from './components/project-task-input.js';
import { ProjectTaskList } from './components/project-task-list.js';

new ProjectInput();
new ProjectTaskList('active');
new ProjectTaskList('in-progress');
new ProjectTaskList('in-validation');
new ProjectTaskList('completed');
