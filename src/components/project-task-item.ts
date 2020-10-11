import { ProjectTask } from '../models/project-task.js';
import Component from './base-componet.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLDivElement> {
  private project: ProjectTask;
  constructor(hostId: string, project: ProjectTask) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }

  configure(): void {}

  renderContent() {
    this.element.querySelector('h4')!.textContent = this.project.technology;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
