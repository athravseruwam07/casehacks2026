import React from "react";
import { StateProvider, useApp, parseRoute } from "./state.jsx";
import { AppShell } from "./AppShell.jsx";
import { Home } from "./screens/Home.jsx";
import { Score } from "./screens/Score.jsx";
import { Onboarding } from "./screens/Onboarding.jsx";
import { LearnLanding, LearnLibrary, LearnCategory, LearnLesson } from "./screens/Learn.jsx";
import { MissionScreen } from "./screens/Mission.jsx";
import { Graduation } from "./screens/Graduation.jsx";
import { PaperDashboard } from "./screens/Paper.jsx";
import { PaperTicker } from "./screens/PaperTicker.jsx";
import { PaperOrders } from "./screens/PaperOrders.jsx";

function Router() {
  const { route, progress } = useApp();

  if (!progress.onboarded) return <Onboarding />;

  const { tab, segments } = parseRoute(route);

  let body = null;
  switch (tab) {
    case "home":
      body = <Home />;
      break;

    case "score":
      body = <Score />;
      break;

    case "learn":
      if (segments.length === 0) {
        body = <LearnLanding />;
      } else if (segments[0] === "graduation") {
        body = <Graduation />;
      } else if (segments[0].startsWith("week-")) {
        const wk = parseInt(segments[0].split("-")[1], 10);
        if (wk === 12) body = <Graduation />;
        else body = <MissionScreen week={wk} />;
      } else if (segments[0] === "library") {
        if (segments.length === 1) body = <LearnLibrary />;
        else if (segments.length === 2) body = <LearnCategory slug={segments[1]} />;
        else body = <LearnLesson catSlug={segments[1]} lessonSlug={segments[2]} />;
      } else {
        body = <LearnLanding />;
      }
      break;

    case "practice":
      if (segments.length === 0) body = <PaperDashboard />;
      else if (segments[0] === "orders") body = <PaperOrders />;
      else if (segments[0] === "ticker" && segments[1]) body = <PaperTicker symbol={segments[1]} />;
      else body = <PaperDashboard />;
      break;

    default:
      body = <Home />;
  }

  return <AppShell>{body}</AppShell>;
}

export default function App() {
  return (
    <StateProvider>
      <Router />
    </StateProvider>
  );
}
