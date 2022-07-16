import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

export const GithubProvider = ({ children }) => {
  const [githubCurrentUser, setGithubCurrentUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(0);
  const [loading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });
  //sserch user
  const searchUser = async (user) => {
    setIsLoading(true);
    toggleError();
    const res = await axios(`${rootUrl}/users/${user}`).catch((e) => {});
    //   console.log(res.data)

    if (res) {
      setGithubCurrentUser(res.data);
   
      const { login, followers_url } = res.data;
    //   axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
    //     setRepos(response.data);
    //   });
    //   axios(`${rootUrl}/users/${login}/followers`).then((response) => {
    //     setFollowers(response.data);
    //   });
    await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${rootUrl}/users/${login}/followers`)]).then((results)=>{
       
        const [repos,followers] = results;
        const status ="fulfilled";
        console.log(repos)
        if(repos.status ===status){
            setRepos(repos.value.data)
        }
        console.log(followers);

        if(followers.status ===status){
            setFollowers(followers.value.data)
        }
    }).catch((e)=>{
        console.log(e)
    })
      //   https://api.github.com/users/john-smilga/repos?per_page=100
      // https://api.github.com/users/john-smilga/followers
    } else {

      toggleError(true, "there is no user with that search");
    }
    setIsLoading(false);

    checkRequestes();
  };
  //check rate
  const checkRequestes = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((data) => {
        setRequests(data.data.rate.remaining);

        if (data.data.rate.remaining === 0) {
          toggleError(true, "sorry,you have exeeded your hourly rate limit");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    checkRequestes();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubCurrentUser,
        repos,
        followers,
        requests,
        error,
        searchUser,
        setIsLoading,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GithubContext);
};
