/**
 * @file statusMessages
 * @description handles status messages / error responses
 */

/**
 * Handles rejections other than errors. 400, 401, etc.
 */
function reject(res, status, reason) {
	return res.status(status).json({ message: reason ?? 'Invalid request' });
}
 
/**
 * Handles errors
 */
function error(res, status, e, message) {
	if (process.env.NODE_ENV !== 'production') {
		return res.status(status).json({ message, error: e.message });
	}
}
 
module.exports = { reject, error };