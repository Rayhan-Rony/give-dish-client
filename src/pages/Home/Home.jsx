import React from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedDonations from "./FeaturedDonations";
import ImpactStats from "./ImpactStats";
import CommunityStories from "./CommunityStories";
import LatestCharityRequests from "./LatestCharityRequests";
import Newsletter from "../Newsletter/Newsletter";
import AccordionSection from "../AccordionSection/AccordionSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedDonations></FeaturedDonations>
      <ImpactStats></ImpactStats>
      <CommunityStories></CommunityStories>
      <LatestCharityRequests></LatestCharityRequests>
      <AccordionSection></AccordionSection>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
