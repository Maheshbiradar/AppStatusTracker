import { ProjectTask } from '../models/project-task.js';

export class ProjectItem {
  private project: ProjectTask;
  templateElement: HTMLTemplateElement;
  hostElement: HTMLUListElement;
  element: HTMLDivElement;
  constructor(hostId: string, project: ProjectTask) {
    this.hostElement = document.getElementById(hostId)! as HTMLUListElement;
    this.templateElement = document.getElementById(
      'single-project'
    )! as HTMLTemplateElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLDivElement;
    this.project = project;

    this.attach();
    this.renderContent();
  }

  renderContent() {
    this.element.querySelector('h4')!.textContent = this.project.technology;
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
