import { Record } from 'immutable'

// TYPES
const moduleName = 'messages'

export const SHOW_NOTICE = `${moduleName}/showNotice`
export const HIDE_NOTICE = `${moduleName}/hideNotice`
export const SHOW_ERROR = `${moduleName}/showError`
export const HIDE_ERROR = `${moduleName}/hideError`

// REDUCER
const ReducerRecord = Record({
	notices: [],
	errors: []
})

export default function messageReducer(state = new ReducerRecord(), action) {
	const { type, payload } = action

	switch (type) {
		case SHOW_NOTICE:
			return state = {...state, errors: [...state.errors], notices: [...state.notices, payload.notices]}

		case HIDE_NOTICE:
			return state = {...state, notices: []}

		case SHOW_ERROR:
			return state = {...state, notices: [...state.notices], errors: state.errors.concat(payload.errors)}

		case HIDE_ERROR:
			return state = {...state, errors: []}

		default:
			return state
	}
}

// ACTION CREATORS
export const showNotices = notices => {
	return {
		type: SHOW_NOTICE,
		payload: {
			notices: notices
		}
	}
}

export const hideNotices = {
	type: HIDE_NOTICE
}

export const showErrors = errors => (
	{
		type: SHOW_ERROR,
		payload: {
			errors: errors
		}
	}
)

export const hideErrors = {
	type: HIDE_ERROR
}