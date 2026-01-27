/* === CONFIGURATION === */
var PRIVATE_CONFIG_KEY = "DShinee";  
var VALID_KEYS = ["DShinee_2025", "Quinnhu", "Lamoanh"];
var PRIVATE_CONFIG_LINK = "shadowrocket://config/add/https://raw.githubusercontent.com/dungnguyen0537/Module/refs/heads/main/LKG_HNhung_ByDShinee.sgmodule";
var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQwdBT3veelsiIcFQwuwX4byCFsB4IRqCrMcLVs0h83rhe9rn6IBp9YAXEQ0Mf8EgFng/exec";
const DNS_VID = "CqWbxsWmLtQ";
const SR_VID = "9BQdGlMAw-k";

const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}
TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if(this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); } else { this.txt = fullTxt.substring(0, this.txt.length + 1); }
    this.txtElement.innerHTML = this.txt;
    let typeSpeed = 150;
    if(this.isDeleting) typeSpeed /= 3;
    if(!this.isDeleting && this.txt === fullTxt) { typeSpeed = this.wait; this.isDeleting = true; this.txtElement.style.borderRight = 'none'; } else if(this.isDeleting && this.txt === '') { this.isDeleting = false; this.wordIndex++; typeSpeed = 500; this.txtElement.style.borderRight = '0.1em solid #06b6d4'; }
    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
}
window.addEventListener('load', () => {
    initAudio(); initSnow();
    const obs = new IntersectionObserver(e => { e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }); }, { threshold: 0.2 });
    document.querySelectorAll("section").forEach(s => obs.observe(s));
    setTimeout(() => { const loader = document.getElementById('preloader'); loader.style.opacity = '0'; setTimeout(()=> loader.style.display = 'none', 500); }, 500);
});

let curMode = null;
function showToast(m, isSuccess = false) {
    const t = document.getElementById("toast-msg");
    t.innerHTML = m;
    t.className = isSuccess ? "success show" : "show";
    setTimeout(() => t.classList.remove("show"), 3000);
}

function initKeyCheck(m) { curMode = m; document.getElementById("modalOverlay").style.display = "flex"; document.getElementById("licenseKey").value = ""; }
function closeKeyModal() { document.getElementById("modalOverlay").style.display = "none"; }
function verifyLicenseKey() {
    const k = document.getElementById("licenseKey").value.trim();
    if (curMode === 'private_config') {
        if (k === PRIVATE_CONFIG_KEY) { closeKeyModal(); window.location.href = PRIVATE_CONFIG_LINK; onFinishConfigStep(); } else { showToast("Key Private không chính xác !!!"); }
        return;
    }
    if (typeof VALID_KEYS !== "undefined" && VALID_KEYS.includes(k)) {
        closeKeyModal(); document.getElementById("deviceSelection").style.display = "none";
        if (curMode === 'ios') { document.getElementById("iosFlow").style.display = "block"; } else { document.getElementById("androidFlow").style.display = "block"; document.getElementById("androidFinalBtn").href = "https://github.com/dungnguyen0537/DShinee/releases/download/v1.0/Locket_Gold_v1.210.4.apk"; }
    } else { showToast("Key không chính xác !!! <br> Vui lòng liên hệ Admin để lấy Key !!!"); }
}
function showUsernameInput() { document.getElementById("deviceSelection").style.display = "none"; document.getElementById("usernameFlow").style.display = "block"; document.getElementById("submitStatus").innerText = ""; }
async function submitLocketUsername() {
    const username = document.getElementById("locketUsername").value.trim(); const statusEl = document.getElementById("submitStatus");
    if(!username || username.length < 3) { showToast("Username không hợp lệ!"); return; }
    statusEl.innerText = "Đang gửi dữ liệu..."; statusEl.style.color = "#bae6fd";
    try {
        let ip = "Unknown"; try { const r = await fetch('https://api.ipify.org?format=json'); const d = await r.json(); ip = d.ip; } catch(e){}
        const time = new Date().toLocaleString('vi-VN'); const device = navigator.userAgent;
        const finalUrl = `${GOOGLE_SCRIPT_URL}?time=${encodeURIComponent(time)}&username=${encodeURIComponent(username)}&ip=${encodeURIComponent(ip)}&device=${encodeURIComponent(device)}`;
        await fetch(finalUrl, {mode: 'no-cors'}); showToast("Đã gửi yêu cầu thành công!", true);
        statusEl.innerHTML = "<i class='fas fa-check-circle'></i> Gửi thành công! Vui lòng liên hệ Admin."; statusEl.style.color = "#4ade80"; document.getElementById("locketUsername").value = "";
    } catch (err) { showToast("Lỗi kết nối!"); statusEl.innerText = "Có lỗi xảy ra. Thử lại sau."; statusEl.style.color = "#ef4444"; }
}
function resetSelection() {
    document.getElementById("iosFlow").style.display = "none"; document.getElementById("androidFlow").style.display = "none"; document.getElementById("usernameFlow").style.display = "none"; document.getElementById("deviceSelection").style.display = "flex";
    document.getElementById("iosStep1").style.display = "block"; document.getElementById("dnsVideoStage").style.display = "none"; document.getElementById("addConfigStage").style.display = "none"; document.getElementById("srVideoStage").style.display = "none";
    document.getElementById("dnsIframe").src = ""; document.getElementById("srIframe").src = "";
}
function onStartIOS() { window.location.href = "DNSByDShinee.mobileconfig"; setTimeout(() => { document.getElementById("iosStep1").style.display = "none"; document.getElementById("dnsVideoStage").style.display = "block"; document.getElementById("dnsIframe").src = `https://www.youtube.com/embed/${DNS_VID}?autoplay=1`; }, 1000); }
function onFinishDNSVideo() { document.getElementById("dnsVideoStage").style.display = "none"; document.getElementById("addConfigStage").style.display = "block"; }
function onAddPublicConfig() { window.location.href = "shadowrocket://config/add/https://raw.githubusercontent.com/dungnguyen0537/Module/refs/heads/main/Locket_ByDungNguyen.sgmodule"; onFinishConfigStep(); }
function onFinishConfigStep() { setTimeout(() => { document.getElementById("addConfigStage").style.display = "none"; document.getElementById("srVideoStage").style.display = "block"; document.getElementById("srIframe").src = `https://www.youtube.com/embed/${SR_VID}?autoplay=1`; }, 1000); }

function toggleDonate() { const d = document.getElementById('donateArea'); d.style.display = (d.style.display === 'block') ? 'none' : 'block'; if(d.style.display === 'block') d.scrollIntoView({behavior:'smooth', block:'center'}); }
function toggleMenu(e) { if (e) e.stopPropagation(); const d = document.getElementById('navDropdown'); d.classList.toggle('active'); }
document.addEventListener('click', function(e) { const menu = document.getElementById('navDropdown'); const btn = document.querySelector('.hamburger-btn'); if (menu.classList.contains('active') && !menu.contains(e.target) && !btn.contains(e.target)) { menu.classList.remove('active'); } });
function scrollToSection(id) { const e = document.getElementById(id); if(e) { e.scrollIntoView({behavior:'smooth', block:'center'}); document.getElementById('navDropdown').classList.remove('active'); } }
async function downloadQR() { const img = document.getElementById('qrImage'); try { const res = await fetch(img.src); const blob = await res.blob(); const file = new File([blob], 'QR.jpg', {type: blob.type}); if(navigator.canShare && navigator.canShare({files:[file]})) await navigator.share({files:[file]}); else { const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='QR.jpg'; a.click(); } } catch(e) { window.open(img.src, '_blank'); } }

const pl = [ { title: "Không Buông Drill", artist: "Hngle x Ari", src: "https://files.catbox.moe/9adi9p.mp3" },
    { title: "Em", artist: "Binz", src: "https://files.catbox.moe/vs0z1h.mp3" },
    { title: "Anh Đã Lớn Hơn Thế Nhiều", artist: "Dick", src: "https://files.catbox.moe/w9l7gb.mp3" } ];
let audio, isP = false, idx = -1;
function initAudio() {
    audio = document.getElementById('audio'); loadSong(0);
    document.getElementById('playBtn').addEventListener('click', () => isP ? pauseS() : playS());
    document.getElementById('nextBtn').addEventListener('click', () => { loadSong(Math.floor(Math.random()*pl.length)); playS(); });
    audio.addEventListener('timeupdate', (e) => { const {duration, currentTime} = e.srcElement; if(duration) { document.getElementById('progressBar').style.width = `${(currentTime/duration)*100}%`; document.getElementById('currTime').innerText = fmt(currentTime); document.getElementById('durTime').innerText = fmt(duration); } });
    audio.addEventListener('ended', () => { loadSong(Math.floor(Math.random()*pl.length)); playS(); });
    document.getElementById('progressContainer').addEventListener('click', (e) => audio.currentTime = (e.offsetX/document.getElementById('progressContainer').clientWidth)*audio.duration);
}
function loadSong(i) { idx = i; document.getElementById('songTitle').innerText = pl[i].title; document.getElementById('songArtist').innerText = pl[i].artist; audio.src = pl[i].src; }
function playS() { audio.play(); isP=true; document.getElementById('disk').style.animationPlayState='running'; document.getElementById('playIcon').className='fas fa-pause'; }
function pauseS() { audio.pause(); isP=false; document.getElementById('disk').style.animationPlayState='paused'; document.getElementById('playIcon').className='fas fa-play'; }
function fmt(s) { const m=Math.floor(s/60), s2=Math.floor(s%60); return `${m}:${s2<10?'0'+s2:s2}`; }
function initSnow() { const c = document.getElementById("snowCanvas"), t = c.getContext("2d"); let w, h, p = []; function r() { w = window.innerWidth; h = window.innerHeight; c.width = w; c.height = h; } class S { constructor() { this.reset(); this.y = Math.random() * h; } reset() { this.x = Math.random() * w; this.y = -10; this.speed = Math.random() * 1.5 + 0.5; this.size = Math.random() * 2 + 1; this.opacity = Math.random() * 0.5 + 0.2; this.sway = Math.random() * 0.02 - 0.01; this.angle = Math.random() * Math.PI * 2; } update() { this.y += this.speed; this.angle += 0.02; this.x += Math.sin(this.angle) * 0.5 + this.sway; if (this.y > h) this.reset(); } draw() { t.beginPath(); t.arc(this.x, this.y, this.size, 0, 2 * Math.PI); t.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; t.fill(); } } window.addEventListener("resize", r); r(); for (let i = 0; i < 80; i++) p.push(new S()); (function a() { t.clearRect(0, 0, w, h); p.forEach(s => { s.update(); s.draw(); }); requestAnimationFrame(a); })(); }
