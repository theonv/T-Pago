
// Crie este arquivo como: src/hooks/useClientOnly.js

import { useEffect, useState } from 'react';

export function useClientOnly() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}