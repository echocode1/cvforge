import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateCvInput, UpdateCvInput } from '@cvforge/types';
import { cvsService } from '../services/cvs.service';
import { queryKeys } from '../query-keys';

export function useCvs() {
  return useQuery({ queryKey: queryKeys.cvs.all, queryFn: cvsService.list });
}

export function useCv(id: string) {
  return useQuery({ queryKey: queryKeys.cvs.detail(id), queryFn: () => cvsService.get(id), enabled: !!id });
}

export function useCreateCv() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCvInput) => cvsService.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.cvs.all }),
  });
}

export function useUpdateCv(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateCvInput) => cvsService.update(id, input),
    onSuccess: (cv) => {
      // Update the cache directly; do NOT refetch the detail, or it would fight the editor's local draft.
      qc.setQueryData(queryKeys.cvs.detail(id), cv);
      void qc.invalidateQueries({ queryKey: queryKeys.cvs.all });
    },
  });
}

export function useDeleteCv() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cvsService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.cvs.all }),
  });
}

/** Update any CV by id (used by the dashboard for rename). */
export function useUpdateCvById() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCvInput }) => cvsService.update(id, input),
    onSuccess: (cv) => {
      qc.setQueryData(queryKeys.cvs.detail(cv.id), cv);
      void qc.invalidateQueries({ queryKey: queryKeys.cvs.all });
    },
  });
}
