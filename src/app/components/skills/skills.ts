import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills {
  stacks = [
    // Frontend
    { num: '01', name: 'Angular', type: 'Frontend Framework', hot: true, category: 'frontend', description: 'Apps empresariales y SPA' },
    { num: '02', name: 'TypeScript', type: 'Frontend Core', hot: true, category: 'frontend', description: 'Tipado estático y escalabilidad' },
    { num: '03', name: 'Bootstrap', type: 'UI Framework', hot: true, category: 'frontend', description: 'Diseño responsive rápido' },
    
    
    // Backend
    { num: '05', name: 'C#', type: 'Backend · .NET', hot: true, category: 'backend', description: 'APIs robustas y servicios' },
    { num: '06', name: 'PHP', type: 'Backend', hot: true, category: 'backend', description: 'Desarrollo web dinámico' },
    { num: '07', name: 'Node.js', type: 'JavaScript Runtime', hot: false, category: 'backend', description: 'APIs y microservicios' },
    
    // Databases
    { num: '08', name: 'MySQL', type: 'Database', hot: false, category: 'database', description: 'Bases de datos relacionales' },
    { num: '09', name: 'SQL Server', type: 'Database', hot: false, category: 'database', description: 'Entornos empresariales' },
    { num: '10', name: 'PostgreSQL', type: 'Database', hot: false, category: 'database', description: 'Datos complejos y escalables' },
    { num: '11', name: 'Oracle', type: 'Database', hot: false, category: 'database', description: 'Sistemas corporativos' },
    
    // DevOps & Tools
    { num: '12', name: 'Docker', type: 'Container', hot: false, category: 'devops', description: 'Contenedores y despliegues' },
    { num: '13', name: 'Git', type: 'Version Control', hot: false, category: 'devops', description: 'Control de versiones' },
    { num: '14', name: 'GitHub Actions', type: 'CI/CD', hot: false, category: 'devops', description: 'Automatización y despliegue' },
    
    // Diseño Gráfico (NUEVO)
    { num: '15', name: 'Figma', type: 'UI/UX Design', hot: true, category: 'design', description: 'Prototipos y diseño de interfaces' },
    
  ];
}