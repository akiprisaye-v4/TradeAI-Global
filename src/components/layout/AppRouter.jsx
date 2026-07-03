import React from "react";

import DashboardPage from "../../pages/core/DashboardPage";
import AnalyticsPage from "../../pages/core/AnalyticsPage";
import TradeAIPage from "../../pages/core/TradeAIPage";
import StockPage from "../../pages/core/StockPage";
import CompetitivePage from "../../pages/core/CompetitivePage";
import AProposPage from "../../pages/core/AProposPage";
import IdeasPage from "../../pages/core/IdeasPage";
import CalculateurPage from "../../pages/core/CalculateurPage";
import COGSPage from "../../pages/core/COGSPage";
import PricingPage from "../../pages/core/PricingPage";
import PortfolioPage from "../../pages/core/PortfolioPage";
import HistoriquePage from "../../pages/core/HistoriquePage";
import AcademyPage from "../../pages/core/AcademyPage";
import FBACalculatorsPage from "../../pages/core/FBACalculatorsPage";
import AiPricePage from "../../pages/core/AiPricePage";
import SmartInsightsPage from "../../pages/core/SmartInsightsPage";
import CommunityPage from "../../pages/core/CommunityPage";
import ListingPage from "../../pages/core/ListingPage";
import KeywordPage from "../../pages/core/KeywordPage";
import ExtensionPage from "../../pages/core/ExtensionPage";
import EcosystemPage from "../../pages/core/EcosystemPage";
import V7RoadmapPage from "../../pages/core/V7RoadmapPage";

import Pricing from "../Pricing";
import FormationsShop from "../FormationsShop";
import FBAAcademy from "../FBAAcademy";
import FBACalculators from "../FBACalculators";
import AiPriceTool from "../AiPriceTool";
import SmartInsights from "../SmartInsights";
import CommunityHub from "../CommunityHub";
import ListingBuilder from "../ListingBuilder";
import KeywordResearch from "../KeywordResearch";
import ExtensionData from "../ExtensionData";
import TradeAIEcosystem from "../TradeAIEcosystem";
import V7Roadmap from "../../pages/V7Roadmap";
import AutomationCenter from "../panels/AutomationCenter";
import AffiliateCenter from "../panels/AffiliateCenter";
import PredictiveDashboard from "../panels/PredictiveDashboard";
import GlobalSourcingPanel from "../panels/GlobalSourcingPanel";
import ConnectHubPanel from "../panels/ConnectHubPanel";

export default function AppRouter(props) {
  const {
    activeTab, products, activeProduct, p, u, mk, sym, calcP,
    cashFlow, pCol, fxRates, setProducts, setTab, setToast,
    saveCurrentToHistory, safeStorageGet, handleImageUpload,
    searchOnAmazonAlibaba, imageResults, amazonResults, alibabaResults,
    MARKETPLACES, CATEGORIES, TRENDING_PRODUCTS,
    calcProduct, profitColor, scoreColor,
    Section, StatCard, SelectField, InputField, ScoreGauge,
    ProfitMeter, CashFlowChart, MultiProductCashFlow,
    PriceComparisonChart, PortfolioExportButton, RestockAlert,
    fmt, fmtPct
  } = props;

  return (
    <>
      {activeTab === "dashboard" && <DashboardPage products={products} fxRates={fxRates} calcProduct={calcProduct} MARKETPLACES={MARKETPLACES} Section={Section} StatCard={StatCard} fmt={fmt} fmtPct={fmtPct} />}
      {activeTab === "analytics" && <AnalyticsPage products={products} fxRates={fxRates} CATEGORIES={CATEGORIES} calcProduct={calcProduct} Section={Section} StatCard={StatCard} fmt={fmt} fmtPct={fmtPct} scoreColor={scoreColor} />}
      {activeTab === "tradeai" && <TradeAIPage products={products} p={p} calcP={calcP} Section={Section} fmt={fmt} />}
      {activeTab === "stocks" && <StockPage products={products} fxRates={fxRates} calcProduct={calcProduct} Section={Section} StatCard={StatCard} fmt={fmt} />}
      {activeTab === "concurrents" && <CompetitivePage p={p} calcP={calcP} Section={Section} fmt={fmt} />}
      {activeTab === "about" && <AProposPage handleImageUpload={handleImageUpload} searchOnAmazonAlibaba={searchOnAmazonAlibaba} imageResults={imageResults} amazonResults={amazonResults} alibabaResults={alibabaResults} />}
      {activeTab === "ideas" && <IdeasPage TRENDING_PRODUCTS={TRENDING_PRODUCTS} activeProduct={activeProduct} setProducts={setProducts} setTab={setTab} setToast={setToast} fmt={fmt} />}
      {activeTab === "calcul" && <CalculateurPage p={p} u={u} calcP={calcP} sym={sym} mk={mk} cashFlow={cashFlow} pCol={pCol} products={products} fxRates={fxRates} MARKETPLACES={MARKETPLACES} CATEGORIES={CATEGORIES} Section={Section} SelectField={SelectField} InputField={InputField} StatCard={StatCard} ScoreGauge={ScoreGauge} ProfitMeter={ProfitMeter} CashFlowChart={CashFlowChart} MultiProductCashFlow={MultiProductCashFlow} fmt={fmt} fmtPct={fmtPct} />}
      {activeTab === "cogs" && <COGSPage p={p} u={u} sym={sym} calcP={calcP} Section={Section} InputField={InputField} RestockAlert={RestockAlert} />}
      {activeTab === "pricing" && <PricingPage p={p} fxRates={fxRates} PriceComparisonChart={PriceComparisonChart} />}
      {activeTab === "portfolio" && <PortfolioPage products={products} fxRates={fxRates} calcProduct={calcProduct} fmt={fmt} StatCard={StatCard} PortfolioExportButton={PortfolioExportButton} MultiProductCashFlow={MultiProductCashFlow} />}
      {activeTab === "historique" && <HistoriquePage saveCurrentToHistory={saveCurrentToHistory} safeStorageGet={safeStorageGet} MARKETPLACES={MARKETPLACES} profitColor={profitColor} fmt={fmt} />}
      {activeTab === "abonnements" && <Pricing />}
      {activeTab === "formations" && <FormationsShop />}
      {activeTab === "academy" && <AcademyPage><FBAAcademy /></AcademyPage>}
      {activeTab === "calculators" && <FBACalculatorsPage><FBACalculators /></FBACalculatorsPage>}
      {activeTab === "aiprice" && <AiPricePage><AiPriceTool /></AiPricePage>}
      {activeTab === "insights" && <SmartInsightsPage><SmartInsights /></SmartInsightsPage>}
      {activeTab === "community" && <CommunityPage><CommunityHub /></CommunityPage>}
      {activeTab === "listing" && <ListingPage><ListingBuilder /></ListingPage>}
      {activeTab === "keywords" && <KeywordPage><KeywordResearch /></KeywordPage>}
      {activeTab === "extension" && <ExtensionPage><ExtensionData /></ExtensionPage>}
      {activeTab === "ecosystem" && <EcosystemPage><TradeAIEcosystem /></EcosystemPage>}
      {activeTab === "connect" && <ConnectHubPanel />}
      {activeTab === "sourcing" && <GlobalSourcingPanel sources={props.globalSourcing} fmt={fmt} />}
      {activeTab === "predictive" && <PredictiveDashboard predictions={props.predictiveInsights} fmt={fmt} />}
      {activeTab === "automation" && <AutomationCenter alerts={props.automationAlerts} />}
      {activeTab === "affiliate" && <AffiliateCenter />}
      {activeTab === "v7roadmap" && <V7RoadmapPage><V7Roadmap /></V7RoadmapPage>}
    </>
  );
}
