import { Metadata } from "next";
import VastTagTesterClient from "./VastTagTesterClient";

export const metadata: Metadata = {
  title: "VAST Tag Tester – Free Online Tool",
  description:
    "Test VAST, VMAP, and VPAID ad tags online. Load an ad tag in a player, preview XML, and inspect playback events and errors.",
};

export default function VastTagTesterPage() {
  return <VastTagTesterClient />;
}