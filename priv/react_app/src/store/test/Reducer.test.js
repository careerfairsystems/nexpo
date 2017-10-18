/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/

import reducer from '../reducers/CompaniesReducer'
import actionTypes from '../ActionTypes'

describe('Companies reducer', () => {
	it('should return the empty initial state', () => {
		expect(reducer(undefined, {})).toEqual([])
	})

	it('should handle FETCH_COMPANIES_SUCCESS', () => {
		expect(
			reducer([], {
				type: actionTypes.FETCH_COMPANIES_SUCCESS,
				companies: [
					{
						"name": "Spotify",
						"id": 1,
						"entries": [
							{
								"value": "55",
								"id": 48,
								"attribute": {
									"value": null,
									"type": null,
									"title": "Trevligthetsskala",
									"id": 11,
									"category": {
										"title": "Övrigt",
										"id": 3
									}
								}
							}
						],
						"email": "legend@spotify.com"
					},
					{
						"name": "Google",
						"id": 2,
						"entries": [
							{
								"value": "54",
								"id": 26,
								"attribute": {
									"value": null,
									"type": null,
									"title": "Pub",
									"id": 14,
									"category": {
										"title": "Event",
										"id": 4
									}
								}
							},
							{
								"value": "68",
								"id": 27,
								"attribute": {
									"value": null,
									"type": null,
									"title": "Lunchföreläsning",
									"id": 13,
									"category": {
										"title": "Event",
										"id": 4
									}
								}
							},
							{
								"value": "96",
								"id": 30,
								"attribute": {
									"value": null,
									"type": null,
									"title": "Trevligthetsskala",
									"id": 11,
									"category": {
										"title": "Övrigt",
										"id": 3
									}
								}
							}
						],
						"email": "pro@gmail.com"
					}
				]
			})
		).toEqual([
			{
				"name": 'Spotify',
				"id": 1,
				"email": "legend@spotify.com"
			},
			{
				"name": 'Google',
				"id": 2,
				"email": "pro@gmail.com"
			}
		])
	})
})