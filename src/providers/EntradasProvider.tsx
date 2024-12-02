
"use client";

import React from 'react';
import { EntradasProvider } from '@/contexts/EntradasContext';

const EntradasProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntradasProvider>
      {children}
    </EntradasProvider>
  );
};

export default EntradasProviderWrapper;