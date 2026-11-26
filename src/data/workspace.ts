/** Current workspace and signed-in user (static demo data). */

export const workspace = {
  name: 'Kreasi Nusantara',
  type: 'Agency',
  memberCount: 8,
} as const;

export const currentUser = {
  name: 'Dimas Prakoso',
  firstName: 'Dimas',
  role: 'Owner',
  email: 'dimas@kreasinusantara.id',
} as const;

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
};

/** Team members referenced across CRM, projects and timesheets. */
export const team: TeamMember[] = [
  { id: 'dp', name: 'Dimas Prakoso', role: 'Owner', email: 'dimas@kreasinusantara.id' },
  { id: 'la', name: 'Laras Ayu', role: 'Project Manager', email: 'laras@kreasinusantara.id' },
  { id: 'ra', name: 'Rizky Aditya', role: 'Designer', email: 'rizky@kreasinusantara.id' },
  { id: 'ns', name: 'Nadia Salsabila', role: 'Developer', email: 'nadia@kreasinusantara.id' },
];

export function memberById(id: string): TeamMember {
  return team.find((m) => m.id === id) ?? team[0]!;
}
