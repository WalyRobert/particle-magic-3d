import * as THREE from 'three';
import { ParticleShape } from '../types';

/**
 * Detailed 5x7 Font Bitmap
 * Designed for maximum readability and correct proportions.
 */
const BIT_FONT: Record<string, number[][]> = {
  'A': [[0,2],[1,1],[1,3],[2,0],[2,4],[3,0],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4],[5,0],[5,4],[6,0],[6,4]],
  'B': [[0,0],[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[4,0],[4,4],[5,0],[5,4],[6,0],[6,1],[6,2],[6,3]],
  'C': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[3,0],[4,0],[5,0],[5,4],[6,1],[6,2],[6,3]],
  'D': [[0,0],[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,0],[4,4],[5,0],[5,4],[6,0],[6,1],[6,2],[6,3]],
  'E': [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[4,0],[5,0],[6,0],[6,1],[6,2],[6,3],[6,4]],
  'F': [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[4,0],[5,0],[6,0]],
  'G': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[3,0],[3,2],[3,3],[3,4],[4,0],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  'H': [[0,0],[0,4],[1,0],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,0],[4,4],[5,0],[5,4],[6,0],[6,4]],
  'I': [[0,1],[0,2],[0,3],[1,2],[2,2],[3,2],[4,2],[5,2],[6,1],[6,2],[6,3]],
  'J': [[0,4],[1,4],[2,4],[3,4],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  'K': [[0,0],[0,4],[1,0],[1,3],[2,0],[2,2],[3,0],[3,1],[4,0],[4,2],[5,0],[5,3],[6,0],[6,4]],
  'L': [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[6,1],[6,2],[6,3],[6,4]],
  'M': [[0,0],[0,4],[1,0],[1,1],[1,3],[1,4],[2,0],[2,2],[2,4],[3,0],[3,4],[4,0],[4,4],[5,0],[5,4],[6,0],[6,4]],
  'N': [[0,0],[0,4],[1,0],[1,1],[1,4],[2,0],[2,2],[1,4],[3,0],[3,3],[3,4],[4,0],[4,4],[5,0],[5,4],[6,0],[6,4]],
  'O': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,0],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  'P': [[0,0],[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[4,0],[5,0],[6,0]],
  'Q': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,0],[4,2],[4,4],[5,0],[5,3],[6,1],[6,2],[6,4]],
  'R': [[0,0],[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[4,0],[4,2],[5,0],[5,3],[6,0],[6,4]],
  'S': [[0,1],[0,2],[0,3],[1,0],[2,0],[3,1],[3,2],[3,3],[4,4],[5,4],[6,1],[6,2],[6,3]],
  'T': [[0,0],[0,1],[0,2],[0,3],[0,4],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]],
  'U': [[0,0],[0,4],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,0],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  'V': [[0,0],[0,4],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,3],[5,1],[5,3],[6,2]],
  'W': [[0,0],[0,4],[1,0],[1,4],[2,0],[2,4],[3,0],[3,2],[3,4],[4,0],[4,1],[4,3],[4,4],[5,0],[5,4],[6,0],[6,4]],
  'X': [[0,0],[0,4],[1,1],[1,3],[2,2],[3,2],[4,1],[4,3],[5,0],[5,4]],
  'Y': [[0,0],[0,4],[1,1],[1,3],[2,2],[3,2],[4,2],[5,2],[6,2]],
  'Z': [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,3],[3,2],[4,1],[5,0],[6,0],[6,1],[6,2],[6,3],[6,4]],
  '0': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,2],[3,4],[4,0],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  '1': [[0,2],[1,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,1],[6,2],[6,3]],
  '2': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,4],[3,2],[4,1],[5,0],[6,0],[6,1],[6,2],[6,3],[6,4]],
  '3': [[0,0],[0,1],[0,2],[0,3],[1,4],[2,4],[3,2],[3,3],[4,4],[5,4],[6,0],[6,1],[6,2],[6,3]],
  '4': [[0,0],[0,4],[1,0],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,4],[5,4],[6,4]],
  '5': [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[4,4],[5,4],[6,0],[6,1],[6,2],[6,3]],
  '6': [[0,1],[0,2],[0,3],[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[4,0],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  '7': [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,3],[3,2],[4,1],[5,1],[6,1]],
  '8': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,1],[3,2],[3,3],[4,0],[4,4],[5,0],[5,4],[6,1],[6,2],[6,3]],
  '9': [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,1],[3,2],[3,3],[3,4],[4,4],[5,4],[6,1],[6,2],[6,3]],
  ' ': []
};

/**
 * Generates text points with high density and correct alignment.
 * Distributes all 100,000 particles across the word silhouette.
 */
export const getTextPointsPure = (text: string, count: number): Float32Array => {
  const chars = text.toUpperCase().split('');
  const glyphPoints: {x: number, y: number}[] = [];
  const charWidth = 5;
  const charSpacing = 1.5; // Optimized spacing
  const lineSpacing = 10;
  
  let currentX = 0;
  let currentY = 0;

  // 1. Gather all base grid points for the entire text
  chars.forEach(char => {
    if (char === '\n') {
      currentX = 0;
      currentY -= lineSpacing;
      return;
    }
    const glyph = BIT_FONT[char] || BIT_FONT[' '];
    glyph.forEach(([row, col]) => {
      glyphPoints.push({
        x: currentX + col,
        y: currentY - row
      });
    });
    currentX += (charWidth + charSpacing);
  });

  // 2. Center Calculation
  const maxX = Math.max(...glyphPoints.map(p => p.x), 1);
  const minX = Math.min(...glyphPoints.map(p => p.x), 0);
  const maxY = Math.max(...glyphPoints.map(p => p.y), 1);
  const minY = Math.min(...glyphPoints.map(p => p.y), 0);
  
  const offsetX = (maxX + minX) / 2;
  const offsetY = (maxY + minY) / 2;

  // 3. Populate 100,000 particles
  const targets = new Float32Array(count * 3);
  const scale = 0.8 / 100; 
  const spread = 0.45; // Adds thickness to the letters

  if (glyphPoints.length === 0) {
    // Fallback if text is empty
    return new Float32Array(count * 3);
  }

  for (let i = 0; i < count; i++) {
    // Pick a random grid point from the text silhouette
    const basePoint = glyphPoints[i % glyphPoints.length];
    
    // Add jitter to fill the "volume" of the pixel
    const jitterX = (Math.random() - 0.5) * spread;
    const jitterY = (Math.random() - 0.5) * spread;
    const jitterZ = (Math.random() - 0.5) * spread;

    targets[i * 3] = (basePoint.x + jitterX - offsetX) * scale;
    targets[i * 3 + 1] = (basePoint.y + jitterY - offsetY) * scale;
    targets[i * 3 + 2] = jitterZ * scale;
  }
  
  return targets;
};

const randomVal = (min: number, max: number) => Math.random() * (max - min) + min;

export const getTargetPosition = (
  i: number,
  count: number,
  shape: ParticleShape
): THREE.Vector3 => {
  const vec = new THREE.Vector3();
  const index = i;
  
  switch (shape) {
    case ParticleShape.HEART: {
      const phi = Math.acos(1 - 2 * (index / count));
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 16 * Math.pow(Math.sin(theta), 3);
      const y = 13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta);
      const scale = 0.15 / 100;
      vec.set(x * scale, y * scale, Math.cos(phi) * 0.9 / 100);
      break;
    }

    case ParticleShape.SATURN: {
      if (i < count * 0.7) {
        const phi = Math.acos(-1 + (2 * i) / (count * 0.7));
        const theta = Math.sqrt((count * 0.7) * Math.PI) * phi;
        vec.setFromSphericalCoords(2.5 / 100, phi, theta);
      } else {
        const angle = (i / (count * 0.3)) * Math.PI * 2 * 10;
        const dist = randomVal(3.5, 6) / 100;
        vec.set(Math.cos(angle) * dist, Math.sin(angle) * dist, randomVal(-0.1, 0.1) / 100);
        vec.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3);
      }
      break;
    }

    case ParticleShape.FLOWER: {
      const angle = (i / count) * Math.PI * 2 * 20;
      const r = (Math.cos(3 * angle) * 3 + 1) / 100;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      const z = ((i / count) * 4 - 2) / 100;
      vec.set(x, y, z);
      break;
    }

    case ParticleShape.FIREWORKS: {
      const phi = Math.acos(-1 + (2 * index) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const burstIndex = i % 5; 
      const radius = (burstIndex * 1.5 + Math.random()) / 100;
      vec.setFromSphericalCoords(radius, phi, theta);
      break;
    }

    case ParticleShape.HAND: {
      const palmRatio = 0.35;
      if (i < count * palmRatio) {
        const r = (1.8 * Math.cbrt(Math.random())) / 100;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        vec.set(r * Math.sin(phi) * Math.cos(theta) * 1.1, (r * Math.sin(phi) * Math.sin(theta)) - 1.2/100, r * Math.cos(phi) * 0.3);
      } else {
        const remainingIndex = i - count * palmRatio;
        const remainingCount = count * (1 - palmRatio);
        const fingerIdx = Math.floor((remainingIndex / remainingCount) * 5);
        const fingers = [[-1.6, -1.8, 0.7, 2.0, 0.5],[-0.9, 0.4, 0.15, 2.6, 0.45],[0.0, 0.5, 0.0, 2.9, 0.45],[0.9, 0.4, -0.15, 2.5, 0.45],[1.7, -0.3, -0.35, 1.9, 0.4]];
        const f = fingers[Math.min(fingerIdx, 4)];
        const h = Math.random() * f[3] / 100;
        const r = Math.sqrt(Math.random()) * f[4] / 100;
        const theta = Math.random() * 2 * Math.PI;
        const lx = r * Math.cos(theta); const ly = h; const lz = r * Math.sin(theta);
        const cosA = Math.cos(f[2]); const sinA = Math.sin(f[2]);
        vec.set(lx * cosA - ly * sinA + f[0]/100, lx * sinA + ly * cosA + f[1]/100, lz);
      }
      break;
    }

    case ParticleShape.STAR: {
      const armIndex = i % 5;
      const t = Math.random(); 
      const width = (1 - t) * 1.0; 
      const angle = (armIndex / 5) * Math.PI * 2 + (Math.PI / 2); 
      const r = (t * 3.5) / 100;
      const spread = (Math.random() - 0.5) * width / 100;
      vec.set(r * Math.cos(angle) - Math.sin(angle) * spread, r * Math.sin(angle) + Math.cos(angle) * spread, (Math.random() - 0.5) * 0.5 / 100);
      break;
    }

    case ParticleShape.BICYCLE: {
      const part = i / count;
      if (part < 0.3) {
        const angle = Math.random() * Math.PI * 2;
        const r = (1.0 + (Math.random()-0.5)*0.1) / 100;
        vec.set(-1.8/100 + Math.cos(angle)*r, Math.sin(angle)*r, (Math.random()-0.5)*0.1/100);
      } else if (part < 0.6) {
        const angle = Math.random() * Math.PI * 2;
        const r = (1.0 + (Math.random()-0.5)*0.1) / 100;
        vec.set(1.8/100 + Math.cos(angle)*r, Math.sin(angle)*r, (Math.random()-0.5)*0.1/100);
      } else {
        const segments = [[new THREE.Vector3(-1.8, 0, 0), new THREE.Vector3(0, 0, 0)],[new THREE.Vector3(-1.8, 0, 0), new THREE.Vector3(-0.5, 1.2, 0)],[new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.5, 1.2, 0)],[new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.2, 1.0, 0)],[new THREE.Vector3(-0.5, 1.2, 0), new THREE.Vector3(1.2, 1.0, 0)],[new THREE.Vector3(1.8, 0, 0), new THREE.Vector3(1.1, 1.8, 0)],[new THREE.Vector3(0.8, 1.8, -0.6), new THREE.Vector3(1.4, 1.8, 0.6)],[new THREE.Vector3(-0.6, 1.4, 0), new THREE.Vector3(-0.4, 1.4, 0)]];
        const seg = segments[Math.floor(Math.random() * segments.length)];
        vec.copy(seg[0]).lerp(seg[1], Math.random()).multiplyScalar(1/100).add(new THREE.Vector3((Math.random()-0.5)*0.15/100, (Math.random()-0.5)*0.15/100, (Math.random()-0.5)*0.15/100));
      }
      break;
    }

    case ParticleShape.PYRAMID: {
      const t = Math.random(); 
      const py = (-1.5 + t * 3.0) / 100;
      const widthAtY = (1 - t) * 2.5 / 100; 
      const side = Math.floor(Math.random() * 4); 
      const offset = (Math.random() - 0.5) * widthAtY;
      let px = 0, pz = 0;
      switch (side) {
        case 0: px = widthAtY / 2; pz = offset; break; 
        case 1: px = -widthAtY / 2; pz = offset; break; 
        case 2: pz = widthAtY / 2; px = offset; break; 
        case 3: pz = -widthAtY / 2; px = offset; break; 
      }
      vec.set(px, py, pz);
      break;
    }
    
    case ParticleShape.PLANE: {
      const part = i / count;
      if (part < 0.5) {
        const t = (i / (count * 0.5)) * Math.PI;
        const x = (-2.5 + (i / (count * 0.5)) * 5.0) / 100; 
        const r = (Math.sin(t) * 0.6 * Math.sqrt(Math.random())) / 100;
        const theta = Math.random() * Math.PI * 2;
        vec.set(x, r * Math.cos(theta), r * Math.sin(theta));
      } else if (part < 0.8) {
        const z = (Math.random() - 0.5) * 7.0 / 100;
        const absZ = Math.abs(z);
        vec.set((-0.5/100 + absZ * 0.3 + (Math.random() - 0.5) * Math.max(0.1/100, 1.2/100 - absZ * 0.15)), (Math.random() - 0.5) * 0.15/100 * (1 - absZ/(4/100)), z);
      } else {
        vec.set((2.2 + Math.abs((Math.random() - 0.5) * 3.0) * 0.3 + (Math.random() - 0.5) * 0.8) / 100, (0.2 + (Math.random() - 0.5) * 0.1) / 100, (Math.random() - 0.5) * 3.0 / 100);
      }
      break;
    }

    case ParticleShape.SPACE_SHUTTLE: {
      const part = i / count;
      if (part < 0.45) {
        const x = (-2.5 + (i / (count * 0.45)) * 5.0) / 100; 
        let r = 0.65 / 100;
        if (x*100 < -0.5) r = (0.65 / 100) * Math.pow((x*100 - (-2.5)) / 2.0, 0.5);
        const angle = Math.random() * Math.PI * 2;
        vec.set(x, r * Math.sqrt(Math.random()) * Math.cos(angle), r * Math.sqrt(Math.random()) * Math.sin(angle));
      } else {
        const t = Math.random();
        vec.set((-0.5 + t * 2.5) / 100, (-0.2 + (Math.random()-0.5) * 0.15) / 100, (Math.random() < 0.5 ? 1 : -1) * (Math.random() * t * 2.8 / 100));
      }
      break;
    }

    case ParticleShape.UFO: {
      const part = i / count;
      if (part < 0.2) {
        const phi = Math.acos(1 - (part / 0.2)); 
        vec.setFromSphericalCoords(1.0/100, phi, Math.sqrt(count * 0.2 * Math.PI) * phi);
        vec.y = Math.abs(vec.y) + 0.3/100;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const r = (Math.sqrt(Math.random()) * 3.5) / 100;
        vec.set(r * Math.cos(angle), (Math.random() - 0.5) * 2 * 0.5/100 * (1 - (r*100/3.5)), r * Math.sin(angle));
      }
      break;
    }

    case ParticleShape.DINOSAUR: {
      const part = i / count;
      if (part < 0.4) {
        const r = (1.8 * Math.cbrt(Math.random())) / 100;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        vec.set(r * Math.sin(phi) * Math.cos(theta) * 1.5, r * Math.sin(phi) * Math.sin(theta) * 1.2, r * Math.cos(phi) * 0.8);
      } else {
        const t = Math.random();
        vec.set((-1.5 - t * 3.5) / 100, (-0.0 - t * 1.5 + Math.sqrt(Math.random()) * 1.0 * (1 - t) * Math.cos(Math.random() * 2 * Math.PI)) / 100, (Math.sqrt(Math.random()) * 1.0 * (1 - t) * Math.sin(Math.random() * 2 * Math.PI)) / 100);
      }
      break;
    }

    case ParticleShape.CHESS_PIECE: {
      const part = i / count;
      if (part < 0.25) {
          const t = part / 0.25; 
          vec.set((1.5 - t * 0.5) * Math.sqrt(Math.random()) * Math.cos(Math.random() * 2 * Math.PI) / 100, (-2.5 + t * 0.8) / 100, (1.5 - t * 0.5) * Math.sqrt(Math.random()) * Math.sin(Math.random() * 2 * Math.PI) / 100);
      } else if (part < 0.65) {
          const t = (part - 0.25) / 0.4;
          const rP = (0.5 + 0.5 * Math.pow(2*t - 1, 2)) / 100; 
          vec.set(rP * Math.sqrt(Math.random()) * Math.cos(Math.random() * 2 * Math.PI), (-1.7 + t * 2.7) / 100, rP * Math.sqrt(Math.random()) * Math.sin(Math.random() * 2 * Math.PI));
      } else {
          const r = (0.7 * Math.cbrt(Math.random())) / 100; 
          const phi = Math.acos(2 * Math.random() - 1);
          vec.setFromSphericalCoords(r, phi, Math.random() * 2 * Math.PI);
          vec.y += 1.8/100; 
      }
      break;
    }

    case ParticleShape.TSHIRT: {
      const part = i / count;
      if (part < 0.7) {
          const x = (Math.random() - 0.5) * 2.2 / 100;
          const y = (Math.random() - 0.5) * 3.0 / 100;
          if (y*100 > 1.0 && Math.abs(x*100) < 0.5) vec.set((x > 0 ? 0.6/100 : -0.6/100) + (Math.random()-0.5)*0.2/100, y, (Math.random() - 0.5) * 0.6 / 100);
          else vec.set(x, y, (Math.random() - 0.5) * 0.6 / 100);
      } else {
          vec.set((Math.random() > 0.5 ? 1 : -1) * (1.1 + Math.random() * 1.0) / 100, (0.8 + (Math.random() - 0.5) * 1.0) / 100, (Math.random() - 0.5) * 0.6 / 100);
      }
      break;
    }

    case ParticleShape.SPHERE:
    default: {
      const phi = Math.acos(-1 + (2 * index) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      vec.setFromSphericalCoords(4 / 100, phi, theta);
      break;
    }
  }

  return vec;
};
