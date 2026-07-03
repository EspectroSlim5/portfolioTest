import { Component, AfterViewInit } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, About, Skills, Contact],
  template: `
    <canvas id="globalCanvas"></canvas>
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-about></app-about>
    <app-skills></app-skills>
    <app-contact></app-contact>
  `
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initCanvas();
    this.initObserver();
  }

  private initCanvas() {
    const canvas = document.getElementById('globalCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let t = 0, ct = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const noise = (x: number, y: number, time: number) =>
      Math.sin(x*.008+time*.7) * Math.cos(y*.006+time*.5) +
      Math.sin(x*.015-y*.01+time*.9)*.6 +
      Math.cos(x*.005+y*.012+time*.4)*.8 +
      Math.sin((x+y)*.007+time*.6)*.5;

    const getColor = (c: number) => {
      const r = Math.round(Math.sin(c*.5)*127+128);
      const g = Math.round(Math.sin(c*.5+2.094)*127+128);
      const b = Math.round(Math.sin(c*.5+4.188)*127+128);
      return `rgb(${r},${g},${b})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      const step = 7, levels = 18;
      const cols = Math.ceil(w/step)+1, rows = Math.ceil(h/step)+1;
      const f: number[][] = [];
      for (let j=0; j<rows; j++) {
        f[j] = [];
        for (let i=0; i<cols; i++) f[j][i] = noise(i*step, j*step, t);
      }
      ctx.strokeStyle = getColor(ct);
      ctx.lineWidth = 1.3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      for (let l=0; l<levels; l++) {
        const thr = -1.8+(l/levels)*3.6;
        ctx.beginPath();
        for (let j=0; j<rows-1; j++) for (let i=0; i<cols-1; i++) {
          const x=i*step, y=j*step;
          const v00=f[j][i], v10=f[j][i+1], v01=f[j+1][i], v11=f[j+1][i+1];
          const lp=(a:number,b:number,v:number)=>(v-a)/(b-a);
          const tp=(v00!==v10)?lp(v00,v10,thr):-1, bt=(v01!==v11)?lp(v01,v11,thr):-1;
          const lt=(v00!==v01)?lp(v00,v01,thr):-1, rt=(v10!==v11)?lp(v10,v11,thr):-1;
          const idx=(v00>thr?8:0)|(v10>thr?4:0)|(v11>thr?2:0)|(v01>thr?1:0);
          const pts:[number,number][]=[];
          if(tp>=0&&tp<=1) pts.push([x+tp*step,y]);
          if(rt>=0&&rt<=1) pts.push([x+step,y+rt*step]);
          if(bt>=0&&bt<=1) pts.push([x+bt*step,y+step]);
          if(lt>=0&&lt<=1) pts.push([x,y+lt*step]);
          if(pts.length>=2){
            if((idx===6||idx===9)&&pts.length===4){
              ctx.moveTo(pts[0][0],pts[0][1]); ctx.lineTo(pts[1][0],pts[1][1]);
              ctx.moveTo(pts[2][0],pts[2][1]); ctx.lineTo(pts[3][0],pts[3][1]);
            } else {
              ctx.moveTo(pts[0][0],pts[0][1]); ctx.lineTo(pts[1][0],pts[1][1]);
            }
          }
        }
        ctx.stroke();
      }
      t+=.010; ct+=.006;
      requestAnimationFrame(draw);
    };
    draw();
  }

  private initObserver() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.anim').forEach(el => observer.observe(el));

    // Las del hero que ya están en pantalla, hacerlas visibles de una
    document.querySelectorAll('app-hero .anim').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 80);
    });

  }, 200);
}
}