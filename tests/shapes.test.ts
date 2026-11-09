import {it,expect} from 'vitest';
import {getTargetPosition} from '../utils/math';
import {ParticleShape} from '../types';
it('gera posições finitas para todas as formas',()=>{for(const shape of Object.values(ParticleShape)){for(const i of [0,1,50,99]){const p=getTargetPosition(i,100,shape);expect(Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)).toBe(true);}}});
