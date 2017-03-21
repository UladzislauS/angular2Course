import { CourseItem } from './courseItem';

export  class CourseDetailed implements CourseItem {
	constructor(
		private _id: number,
		public description: string,
		public duration: string,
		public date: Date,
		public author: string,
		public likes: number
	) {}

	get id(): number {
		return this._id;
	}
}
