"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;
        this.listen = this.listen.bind(this);
    }
    async listen(message) {
        if (!message)
            return;
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            const fetchedPlaylist = await this._playlistsService.getPlaylistSongs(playlistId);
            const playlist = {
                playlist: {
                    id: fetchedPlaylist[0].id,
                    name: fetchedPlaylist[0].name,
                    songs: fetchedPlaylist.map((song) => ({
                        id: song.id,
                        title: song.title,
                        performer: song.performer,
                    })),
                },
            };
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = Listener;
