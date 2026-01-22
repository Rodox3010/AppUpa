
export enum PlayerPosition {
  GOL = 'Gol',
  FIXO = 'Fixo',
  ALA = 'Ala',
  PIVO = 'Pivô'
}

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  photoUrl: string;
  stats: {
    matches: number;
    goals: number;
    assists: number;
    absences: number;
  };
  payments: boolean[]; // 12 months, index 0 is Jan
}

export type UserRole = 'ADMIN' | 'VIEWER';
