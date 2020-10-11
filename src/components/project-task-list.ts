import { ProjectTask } from '../models/project-task.js';
import { ProjectStatus } from '../models/status-enum.js';
import { projectState } from '../state/task-state.js';
import { ProjectItem } from './project-task-item.js';
import { status } from '../types/status.js';
import Component from './base-componet.js';
import { DragTarget } from '../models/draggable.js';
import { autobind } from '../decorators/autobind.js';

export class ProjectTaskList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
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

  configure(): void {
    this.element.addEventListener('dragover', this.dragOver);
    this.element.addEventListener('dragleave', this.dragLeave);
    this.element.addEventListener('drop', this.drop);
  }

  @autobind
  dragOver(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  drop(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    let finalType: ProjectStatus;
    if (this.type === 'active') {
      finalType = ProjectStatus.Active;
    } else if (this.type === 'in-progress') {
      finalType = ProjectStatus.InProgress;
    } else if (this.type === 'in-validation') {
      finalType = ProjectStatus.Validation;
    } else {
      finalType = ProjectStatus.Complete;
    }
    projectState.moveProject(prjId, finalType);
  }

  @autobind
  dragLeave(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
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

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h4')!.textContent =
      this.type.toUpperCase() + ' TASKS';
  }
}
