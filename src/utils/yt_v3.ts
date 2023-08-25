export type YoutubePlaylistItem = {
    id: string
    title: string
    duration: string
    thumbnailUrl: string
    channelTitle: string
}

type YtDataApiV3Item /* FilteredV3Item */ = {
    id: string
    snippet: {
        title: string
        channelTitle: string
        thumbnails: {
            medium: {
                url: string
            }
            standard: {
                url: string
            }
        }
    }
    contentDetails: {
        duration: string
    }
}

export class YT_V3 {
    static #API_KEY = 'AIzaSyDImdC9Fd9pQfowo8m5Yi-Hoj_tU8TRQ48' //REVIEW - keep it private

    static parsePlaylistId(url: string) {
        // const test = playlistUrl.match(/list=(.*)&/)![1];
        return url.match(/(?<=list=).*/)?.[0].substring(0, 34) ?? ''
    }

    static async #getPlaylistVideoIds(url: string) {
        const videoIdList: Array<string> = []
        const playlistId = YT_V3.parsePlaylistId(url)
        const sourceOfIds = await fetch(
            'https://youtube.googleapis.com/youtube/v3/playlistItems?' +
                'part=contentDetails' +
                '&maxResults=50' +
                `&playlistId=${playlistId}` +
                '&fields=items%2FcontentDetails(videoId)' +
                `&key=${YT_V3.#API_KEY}`
        ).then((res) => res.json())

        for (const item of sourceOfIds.items) {
            videoIdList.push(item.contentDetails.videoId)
        }

        return videoIdList
    }

    static async getPlaylistVideos(youtubeUrl: string) {
        const videoIdList = await YT_V3.#getPlaylistVideoIds(youtubeUrl)

        function filterItem(ytDataApiV3Item: YtDataApiV3Item) {
            return {
                id: ytDataApiV3Item.id,
                title: ytDataApiV3Item.snippet.title,
                channelTitle: ytDataApiV3Item.snippet.channelTitle,
                duration: ytDataApiV3Item.contentDetails.duration,
                thumbnailUrl: ytDataApiV3Item.snippet.thumbnails.medium.url,
            } as YoutubePlaylistItem
        }

        const response = await fetch(
            'https://youtube.googleapis.com/youtube/v3/videos?' +
                'part=id%2C%20snippet%2C%20contentDetails' +
                `&id=${videoIdList.join('%2C')}` +
                `&key=${YT_V3.#API_KEY}`
        ).then((res) => res.json())

        return response.items.map((item: YtDataApiV3Item) => {
            return filterItem(item)
        }) as Array<YoutubePlaylistItem>
    }

    static formatDuration(
        ISO_8601_duration: string,
        type: 'hms' | 'colon'
    ): string
    static formatDuration(ISO_8601_duration: string, type: 'seconds'): number
    static formatDuration(
        ISO_8601_duration: string,
        type: 'hms' | 'colon' | 'seconds'
    ): string | number {
        const H = ISO_8601_duration.match(/\d*H/)?.[0] ?? ''
        const M = ISO_8601_duration.match(/\d*M/)?.[0] ?? ''
        const S = ISO_8601_duration.match(/\d*S/)?.[0] ?? ''
        switch (type) {
            case 'hms':
                return `${H} ${M} ${S || ISO_8601_duration}`.toLowerCase()

            case 'colon':
                return (
                    `${H && parseInt(H) + ':'}` +
                    `${parseInt(M || '0') + ':'}` +
                    // prettier-ignore
                    `${parseInt(S || '0').toString().padStart(2, '0')}`
                )

            case 'seconds': {
                const hours = parseInt(H) || 0
                const minutes = parseInt(M) || 0
                const seconds = parseInt(S) || 0
                return hours * 3600 + minutes * 60 + seconds
            }
        }
    }
}

export function readYoutubePlayerState(youtubePlayerState: number) {
    switch (youtubePlayerState) {
        case -1:
            return 'unstarted'
        case 0:
            return 'ended'
        case 1:
            return 'playing'

        case 2:
            return 'paused'

        case 3:
            return 'buffering'

        case 5:
            return 'video cued'
    }
}
