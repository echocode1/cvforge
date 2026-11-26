/** Central place for TanStack Query keys. Add one entry per feature. */
export const queryKeys = {
  health: ['health'] as const,
  cvs: {
    all: ['cvs'] as const,
    detail: (id: string) => ['cvs', id] as const,
  },
};
