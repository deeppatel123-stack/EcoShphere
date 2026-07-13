import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* ─────────────────────── Inline CSS ─────────────────────── */
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#04080f;--bg2:#080d17;--bg3:#0d1526;
  --surface:rgba(255,255,255,.04);--surface2:rgba(255,255,255,.07);
  --border:rgba(255,255,255,.08);
  --green:#22c55e;--green2:#16a34a;--teal:#14b8a6;--emerald:#10b981;
  --blue:#3b82f6;--purple:#8b5cf6;
  --text:#f1f5f9;--text2:#94a3b8;--text3:#64748b;
}
html{scroll-behavior:smooth}
.lp-body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;line-height:1.6;min-height:100vh}
.lp-body ::-webkit-scrollbar{width:6px}
.lp-body ::-webkit-scrollbar-track{background:var(--bg)}
.lp-body ::-webkit-scrollbar-thumb{background:var(--green2);border-radius:3px}
#lp-canvas{position:fixed;inset:0;z-index:0;pointer-events:none}

/* NAV */
.lp-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2.5rem;display:flex;align-items:center;justify-content:space-between;transition:all .35s cubic-bezier(.4,0,.2,1)}
.lp-nav.scrolled{background:rgba(4,8,15,.9);backdrop-filter:blur(24px);border-bottom:1px solid rgba(34,197,94,.12);box-shadow:0 4px 32px rgba(0,0,0,.4)}
.lp-logo{display:flex;align-items:center;gap:.6rem;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.35rem;text-decoration:none;color:var(--text);flex-shrink:0}
.lp-logo .leaf{width:36px;height:36px;background:linear-gradient(135deg,var(--green),var(--teal));border-radius:50% 0 50% 0;display:flex;align-items:center;justify-content:center;font-size:1rem;box-shadow:0 0 20px rgba(34,197,94,.45);transition:box-shadow .3s}
.lp-logo:hover .leaf{box-shadow:0 0 32px rgba(34,197,94,.7)}
.lp-links{display:flex;gap:2rem;list-style:none;position:absolute;left:50%;transform:translateX(-50%)}
.lp-links a{color:var(--text2);text-decoration:none;font-size:.88rem;font-weight:500;position:relative;padding-bottom:2px;transition:color .2s}
.lp-links a::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:var(--green);transform:scaleX(0);transform-origin:left;transition:transform .25s ease}
.lp-links a:hover{color:var(--green)}
.lp-links a:hover::after{transform:scaleX(1)}
.lp-cta{display:flex;gap:.6rem;align-items:center}
.lp-divider{width:1px;height:20px;background:var(--border);margin:0 .25rem}
.btn-login{padding:.45rem 1.2rem;border:1.5px solid rgba(34,197,94,.35);border-radius:8px;color:var(--green);text-decoration:none;font-size:.875rem;font-weight:600;background:rgba(34,197,94,.06);transition:all .25s;display:flex;align-items:center;gap:.4rem}
.btn-login:hover{background:rgba(34,197,94,.14);border-color:var(--green);box-shadow:0 0 14px rgba(34,197,94,.2);transform:translateY(-1px)}
.btn-signup{padding:.48rem 1.3rem;background:linear-gradient(135deg,var(--green),var(--teal));border:none;border-radius:8px;color:#fff;text-decoration:none;font-size:.875rem;font-weight:700;transition:all .25s;box-shadow:0 0 18px rgba(34,197,94,.35);display:flex;align-items:center;gap:.4rem;position:relative;overflow:hidden;cursor:pointer}
.btn-signup::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .25s}
.btn-signup:hover{transform:translateY(-2px);box-shadow:0 4px 28px rgba(34,197,94,.55);color:#fff;text-decoration:none}
.btn-signup:hover::before{opacity:1}
.hamburger{display:none;flex-direction:column;gap:4px;cursor:pointer;padding:.4rem;border:none;background:none}
.hamburger span{display:block;width:22px;height:2px;background:var(--text2);border-radius:2px;transition:all .3s}
.hamburger.open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.hamburger.open span:nth-child(2){opacity:0}
.hamburger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
.mobile-nav-lp{display:none;position:fixed;top:64px;left:0;right:0;background:rgba(4,8,15,.97);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);padding:1.5rem 2rem;flex-direction:column;gap:1rem;z-index:99}
.mobile-nav-lp.open{display:flex}
.mobile-nav-lp a{color:var(--text2);text-decoration:none;font-size:1rem;font-weight:500;padding:.5rem 0;border-bottom:1px solid var(--border);transition:color .2s}
.mobile-nav-lp a:hover{color:var(--green)}
.mobile-nav-btns{display:flex;gap:.75rem;padding-top:.5rem}
.mobile-nav-btns .btn-login,.mobile-nav-btns .btn-signup{flex:1;justify-content:center}
@media(max-width:900px){.lp-links{display:none}.hamburger{display:flex}}
@media(max-width:600px){.lp-nav{padding:1rem 1.25rem}.lp-cta{display:none}}

/* HERO */
#lp-hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:8rem 1.5rem 4rem;z-index:1}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.orb-1{width:500px;height:500px;background:rgba(34,197,94,.06);top:-100px;right:-100px}
.orb-2{width:400px;height:400px;background:rgba(20,184,166,.05);bottom:100px;left:-50px}
.orb-3{width:300px;height:300px;background:rgba(139,92,246,.04);top:40%;left:50%}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem 1rem;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);border-radius:100px;margin-bottom:1.75rem;font-size:.8rem;font-weight:600;color:var(--green);letter-spacing:.05em;text-transform:uppercase}
.badge-dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:pulse-dot 2s infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
.hero-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,6vw,5rem);font-weight:700;line-height:1.1;letter-spacing:-0.02em;margin-bottom:1.5rem;max-width:800px;margin-inline:auto}
.gradient-text{background:linear-gradient(135deg,var(--green) 0%,var(--teal) 50%,var(--emerald) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(1rem,2vw,1.2rem);color:var(--text2);max-width:580px;margin-inline:auto;margin-bottom:2.5rem;line-height:1.7}
.hero-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:4rem}
.btn-hero{padding:.8rem 2rem;border-radius:12px;font-size:1rem;font-weight:600;text-decoration:none;transition:all .3s;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:.5rem}
.btn-hero-primary{background:linear-gradient(135deg,var(--green),var(--teal));color:#fff;box-shadow:0 8px 32px rgba(34,197,94,.35)}
.btn-hero-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(34,197,94,.5);color:#fff;text-decoration:none}
.btn-hero-outline{background:transparent;border:1px solid var(--border);color:var(--text)}
.btn-hero-outline:hover{border-color:var(--green);color:var(--green);background:rgba(34,197,94,.05);text-decoration:none}
.hero-stats{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;max-width:700px;margin-inline:auto}
.stat-card{flex:1;min-width:140px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem 1rem;backdrop-filter:blur(10px);transition:all .3s}
.stat-card:hover{background:var(--surface2);border-color:rgba(34,197,94,.3);transform:translateY(-4px)}
.stat-number{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;background:linear-gradient(135deg,var(--green),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-label{font-size:.8rem;color:var(--text3);margin-top:.25rem}

/* SECTIONS */
.lp-section{position:relative;z-index:1;padding:6rem 1.5rem}
.lp-container{max-width:1200px;margin-inline:auto}
.section-badge{display:inline-block;padding:.35rem .9rem;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:100px;font-size:.78rem;font-weight:600;color:var(--green);text-transform:uppercase;letter-spacing:.07em;margin-bottom:1rem}
.section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;letter-spacing:-0.02em;line-height:1.2;margin-bottom:1rem}
.section-sub{font-size:1rem;color:var(--text2);max-width:560px;line-height:1.7}
.text-center{text-align:center}
.text-center .section-sub{margin-inline:auto}
.glow-divider{height:1px;background:linear-gradient(90deg,transparent,var(--green),var(--teal),transparent);opacity:.3;margin:0}
.bg2{background:var(--bg2)}

/* PILLARS */
.pillars-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;margin-top:3rem}
.pillar-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;transition:all .4s;position:relative;overflow:hidden;cursor:default}
.pillar-card::before{content:'';position:absolute;inset:0;background:var(--card-glow,transparent);opacity:0;transition:opacity .4s;border-radius:20px;pointer-events:none}
.pillar-card:hover{border-color:var(--card-color,var(--green));transform:translateY(-6px);box-shadow:0 20px 60px var(--card-shadow,rgba(34,197,94,.15))}
.pillar-card:hover::before{opacity:1}
.pillar-card.env{--card-color:var(--green);--card-glow:radial-gradient(circle at 50% 0%,rgba(34,197,94,.08),transparent 70%);--card-shadow:rgba(34,197,94,.15)}
.pillar-card.soc{--card-color:var(--blue);--card-glow:radial-gradient(circle at 50% 0%,rgba(59,130,246,.08),transparent 70%);--card-shadow:rgba(59,130,246,.15)}
.pillar-card.gov{--card-color:var(--purple);--card-glow:radial-gradient(circle at 50% 0%,rgba(139,92,246,.08),transparent 70%);--card-shadow:rgba(139,92,246,.15)}
.pillar-card.gam{--card-color:var(--teal);--card-glow:radial-gradient(circle at 50% 0%,rgba(20,184,166,.08),transparent 70%);--card-shadow:rgba(20,184,166,.15)}
.pillar-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;font-size:1.5rem}
.pillar-icon.env{background:rgba(34,197,94,.12)}
.pillar-icon.soc{background:rgba(59,130,246,.12)}
.pillar-icon.gov{background:rgba(139,92,246,.12)}
.pillar-icon.gam{background:rgba(20,184,166,.12)}
.pillar-label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:.35rem}
.pillar-title{font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:600;margin-bottom:.75rem}
.pillar-desc{font-size:.9rem;color:var(--text2);line-height:1.65}
.pillar-list{list-style:none;margin-top:1.25rem;display:flex;flex-direction:column;gap:.5rem}
.pillar-list li{font-size:.85rem;color:var(--text2);display:flex;align-items:center;gap:.5rem}
.pillar-list li::before{content:'';width:5px;height:5px;border-radius:50%;flex-shrink:0}
.pillar-card.env .pillar-list li::before{background:var(--green)}
.pillar-card.soc .pillar-list li::before{background:var(--blue)}
.pillar-card.gov .pillar-list li::before{background:var(--purple)}
.pillar-card.gam .pillar-list li::before{background:var(--teal)}

/* METRICS */
.metrics-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:3rem}
.metric-item{text-align:center;padding:2rem 1rem}
.metric-num{font-family:'Space Grotesk',sans-serif;font-size:3rem;font-weight:800;background:linear-gradient(135deg,var(--green),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.metric-label{font-size:.9rem;color:var(--text2);margin-top:.5rem}

/* HOW IT WORKS */
.steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem;margin-top:3rem;position:relative}
.steps-grid::before{content:'';position:absolute;top:28px;left:15%;right:15%;height:1px;background:linear-gradient(90deg,var(--green),var(--teal));opacity:.2}
.step-card{text-align:center;padding:1.5rem}
.step-num{width:56px;height:56px;border-radius:50%;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);display:flex;align-items:center;justify-content:center;margin-inline:auto;margin-bottom:1.25rem;font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;color:var(--green);position:relative;z-index:1}
.step-title{font-size:1rem;font-weight:600;margin-bottom:.5rem}
.step-desc{font-size:.875rem;color:var(--text2);line-height:1.6}

/* ROLES */
.roles-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin-top:3rem}
.role-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem 1rem;text-align:center;transition:all .3s;cursor:default}
.role-card:hover{background:var(--surface2);border-color:rgba(34,197,94,.3);transform:translateY(-4px)}
.role-emoji{font-size:2rem;margin-bottom:.75rem}
.role-name{font-size:.9rem;font-weight:600;margin-bottom:.35rem}
.role-desc{font-size:.78rem;color:var(--text3);line-height:1.5}

/* PREVIEW */
.preview-wrapper{margin-top:3rem;border-radius:24px;border:1px solid var(--border);overflow:hidden;background:var(--bg3);box-shadow:0 40px 100px rgba(0,0,0,.6),0 0 60px rgba(34,197,94,.05)}
.preview-bar{background:var(--bg2);padding:.75rem 1rem;display:flex;align-items:center;gap:.5rem;border-bottom:1px solid var(--border)}
.preview-dots{display:flex;gap:.4rem}
.preview-dot{width:12px;height:12px;border-radius:50%}
.preview-dot:nth-child(1){background:#ff5f57}
.preview-dot:nth-child(2){background:#febc2e}
.preview-dot:nth-child(3){background:#28c840}
.preview-url{flex:1;background:rgba(255,255,255,.05);border-radius:6px;padding:.25rem .75rem;font-size:.78rem;color:var(--text3);margin-left:.5rem}
.preview-body{padding:2rem;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.preview-sidebar{background:rgba(255,255,255,.03);border-radius:12px;padding:1rem;display:flex;flex-direction:column;gap:.75rem}
.preview-main{grid-column:2/4;display:flex;flex-direction:column;gap:1rem}
.preview-nav-item{height:32px;border-radius:8px;background:rgba(255,255,255,.04);display:flex;align-items:center;padding:0 .75rem;gap:.5rem;font-size:.78rem;color:var(--text3)}
.preview-nav-item.active{background:rgba(34,197,94,.1);color:var(--green);border:1px solid rgba(34,197,94,.2)}
.preview-nav-dot{width:8px;height:8px;border-radius:50%;background:currentColor;flex-shrink:0}
.preview-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem}
.preview-kpi{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:.75rem;text-align:center}
.preview-kpi-num{font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:700}
.preview-kpi-num.g{color:var(--green)}
.preview-kpi-num.t{color:var(--teal)}
.preview-kpi-num.b{color:var(--blue)}
.preview-kpi-label{font-size:.65rem;color:var(--text3);margin-top:.2rem}
.preview-chart{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:12px;padding:1rem;height:140px;display:flex;align-items:flex-end;gap:4px;overflow:hidden}
.bar-wrap{flex:1;display:flex;align-items:flex-end;gap:3px}
.bar{border-radius:4px 4px 0 0;flex:1}

/* TESTIMONIALS */
.testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
.testimonial-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;transition:all .3s}
.testimonial-card:hover{background:var(--surface2);border-color:rgba(34,197,94,.2);transform:translateY(-4px)}
.t-stars{color:var(--green);font-size:1rem;margin-bottom:1rem;letter-spacing:.1em}
.t-text{font-size:.95rem;color:var(--text2);line-height:1.7;margin-bottom:1.5rem;font-style:italic}
.t-author{display:flex;align-items:center;gap:.75rem}
.t-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--teal));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;color:#fff;flex-shrink:0}
.t-name{font-weight:600;font-size:.9rem}
.t-role{font-size:.78rem;color:var(--text3)}

/* CTA */
.cta-card{background:linear-gradient(135deg,rgba(34,197,94,.06),rgba(20,184,166,.06));border:1px solid rgba(34,197,94,.15);border-radius:28px;padding:4rem 2rem;text-align:center;position:relative;overflow:hidden;max-width:800px;margin-inline:auto}
.cta-card::before{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(34,197,94,.08),transparent 70%);pointer-events:none}
.cta-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem}
.btn-cta-primary{padding:.85rem 2rem;border-radius:12px;font-size:.95rem;font-weight:600;background:linear-gradient(135deg,var(--green),var(--teal));color:#fff;box-shadow:0 8px 32px rgba(34,197,94,.3);border:none;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;transition:all .3s;cursor:pointer}
.btn-cta-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(34,197,94,.5);color:#fff;text-decoration:none}
.btn-cta-outline{padding:.85rem 2rem;border-radius:12px;font-size:.95rem;font-weight:600;background:transparent;border:1px solid var(--border);color:var(--text);text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;transition:all .3s}
.btn-cta-outline:hover{border-color:var(--green);color:var(--green);text-decoration:none}

/* FOOTER */
.lp-footer{background:var(--bg);border-top:1px solid var(--border);padding:3rem 1.5rem}
.footer-grid{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:3rem;max-width:1200px;margin-inline:auto;margin-bottom:3rem}
.footer-brand p{font-size:.875rem;color:var(--text3);line-height:1.7;margin-top:.75rem;max-width:280px}
.footer-col h4{font-size:.85rem;font-weight:600;margin-bottom:1rem;color:var(--text)}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:.6rem}
.footer-col a{font-size:.85rem;color:var(--text3);text-decoration:none;transition:color .2s}
.footer-col a:hover{color:var(--green)}
.footer-bottom{border-top:1px solid var(--border);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin-inline:auto;flex-wrap:wrap;gap:.5rem}
.footer-bottom p{font-size:.8rem;color:var(--text3)}

/* ANIMATIONS */
.fade-up{opacity:0;transform:translateY(30px);transition:all .7s cubic-bezier(.16,1,.3,1)}
.fade-up.visible{opacity:1;transform:translateY(0)}

@media(max-width:768px){
  .footer-grid{grid-template-columns:1fr 1fr}
  .footer-grid>:first-child{grid-column:1/-1}
  .steps-grid::before{display:none}
  .preview-body{grid-template-columns:1fr}
  .preview-sidebar{display:none}
  .preview-main{grid-column:1}
}
@media(max-width:480px){.footer-grid{grid-template-columns:1fr}}
`;

export default function Landing() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const navRef = useRef(null);

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard', { replace: true });
    }, [isAuthenticated, navigate]);

    // Inject fonts
    useEffect(() => {
        if (!document.getElementById('lp-font')) {
            const link = document.createElement('link');
            link.id = 'lp-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    // Particle canvas animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, particles = [], raf;
        function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
        resize();
        window.addEventListener('resize', resize);
        class P {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * W; this.y = Math.random() * H;
                this.size = Math.random() * 1.5 + 0.3;
                this.sx = (Math.random() - .5) * .3; this.sy = (Math.random() - .5) * .3;
                this.opacity = Math.random() * .4 + .1;
                this.color = Math.random() > .5 ? '34,197,94' : '20,184,166';
            }
            update() { this.x += this.sx; this.y += this.sy; if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset(); }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.color},${this.opacity})`; ctx.fill(); }
        }
        for (let i = 0; i < 100; i++) particles.push(new P());
        function animate() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => { p.update(); p.draw(); });
            for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(34,197,94,${.06 * (1 - d / 100)})`; ctx.lineWidth = .5; ctx.stroke(); }
            }
            raf = requestAnimationFrame(animate);
        }
        animate();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
    }, []);

    // Scroll nav
    useEffect(() => {
        const nav = navRef.current;
        const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Fade-up intersection observer
    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.12 });
        document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    // Hamburger toggle
    const toggleMenu = () => {
        document.getElementById('lp-hamburger')?.classList.toggle('open');
        document.getElementById('lp-mobile-nav')?.classList.toggle('open');
    };
    const closeMenu = () => {
        document.getElementById('lp-hamburger')?.classList.remove('open');
        document.getElementById('lp-mobile-nav')?.classList.remove('open');
    };

    const BARS = [55, 70, 45, 80, 65, 90, 75, 85, 60, 95, 78, 88];

    return (
        <div className="lp-body">
            <style>{CSS}</style>
            <canvas ref={canvasRef} id="lp-canvas" />

            {/* ── NAV ── */}
            <nav className="lp-nav" ref={navRef}>
                <a href="#lp-hero" className="lp-logo"><div className="leaf">🌿</div>EcoSphere</a>
                <ul className="lp-links">
                    <li><a href="#lp-pillars">Features</a></li>
                    <li><a href="#lp-works">How It Works</a></li>
                    <li><a href="#lp-roles">Roles</a></li>
                    <li><a href="#lp-preview">Platform</a></li>
                </ul>
                <div className="lp-cta">
                    <Link to="/auth/login" className="btn-login">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                        Login
                    </Link>
                    <div className="lp-divider" />
                    <Link to="/auth/register" className="btn-signup">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
                        Sign Up Free
                    </Link>
                </div>
                <button className="hamburger" id="lp-hamburger" onClick={toggleMenu} aria-label="Menu">
                    <span /><span /><span />
                </button>
            </nav>

            {/* Mobile nav */}
            <div className="mobile-nav-lp" id="lp-mobile-nav">
                <a href="#lp-pillars" onClick={closeMenu}>Features</a>
                <a href="#lp-works" onClick={closeMenu}>How It Works</a>
                <a href="#lp-roles" onClick={closeMenu}>Roles</a>
                <a href="#lp-preview" onClick={closeMenu}>Platform</a>
                <div className="mobile-nav-btns">
                    <Link to="/auth/login" className="btn-login" onClick={closeMenu}>Login</Link>
                    <Link to="/auth/register" className="btn-signup" onClick={closeMenu}>Sign Up Free</Link>
                </div>
            </div>

            {/* ── HERO ── */}
            <section id="lp-hero">
                <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
                <div>
                    <div className="hero-badge fade-up"><span className="badge-dot" />Next-Gen ESG Management Platform</div>
                    <h1 className="hero-title fade-up">Manage Your<br /><span className="gradient-text">ESG Impact</span><br />Like Never Before</h1>
                    <p className="hero-sub fade-up">EcoSphere unifies Environmental, Social, and Governance data into one intelligent platform — complete with gamification, real-time analytics, and role-based collaboration.</p>
                    <div className="hero-actions fade-up">
                        <Link to="/auth/login" className="btn-hero btn-hero-primary">Start Free Trial →</Link>
                        <a href="#lp-preview" className="btn-hero btn-hero-outline">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                            See Demo
                        </a>
                    </div>
                    <div className="hero-stats fade-up">
                        {[['98%', 'Compliance Rate'], ['40%', 'Carbon Reduction'], ['6', 'Role Types'], ['∞', 'Data Points']].map(([n, l]) => (
                            <div className="stat-card" key={l}><div className="stat-number">{n}</div><div className="stat-label">{l}</div></div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── PILLARS ── */}
            <section className="lp-section" id="lp-pillars">
                <div className="lp-container">
                    <div className="text-center fade-up">
                        <span className="section-badge">Platform Features</span>
                        <h2 className="section-title">Everything ESG in One Place</h2>
                        <p className="section-sub">From carbon tracking to governance audits — EcoSphere covers every dimension of your sustainability journey.</p>
                    </div>
                    <div className="pillars-grid">
                        {[
                            { cls: 'env', icon: '🌱', label: 'Environmental', title: 'Carbon & Planet Health', desc: 'Track emissions, manage environmental goals, and monitor your carbon footprint with real-time dashboards.', items: ['GHG Emission Tracking (Scope 1,2,3)', 'Environmental Goal Management', 'Product ESG Profiles', 'Emission Factor Library'] },
                            { cls: 'soc', icon: '🤝', label: 'Social', title: 'People & Community', desc: 'Measure diversity, equity, and inclusion metrics. Monitor employee wellbeing and community engagement.', items: ['DEI Metrics Dashboard', 'Employee Wellbeing Tracking', 'Community Impact Reports', 'Department Analytics'] },
                            { cls: 'gov', icon: '⚖️', label: 'Governance', title: 'Policy & Compliance', desc: 'Manage ESG policies, compliance audits, and governance frameworks with full role-based access controls.', items: ['ESG Policy Management', 'Compliance Audit Tools', 'Role-Based Access (RBAC)', 'Executive Reporting Suite'] },
                            { cls: 'gam', icon: '🏆', label: 'Gamification', title: 'Engage & Motivate', desc: 'Drive sustainable behavior with XP points, leaderboards, badges, and rewards.', items: ['XP & Points System', 'Achievement Badge Library', 'Company Leaderboard', 'Reward Redemption Center'] },
                        ].map(p => (
                            <div className={`pillar-card ${p.cls} fade-up`} key={p.cls}>
                                <div className={`pillar-icon ${p.cls}`}>{p.icon}</div>
                                <div className="pillar-label">{p.label}</div>
                                <h3 className="pillar-title">{p.title}</h3>
                                <p className="pillar-desc">{p.desc}</p>
                                <ul className="pillar-list">{p.items.map(i => <li key={i}>{i}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── METRICS ── */}
            <section className="lp-section bg2">
                <div className="lp-container">
                    <div className="text-center fade-up">
                        <span className="section-badge">By The Numbers</span>
                        <h2 className="section-title">Built for Impact at Scale</h2>
                    </div>
                    <div className="metrics-grid">
                        {[['500+', 'Companies Trust EcoSphere'], ['2.4M', 'Tons of CO₂ Offset Tracked'], ['99.9%', 'Platform Uptime SLA'], ['50K', 'Active ESG Champions']].map(([n, l]) => (
                            <div className="metric-item fade-up" key={l}><div className="metric-num">{n}</div><div className="metric-label">{l}</div></div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── HOW IT WORKS ── */}
            <section className="lp-section" id="lp-works">
                <div className="lp-container">
                    <div className="text-center fade-up">
                        <span className="section-badge">How It Works</span>
                        <h2 className="section-title">Up & Running in 4 Steps</h2>
                        <p className="section-sub">From onboarding to your first ESG report — EcoSphere makes the journey seamless.</p>
                    </div>
                    <div className="steps-grid">
                        {[['01', 'Create Your Organization', 'Set up your company profile, configure departments, and invite your team with role-specific permissions.'], ['02', 'Connect Your Data', 'Input emission factors, set environmental goals, define ESG policies and build your product ESG profiles.'], ['03', 'Track & Engage', 'Monitor real-time dashboards, run gamification campaigns, and keep your team focused on sustainability targets.'], ['04', 'Report & Improve', 'Generate investor-grade ESG reports, identify gaps, and continuously improve your sustainability performance.']].map(([n, t, d]) => (
                            <div className="step-card fade-up" key={n}><div className="step-num">{n}</div><h3 className="step-title">{t}</h3><p className="step-desc">{d}</p></div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── ROLES ── */}
            <section className="lp-section bg2" id="lp-roles">
                <div className="lp-container">
                    <div className="text-center fade-up">
                        <span className="section-badge">Access Control</span>
                        <h2 className="section-title">Designed for Every Stakeholder</h2>
                        <p className="section-sub">Six purpose-built roles ensure the right people have access to the right data, every time.</p>
                    </div>
                    <div className="roles-grid">
                        {[['👑', 'Super Admin', 'Full platform control & system configuration'], ['🌿', 'ESG Manager', 'Create and manage ESG programs & policies'], ['🏢', 'Dept. Head', 'View and report on department-level metrics'], ['👤', 'Employee', 'Participate in challenges and earn rewards'], ['🔍', 'Auditor', 'Read-only access for compliance verification'], ['📊', 'Executive', 'High-level dashboards and strategic reports']].map(([e, n, d]) => (
                            <div className="role-card fade-up" key={n}><div className="role-emoji">{e}</div><div className="role-name">{n}</div><div className="role-desc">{d}</div></div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── PLATFORM PREVIEW ── */}
            <section className="lp-section" id="lp-preview">
                <div className="lp-container">
                    <div className="text-center fade-up">
                        <span className="section-badge">Platform Preview</span>
                        <h2 className="section-title">A Dashboard Built for Clarity</h2>
                        <p className="section-sub">Real-time KPIs, interactive charts, and actionable insights — all in one premium dark-mode interface.</p>
                    </div>
                    <div className="preview-wrapper fade-up">
                        <div className="preview-bar">
                            <div className="preview-dots"><div className="preview-dot" /><div className="preview-dot" /><div className="preview-dot" /></div>
                            <div className="preview-url">ecosphere.app/dashboard</div>
                        </div>
                        <div className="preview-body">
                            <div className="preview-sidebar">
                                <div style={{ fontSize: '.7rem', color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>Navigation</div>
                                {[['Dashboard', true, 'var(--text3)'], ['Environmental', false, 'var(--green)'], ['Social', false, 'var(--text3)'], ['Governance', false, 'var(--text3)'], ['Gamification', false, 'var(--teal)'], ['Reports', false, 'var(--text3)'], ['Settings', false, 'var(--text3)']].map(([label, active, color]) => (
                                    <div className={`preview-nav-item${active ? ' active' : ''}`} style={active ? undefined : { color }} key={label}>
                                        <div className="preview-nav-dot" style={{ background: active ? 'var(--green)' : color }} />
                                        {label}
                                    </div>
                                ))}
                                <div style={{ marginTop: 'auto', padding: '.75rem', background: 'rgba(34,197,94,.08)', borderRadius: '8px', fontSize: '.72rem' }}>
                                    <div style={{ color: 'var(--green)', fontWeight: 600, marginBottom: '.2rem' }}>ESG Score</div>
                                    <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', fontWeight: 700 }}>87.4</div>
                                    <div style={{ color: 'var(--text3)', fontSize: '.65rem' }}>↑ 4.2% this quarter</div>
                                </div>
                            </div>
                            <div className="preview-main">
                                <div className="preview-kpis">
                                    {[['g', '-40%', 'Carbon Reduction'], ['t', '94%', 'DEI Score'], ['b', '100%', 'Compliance']].map(([c, n, l]) => (
                                        <div className="preview-kpi" key={l}><div className={`preview-kpi-num ${c}`}>{n}</div><div className="preview-kpi-label">{l}</div></div>
                                    ))}
                                </div>
                                <div className="preview-chart">
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '.5rem', fontSize: '.6rem', color: 'var(--text3)', height: '100%', textAlign: 'right' }}>
                                        <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
                                    </div>
                                    <div className="bar-wrap">
                                        {BARS.map((h, i) => (
                                            <div className="bar" key={i} style={{ height: `${h}%`, background: i === 9 || i === 5 ? 'linear-gradient(to top,var(--teal),var(--emerald))' : 'linear-gradient(to top,var(--green),rgba(34,197,94,.4))' }} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: '10px', padding: '.75rem' }}>
                                        <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginBottom: '.5rem', fontWeight: 600 }}>TOP CHALLENGE</div>
                                        <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--teal)' }}>🏆 Zero Waste Week</div>
                                        <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: '.25rem' }}>247 participants · 3 days left</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: '10px', padding: '.75rem' }}>
                                        <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginBottom: '.5rem', fontWeight: 600 }}>RECENT BADGE</div>
                                        <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--green)' }}>🌱 Green Pioneer</div>
                                        <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: '.25rem' }}>Earned by 18 employees</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── TESTIMONIALS ── */}
            <section className="lp-section">
                <div className="lp-container">
                    <div className="text-center fade-up">
                        <span className="section-badge">Testimonials</span>
                        <h2 className="section-title">Trusted by Sustainability Leaders</h2>
                    </div>
                    <div className="testimonials-grid">
                        {[{ initials: 'SR', name: 'Sarah Richardson', role: 'Chief Sustainability Officer, TechNova', text: '"EcoSphere transformed how we manage our ESG commitments. The gamification module alone improved employee participation in green initiatives by 340%."' },
                        { initials: 'MK', name: 'Marcus Kim', role: 'ESG Director, GreenBridge Corp', text: '"The RBAC system is exactly what we needed. Our auditors and executives see the right data without compromising security. Absolutely brilliant."' },
                        { initials: 'PL', name: 'Priya Lakshmanan', role: 'Head of Compliance, EarthFirst', text: '"We cut our GHG reporting time from 3 weeks to 2 days. EcoSphere\'s emission tracking and report generation is a genuine game-changer."' },
                        ].map(t => (
                            <div className="testimonial-card fade-up" key={t.initials}>
                                <div className="t-stars">★★★★★</div>
                                <p className="t-text">{t.text}</p>
                                <div className="t-author">
                                    <div className="t-avatar">{t.initials}</div>
                                    <div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-divider" />

            {/* ── CTA ── */}
            <section className="lp-section bg2">
                <div className="lp-container">
                    <div className="cta-card fade-up">
                        <span className="section-badge">Get Started Today</span>
                        <h2 className="section-title">Ready to Lead the<br /><span className="gradient-text">Green Revolution?</span></h2>
                        <p className="section-sub" style={{ marginInline: 'auto' }}>Join hundreds of companies using EcoSphere to measure, manage, and improve their ESG performance — starting today.</p>
                        <div className="cta-actions">
                            <Link to="/auth/register" className="btn-cta-primary">Start Free — No Credit Card</Link>
                            <a href="#lp-preview" className="btn-cta-outline">View Demo →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="lp-footer">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="#lp-hero" className="lp-logo" style={{ display: 'inline-flex', marginBottom: '.5rem' }}>
                            <div className="leaf">🌿</div>EcoSphere
                        </a>
                        <p>The intelligent ESG management platform built for companies that take sustainability seriously. Measure what matters. Improve what counts.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#lp-pillars">Environmental</a></li>
                            <li><a href="#lp-pillars">Social</a></li>
                            <li><a href="#lp-pillars">Governance</a></li>
                            <li><a href="#lp-pillars">Gamification</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#lp-hero">About Us</a></li>
                            <li><a href="#lp-hero">Careers</a></li>
                            <li><a href="#lp-hero">Blog</a></li>
                            <li><a href="#lp-hero">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#lp-hero">Privacy Policy</a></li>
                            <li><a href="#lp-hero">Terms of Service</a></li>
                            <li><a href="#lp-hero">Security</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 EcoSphere ESG Management Platform. All rights reserved.</p>
                    <p style={{ color: 'var(--green)' }}>🌿 Carbon neutral by design</p>
                </div>
            </footer>
        </div>
    );
}
