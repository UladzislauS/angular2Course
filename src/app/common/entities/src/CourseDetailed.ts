import { Course } from './Course';

export  class CourseDetailed implements Course {
	constructor(
		private _id: number,
		public name: string,
		public description: string,
		public duration: number,
		public date: Date,
		public author: string,
		public isTopRated: boolean
	) {}

	get id(): number {
		return this._id;
	}
}
