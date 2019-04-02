'use strict'

import { withStatusCode } from '../utils/response'

const ok = withStatusCode(200, JSON.stringify)

const endpoint = {

	method: 'get',
	path: '/hello',
	handler: () => {

		return ok({
			'message': 'hello world'
		})

	}

}

export default endpoint