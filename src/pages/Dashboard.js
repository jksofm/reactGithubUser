import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext, useGlobalContext } from "../context/context";
const Dashboard = () => {
  const { loading, setIsLoading } = useGlobalContext();
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      {loading ? (
        <div>
          <img src={loadingImage} className="loading-img"/>
        </div>
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Dashboard;
