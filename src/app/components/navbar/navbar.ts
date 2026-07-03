import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  // En navbar.ts, solo cambia el template:
template: `
  <nav class="nav" [class.scrolled]="scrolled">
    <div class="nav-logo">
      <span class="bracket">[</span>
      <span class="name"></span>
      <span class="bracket">]</span>
    </div>
    <div class="nav-links">
      <a (click)="go('about')">Sobre mí</a>
      <a (click)="go('skills')">Stack</a>
      <a (click)="go('contact')">Contacto</a>
    </div>
    
  </nav>
`,
  styles: [`
    :host {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 9999;          /* ← máximo z-index, encima de todo */
      display: block;
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 7%;
      transition: all .4s ease;
      background: rgba(255,255,255,0.02);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .nav.scrolled {
      background: rgba(6,6,6,0.82);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      padding: 13px 6%;
      border-bottom: 1px solid rgba(204,34,34,0.25);
      box-shadow: 0 1px 40px rgba(0,0,0,.6);
    }

    /* Logo */
    .nav-logo {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 20px;
      letter-spacing: 5px;
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .bracket { color: #cc2222; }
    .name    { color: #f0ede8; }

    /* Links */
    .nav-links {
      display: flex;
      gap: 40px;
    }
    .nav-links a {
      font-size: 8px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: rgba(240,237,232,0.35);
      text-decoration: none;
      cursor: pointer;
      transition: color .2s;
      position: relative;
      padding-bottom: 4px;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 1px;
      background: #cc2222;
      transition: width .3s ease;
    }
    .nav-links a:hover {
      color: #f0ede8;
    }
    .nav-links a:hover::after { width: 100%; }

    /* Tag */
    .nav-tag {
      font-size: 7px;
      color: rgba(255,255,255,0.08);
      letter-spacing: 3px;
      font-family: 'Space Mono', monospace;
    }

    @media(max-width: 640px) {
      .nav-links { display: none; }
      .nav-tag   { display: none; }
    }
  `]
})
export class Navbar {
  scrolled = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 50;
      }, { passive: true });
    }
  }

  go(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}