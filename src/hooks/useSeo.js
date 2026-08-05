import { useEffect } from 'react';
import { applySeo } from '../seo/applySeo';

export function useSeo(meta) {
  useEffect(() => {
    applySeo(meta);
  }, [meta]);
}
