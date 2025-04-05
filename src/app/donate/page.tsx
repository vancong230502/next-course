import { Metadata } from "next";
import { DonateClient } from "./donate-client";

export const metadata: Metadata = {
  title: "Donate | Studiac",
  description: "Support our platform by making a donation",
};

export default function DonatePage() {
  return <DonateClient />;
} 