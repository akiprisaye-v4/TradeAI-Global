import React, { Suspense, lazy } from 'react';

// Chargement paresseux de chaque visualisation
const VolumeProjections = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.VolumeProjections }))
);
const ScenarioSimulator = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.ScenarioSimulator }))
);
const SensitivityAnalysis = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.SensitivityAnalysis }))
);
const RiskAssessment = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.RiskAssessment }))
);
const TimeProjection = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.TimeProjection }))
);
const MarketplaceHeatmap = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.MarketplaceHeatmap }))
);
const ProductJourney = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.ProductJourney }))
);
const SeasonalityAnalysis = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.SeasonalityAnalysis }))
);
const MultiProductComparator = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.MultiProductComparator }))
);
const SmartAlerts = lazy(() => 
  import('./ProfitVisualizations').then(module => ({ default: module.SmartAlerts }))
);

// Composant de chargement
const LoadingFallback = () => (
  <div style={{
    padding: 20,
    background: "#161B22",
    border: "1px solid #21262D",
    borderRadius: 8,
    textAlign: "center",
    color: "#8B949E"
  }}>
    <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
    <div style={{ fontSize: 12 }}>Chargement de l'analyse...</div>
  </div>
);

// Composant wrapper avec lazy loading
export const LazyVisualizations = ({ margin }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VolumeProjections margin={margin} />
      <ScenarioSimulator margin={margin} />
      <SensitivityAnalysis margin={margin} />
      <RiskAssessment margin={margin} />
      <TimeProjection margin={margin} />
      <MarketplaceHeatmap margin={margin} />
      <ProductJourney margin={margin} />
      <SeasonalityAnalysis margin={margin} />
      <MultiProductComparator margin={margin} />
      <SmartAlerts margin={margin} />
    </Suspense>
  );
};

export default React.memo(LazyVisualizations);
