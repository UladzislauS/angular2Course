import {
	Course
} from './Course';
import {
	CourseDetailed
} from './CourseDetailed';

export  class CoursesState {
	constructor(
		public page: number,
		public filter: string,
		public totalCount: number,
		public courses: CourseDetailed[]
	) {}
}
