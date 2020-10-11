import { ProjectTask } from '../models/project-task.js';
import Component from './base-componet.js';
import { autobind } from '../decorators/autobind.js';
import { Draggable } from '../models/draggable.js';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLDivElement>
  implements Draggable {
  private project: ProjectTask;
  constructor(hostId: string, project: ProjectTask) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStart);
    this.element.addEventListener('dragend', this.dragEnd);
  }

  renderContent() {
    this.element.querySelector('h4')!.textContent = this.project.technology;
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @autobind
  dragStart(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    console.log(this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEnd(_: DragEvent) {
    console.log('DragEnd');
  }
}
