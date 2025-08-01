'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export type ListingItem = {
  id: string;
  title: string;
  price: number;
  category?: string;
};

type ListingContextType = {
  listings: ListingItem[];
  setListings: (items: ListingItem[]) => void;
  addListing: (item: ListingItem) => void;
};

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export function useListingContext() {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error('useListingContext must be used inside a ListingProvider');
  }
  return context;
}

export function ListingProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<ListingItem[]>([]);

  const addListing = (item: ListingItem) => {
    setListings((prev) => [...prev, item]);
  };

  return (
    <ListingContext.Provider value={{ listings, setListings, addListing }}>
      {children}
    </ListingContext.Provider>
  );
}
