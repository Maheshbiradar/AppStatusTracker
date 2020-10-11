import { ProjectTask } from '../models/project-task.js';
import { ProjectStatus } from '../models/status-enum.js';
import { projectState } from '../state/task-state.js';
import { ProjectItem } from './project-task-item.js';
import { status } from '../types/status.js';
import Component from './base-componet.js';

export class ProjectTaskList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: ProjectTask[];

  constructor(private type: status) {
    super('project-list', 'dataRow', false, `${type}-projects`);
    this.assignedProjects = [];
    projectState.addListener((projects: ProjectTask[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        if (this.type === 'in-progress') {
          return prj.status === ProjectStatus.InProgress;
        }
        if (this.type === 'in-validation') {
          return prj.status === ProjectStatus.Validation;
        }
        return prj.status === ProjectStatus.Complete;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.configure();
    this.renderContent();
  }

  configure(): void {}

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h4')!.textContent =
      this.type.toUpperCase() + ' TASKS';
  }
}
