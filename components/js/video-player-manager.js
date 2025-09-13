// ===== VIDEO PLAYER MANAGER =====
class VideoPlayerManager {
    constructor() {
        this.players = new Map();
    }

    static isVideoUrl(url) {
        if (!url) return false;

        // Check for YouTube URLs
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        if (youtubeRegex.test(url)) return true;

        // Check for Vimeo URLs
        const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
        if (vimeoRegex.test(url)) return true;

        // Check for direct video files
        const videoExtensions = /\.(mp4|webm|ogg|avi|mov)(\?.*)?$/i;
        if (videoExtensions.test(url)) return true;

        return false;
    }

    createVideoElement(project) {
        const videoId = `video-${Date.now()}`;
        const videoUrl = project.video_url;

        // Determine video type and create appropriate element
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            return `
                <div class="project-video-wrapper">
                    <div class="plyr__video-embed" id="${videoId}">
                        <iframe
                            src="https://www.youtube.com/embed/${this.extractYouTubeId(videoUrl)}?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay">
                        </iframe>
                    </div>
                    <div class="video-overlay">
                        <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                        <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                    </div>
                </div>
            `;
        } else if (videoUrl.includes('vimeo.com')) {
            return `
                <div class="project-video-wrapper">
                    <div class="plyr__video-embed" id="${videoId}">
                        <iframe
                            src="https://player.vimeo.com/video/${this.extractVimeoId(videoUrl)}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay">
                        </iframe>
                    </div>
                    <div class="video-overlay">
                        <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                        <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="project-video-wrapper">
                    <video class="plyr-video" id="${videoId}" playsinline controls data-poster="">
                        <source src="${videoUrl}" type="video/mp4" />
                    </video>
                    <div class="video-overlay">
                        <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                        <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                    </div>
                </div>
            `;
        }
    }

    extractYouTubeId(url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        return match ? match[1] : '';
    }

    extractVimeoId(url) {
        const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
        return match ? match[1] : '';
    }

    initializePlayer(videoId) {
        if (typeof Plyr === 'undefined') {
            console.warn('Plyr not loaded, video player initialization skipped');
            return null;
        }

        try {
            const element = DOM.query(`#${videoId}`);
            if (!element) return null;

            const player = new Plyr(element, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                settings: ['quality', 'speed'],
                quality: { default: 720, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
                speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
                ratio: '16:9'
            });

            this.players.set(videoId, player);
            return player;
        } catch (error) {
            console.error('Failed to initialize video player:', error);
            return null;
        }
    }

    destroyPlayer(videoId) {
        const player = this.players.get(videoId);
        if (player && typeof player.destroy === 'function') {
            player.destroy();
            this.players.delete(videoId);
        }
    }

    destroyAllPlayers() {
        this.players.forEach((player, videoId) => {
            if (typeof player.destroy === 'function') {
                player.destroy();
            }
        });
        this.players.clear();
    }

    pauseAll() {
        this.players.forEach((player) => {
            try {
                if (player && typeof player.pause === 'function') {
                    player.pause();
                }
            } catch (e) {
                // ignore
            }
        });
    }
}

