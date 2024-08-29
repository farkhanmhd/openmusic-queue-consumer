import { Pool } from 'pg';

export default class PlaylistsService {
  private _pool: Pool;

  constructor() {
    this._pool = new Pool();

    this.getPlaylistSongs = this.getPlaylistSongs.bind(this);
  }

  async getPlaylistSongs(playlistId: string) {
    const query = {
      text: `SELECT playlists.id, playlists.name, songs.id as song_id, songs.title, songs.performer
      FROM playlist_songs
      FULL JOIN songs ON playlist_songs.song_id = songs.id
      FULL JOIN playlists ON playlist_songs.playlist_id = playlists.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Playlist not found');
    }

    return result.rows;
  }
}
