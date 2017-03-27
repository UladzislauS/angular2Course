import { Course } from './Course';

export  class CoursePreview implements Course {
	constructor(
		public id: number,
		public description: string,
		public duration: string,
		public date: Date
	) {}
}
