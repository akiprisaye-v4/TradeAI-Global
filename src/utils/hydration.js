// Gestionnaire d'hydratation pour éviter les erreurs React #418
export const useHydration = () => {
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
};
