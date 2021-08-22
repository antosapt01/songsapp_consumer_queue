const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId) {
    const query = {
      text: 'SELECT playlists.id, playlists.name , users.username FROM users LEFT JOIN playlists on users.id = playlists.owner LEFT JOIN collaborations on playlists.id = collaborations.playlist_id where collaborations.user_id = $1 or playlists.owner=$1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
module.exports = SongsService;
