import React from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedDonations from "./FeaturedDonations";
import ImpactStats from "./ImpactStats";
import CommunityStories from "./CommunityStories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedDonations></FeaturedDonations>
      <ImpactStats></ImpactStats>
      <CommunityStories></CommunityStories>
    </div>
  );
};

export default Home;
