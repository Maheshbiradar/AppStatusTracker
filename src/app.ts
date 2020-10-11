// Code goes here!
import { ProjectInput } from './components/project-task-input';
import { ProjectTaskList } from './components/project-task-list';

new ProjectInput();
new ProjectTaskList('active');
new ProjectTaskList('in-progress');
new ProjectTaskList('in-validation');
new ProjectTaskList('completed');
