import React from "react";
import styled from "styled-components";
import { GithubContext, useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars : total[language].stars + stargazers_count
      };
    }
    return total;
  }, {});
  //Most use : Pie3D
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
    //Most starts : Doughnut2D
    const mostPopular = Object.values(languages).sort((a,b)=>{
      return b.stars - a.stars;
    }).map((item)=>{
      return {...item,value : item.stars}
    }).slice(0,5);
   
   //Stars, forks
   let{stars,forks} = repos.reduce((total,item)=>{
    const {stargazers_count,name,forks}=item;
    
        total.stars[name]= {label: name,value: stargazers_count}
        total.forks[name]= {label: name,value: forks};
    
   
    // total.stars[stargazers_count] = {label: name,value: stargazers_count}
       return total
   },{stars:{},forks:{}})
  

   stars = Object.values(stars).sort((a,b)=>{
      return b.value - a.value;
   }).slice(0,5)
   
   forks = Object.values(forks).sort((a,b)=>{
    return b.value - a.value;
 }).slice(0,5)

  

  return (
    <section className="section">
      <Wrapper className="section-center">
        <div className="fusioncharts-container">
          <Pie3D data={mostUsed} />
        </div>
        <div className="fusioncharts-container">
          <Column3D data={stars} />
        </div>
        <div className="fusioncharts-container">
          <Doughnut2D data={mostPopular} />
        </div>
        <div className="fusioncharts-container">
          <Bar3D data={forks} />
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
