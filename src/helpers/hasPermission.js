



/**
 * Checks if a user has permission to access another user's data.
 * @param {string} userId - The ID of the user making the request.
 * @param {string} requestedId - The ID of the user whose data is being requested.
 * @returns {Promise<void>} - A Promise that resolves if the user has permission, or rejects with an error if not.
 */
async function hasPermission(userId, requestedId) {
  try {

    if (userId !== requestedId) {
      return Promise.reject(new Error(`User ${userId} does not have permission to access user ${requestedId}`));
    }
    return Promise.resolve();

  } catch (error) {
    return Promise.reject(error);
  }
}



module.exports = hasPermission;