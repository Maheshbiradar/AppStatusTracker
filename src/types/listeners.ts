import { ProjectTask } from '../models/project-task';

export type Listener = (items: ProjectTask[]) => void;
