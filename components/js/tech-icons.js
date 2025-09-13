// ===== TECH ICONS =====
class TechIcons {
    static MAP = {
        'HTML/CSS': { icon: '<img src="https://img.icons8.com/color/32/html-5--v1.png" alt="HTML/CSS"/>', class: 'html' },
        'HTML': { icon: '<img src="https://img.icons8.com/color/32/html-5--v1.png" alt="HTML"/>', class: 'html' },
        'CSS': { icon: '<img src="https://img.icons8.com/color/32/css3.png" alt="CSS"/>', class: 'css' },
        'JavaScript': { icon: '<img src="https://img.icons8.com/color/32/javascript--v1.png" alt="JavaScript"/>', class: 'js' },
        'React': { icon: '<img src="https://img.icons8.com/color/32/react-native.png" alt="React"/>', class: 'react' },
        'Python': { icon: '<img src="https://img.icons8.com/color/32/python--v1.png" alt="Python"/>', class: 'python' },
        'Java': { icon: '<img src="https://img.icons8.com/color/32/java-coffee-cup-logo--v1.png" alt="Java"/>', class: 'java' },
        'Jakarta EE': { icon: '<img src="https://img.icons8.com/color/32/java-coffee-cup-logo--v1.png" alt="Jakarta EE"/>', class: 'jakarta' },
        'JavaFX': { icon: '<img src="https://img.icons8.com/color/32/java-coffee-cup-logo--v1.png" alt="JavaFX"/>', class: 'javafx' },
        'Node.js': { icon: '<img src="https://img.icons8.com/color/32/nodejs.png" alt="Node.js"/>', class: 'node' },
        'Flutter': { icon: '<img src="https://img.icons8.com/color/32/flutter.png" alt="Flutter"/>', class: 'flutter' },
        'Firebase': { icon: '<img src="https://img.icons8.com/color/32/firebase.png" alt="Firebase"/>', class: 'firebase' },
        'PostgreSQL': { icon: '<img src="https://img.icons8.com/color/32/postgreesql.png" alt="PostgreSQL"/>', class: 'postgres' },
        'Redux': { icon: '<img src="https://img.icons8.com/color/32/redux.png" alt="Redux"/>', class: 'redux' },
        'WebSocket': { icon: '<img src="https://img.icons8.com/color/32/api-settings.png" alt="WebSocket"/>', class: 'websocket' },
        'Redis': { icon: '<img src="https://img.icons8.com/color/32/redis.png" alt="Redis"/>', class: 'redis' },
        'Flask': { icon: '<img src="https://img.icons8.com/color/32/flask.png" alt="Flask"/>', class: 'flask' },
        'Express': { icon: '<img src="https://img.icons8.com/office/32/express-js.png" alt="Express"/>', class: 'express' },
        'Vue.js': { icon: '<img src="https://img.icons8.com/color/32/vue-js.png" alt="Vue.js"/>', class: 'vue' },
        'MongoDB': { icon: '<img src="https://img.icons8.com/color/32/mongodb.png" alt="MongoDB"/>', class: 'mongodb' },
        'AWS': { icon: '<img src="https://img.icons8.com/color/32/amazon-web-services.png" alt="AWS"/>', class: 'aws' },
        'Docker': { icon: '<img src="https://img.icons8.com/color/32/docker.png" alt="Docker"/>', class: 'docker' },
        'TensorFlow': { icon: '<img src="https://img.icons8.com/color/32/tensorflow.png" alt="TensorFlow"/>', class: 'tensorflow' },
        'AI': { icon: '<img src="https://img.icons8.com/color/32/artificial-intelligence.png" alt="AI"/>', class: 'ai' },
        'FFmpeg': { icon: '<img src="https://img.icons8.com/color/32/video.png" alt="FFmpeg"/>', class: 'ffmpeg' },
        'Go': { icon: '<img src="https://img.icons8.com/color/32/golang.png" alt="Go"/>', class: 'go' },
        'Cryptography': { icon: '<img src="https://img.icons8.com/color/32/lock-2.png" alt="Cryptography"/>', class: 'crypto' },
        'P2P': { icon: '<img src="https://img.icons8.com/color/32/network.png" alt="P2P"/>', class: 'p2p' },
        'Chart.js': { icon: '<img src="https://img.icons8.com/color/32/bar-chart.png" alt="Chart.js"/>', class: 'chartjs' },
        'Dart': { icon: '<img src="https://img.icons8.com/color/32/dart.png" alt="Dart"/>', class: 'dart' },
        'Responsive': { icon: '<img src="https://img.icons8.com/color/32/responsive.png" alt="Responsive"/>', class: 'responsive' }
    };

    static generate(tags) {
        return tags.split(',')
            .map(tag => tag.trim())
            .map(tag => {
                const tech = this.MAP[tag] || { icon: '<img src="https://img.icons8.com/color/32/code.png" alt="Code"/>', class: 'default' };
                return `<div class="tech-icon ${tech.class}" title="${tag}">${tech.icon}</div>`;
            })
            .join('');
    }
}

