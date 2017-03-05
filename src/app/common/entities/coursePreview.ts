import { CourseItem } from './courseItem';

export  class CoursePreview implements CourseItem {
	constructor(
		public id: number,
		public description: string,
		public duration: string,
		public date: Date
	) {}
}
