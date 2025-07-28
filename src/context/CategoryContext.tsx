import React from "react";

export const CategoryContext = React.createContext<{
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}>({
  selectedCategory: "Electronics",
  setSelectedCategory: () => {},
}); 