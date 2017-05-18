import {
	Action
} from '@ngrx/store';

import {
	CourseDetailed,
	CoursesState
} from '../entities';

export const LOAD_COURSES = 'ADD_COURSES';
export const EDIT_COURSE = 'EDIT_COURSE';

export function coursesReducer(state: CoursesState = new CoursesState(1, '', 0, []), action: Action) {
	switch (action.type) {
		case LOAD_COURSES:
			return action.payload;
		case EDIT_COURSE:
			return new CoursesState(state.page, state.filter, state.totalCount,	state.courses.map((course) => {
				return course.id === action.payload.id ? Object.assign({}, course, action.payload) : course;
			}));
		default:
			return state;
	}
}
