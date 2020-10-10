import { Listener } from '../types/listeners.js';
import { ProjectTask } from '../models/project-task.js';
import { ProjectStatus } from '../models/status-enum.js';

class ProjectState {
  private listeners: Listener[] = [];
  private projects: ProjectTask[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string) {
    const newProject = new ProjectTask(
      Math.random().toString(),
      title,
      description,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
export const projectState = ProjectState.getInstance();
