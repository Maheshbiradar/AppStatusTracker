import { autobind } from '../decorators/autobind';
import { Validatable } from '../interfaces/validatable';
import { validate } from '../helpers/validation';
import { projectState } from '../state/task-state';

export class ProjectInput {
  templateElement: HTMLDivElement;
  element: HTMLFormElement;
  technologyInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLDivElement;

    this.element = document.querySelector('form')! as HTMLFormElement;

    this.element.id = 'task-input';

    this.technologyInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;

    this.configure();
  }

  private gatherUserInput(): [string, string] | void {
    const enteredTitle = this.technologyInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    if (!validate(titleValidatable) || !validate(descriptionValidatable)) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription];
    }
  }

  private clearInputs() {
    this.technologyInputElement.value = '';
    this.descriptionInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc] = userInput;
      projectState.addProject(title, desc);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}
