'use strict'

import { withStatusCode } from '../utils/response'

const ok = withStatusCode(200, JSON.stringify)

const endpoint = {

	method: 'post',
	path: '/hi',
	handler: body => {
        
		const { name } = body

		return ok({
			'message': `hi ${ name === undefined ? 'karen' : name }`
		})
        
	}

}

export default endpoint