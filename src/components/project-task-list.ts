import { ProjectTask } from '../models/project-task.js';
import { ProjectStatus } from '../models/status-enum.js';
import { projectState } from '../state/task-state.js';
import { ProjectItem } from './project-task-item.js';
import { status } from '../types/status.js';

export class ProjectTaskList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: ProjectTask[];

  constructor(private type: status) {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('dataRow')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

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

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h4')!.textContent =
      this.type.toUpperCase() + ' TASKS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
