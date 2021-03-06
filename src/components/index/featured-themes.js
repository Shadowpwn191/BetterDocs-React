import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
//import style from 'src/styles/featured-themes.module.scss'
import styled from 'styled-components';
import * as variable from 'src/styles/variables'
import { rgba } from 'polished'
import Card from 'src/components/index/featured-theme-card'

class Features extends React.Component {

  componentDidMount () {

  }

  render () {
    return (
  <StaticQuery
    query={ graphql`
    query featuredThemesQuery {
        first:allMarkdownRemark(
          filter: {
            collection: {
              eq: "themes"
            } 
            frontmatter: {
              featured: {
                eq: true
              }
            }
          }, 
          sort: { 
            fields: [frontmatter___title], order: ASC
          }
          limit: 5) {
          group(field: collection) {
            fieldValue
            totalCount
          }
          ...themeFragment
        },
        second:allMarkdownRemark(filter: { collection: { eq: "themes" } frontmatter: { featured: { eq: true } } }, limit: 5 skip: 5) {
            group(field: collection) {
              fieldValue
              totalCount
            }
            ...themeFragment
          }
      }    
  `}
    render={data => (
        <Container>
        <TopWave>
            <svg preserveAspectRatio='none' width='1920'viewBox='0 0 1920 330'
            >
                <path d='M140.881198,194.260295 C257.600568,129.32862 342.939626,119.84993 418.009939,203.154617 C493.080251,286.459305 545.728689,70.9046172 636.439626,63.9593047 C727.150564,57.0139922 768.99822,139.670242 858.802907,119.431961 C948.607595,99.1936797 1071.91228,-32.9977266 1243.91228,7.75227342 C1415.91228,48.5022734 1404.10369,208.584305 1508.27166,178.709305 C1612.43963,148.834305 1633.73291,79.913472 1711.63588,98.8569055 C1776.28676,114.577866 1819.96778,221.391836 1889.37253,185.808108 C2017.32661,120.206212 2004.01952,336.769569 2004.01952,336.769569 L271.635881,337 L-149.063338,337 C-149.063338,337 -245.850307,175.637635 -58.0633382,228.867188 C33.8652851,254.92501 64.1722713,236.933925 140.881198,194.260295 Z'
                />
            </svg>
        </TopWave>
        <Header>Get access to our best high quality themes.</Header>
        <SubText>Check it out:</SubText>
            <Overflow>
                <Cards>
                    {data.first.edges.map(({ node }) => (
                        <Card 
                        key={node.id}
                        title={node.frontmatter.title}
                        author={node.frontmatter.author}
                        slug={node.fields.slug}
                        thumbnail={node.frontmatter.thumbnail}
                        />
                    ))}
                </Cards>
            </Overflow>
            <Overflow>
                <Cards>
                    {data.second.edges.map(({ node }) => (
                        <Card 
                        key={node.id}
                        title={node.frontmatter.title}
                        author={node.frontmatter.author}
                        slug={node.fields.slug}
                        thumbnail={node.frontmatter.thumbnail}
                        />
                    ))}
                </Cards>
            </Overflow>
            <BtnContainer>
                <Btn to="/themes/featured/">View all featured themes</Btn>
            </BtnContainer>
        </Container>      
    )}
  />
)}}

export default Features

const Container = styled.section`
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color: #18191c;
    position: relative;
`
const Overflow = styled.div`
    overflow: hidden;
    margin-bottom: 1.48rem;
    z-index: 4;
`
const Cards = styled.div`
    display: flex;
    z-index: 3;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 auto;
    @media (min-width: 850px) {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    &::-webkit-scrollbar-button {
        display: none;
        height: 13px;
        border-radius: 0px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${rgba(variable.SiteColor, 0.3)};
        transition: background-color .2s ease-in-out;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: ${variable.SiteColor};
    }
    &::-webkit-scrollbar-track {
        background-color: ${rgba(variable.SiteColor, 0.06)};
    }
    &::-webkit-scrollbar {
        width: 8px;
        visibility: hidden;
        display: none;
    }
`
const SubText = styled.div`
    font-size: 0.7rem;
    text-align: left;
    margin-bottom: 1.3rem;
    margin-top: -1rem;
    color: #fff;
    font-weight: normal;
    z-index: 4;
    text-indent: 1rem;
    @media (min-width: 850px) {
        font-size: 1.1rem;
    }
`
const Header = styled.div`
    font-size: 1rem;
    text-align: left;
    margin-bottom: 1.3rem;
    margin-top: -2.5rem;
    color: #fff;
    font-weight: bold;
    z-index: 99;
    margin-left: 1rem;
    @media (min-width: 850px) {
        font-size: 1.4rem;
        margin-top: -2rem;
    }
`
const Btn = styled(Link)`
`
const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    z-index: 4;
    margin-top: -2rem;
    margin-bottom: 0.8rem;
    @media (min-width: 850px) {
        margin-top: unset;
    }
    ${Btn} {
        color: #fff;
        border: 1px solid hsla(0,0%,100%,.3);
        display: -webkit-inline-box;
        padding: 0.38rem 0.7rem;
        font-size: 0.6rem;
        border-radius: 2px;
        transition: all 250ms linear;
        &:hover {
            border: 1px solid hsla(0,0%,100%,.6);
        }
    }
`

const TopWave = styled.div`
    svg {
        position: absolute;
        top: -5px;
        left: 0;
        transform: rotate(180deg);
        right: 0;
        width: 100%;
        z-index: 4;
        fill: ${variable.SiteColor};
        path {
            -webkit-animation-play-state: running;
            animation-play-state: running;
            animation: blobAnimation 75s linear infinite alternate;
        }
    }
    @keyframes blobAnimation {
    0% {
      d: path("M140.881198,194.260295 C257.600568,129.32862 342.939626,119.84993 418.009939,203.154617 C493.080251,286.459305 545.728689,70.9046172 636.439626,63.9593047 C727.150564,57.0139922 768.99822,139.670242 858.802907,119.431961 C948.607595,99.1936797 1071.91228,-32.9977266 1243.91228,7.75227342 C1415.91228,48.5022734 1404.10369,208.584305 1508.27166,178.709305 C1612.43963,148.834305 1633.73291,79.913472 1711.63588,98.8569055 C1776.28676,114.577866 1819.96778,221.391836 1889.37253,185.808108 C2017.32661,120.206212 2004.01952,336.769569 2004.01952,336.769569 L271.635881,337 L-149.063338,337 C-149.063338,337 -245.850307,175.637635 -58.0633382,228.867188 C33.8652851,254.92501 64.1722713,236.933925 140.881198,194.260295 Z"); }
    50% {
      d: path("M-60.13579,199.189799 C-33.8674767,-71.7287911 170.194454,11.9640675 274.985105,83.0972992 C379.775756,154.230531 409.072181,161.653171 521.54913,124.460269 C634.026079,87.2673683 645.348165,219.42808 735.152853,199.189799 C824.95754,178.951518 948.262228,46.7601116 1120.26223,87.5101116 C1292.26223,128.260112 1309.89513,321.347957 1414.0631,291.472957 C1518.23106,261.597957 1580.53259,89.5639434 1732.07052,88.5665294 C1892.57296,87.5101116 1897.70372,225.708266 2049.59054,199.189799 C2201.47736,172.671332 2002.94707,336.794682 2002.94707,336.794682 L270.563429,337.025114 L-60.13579,337.025114 C-60.13579,337.025114 -469.886827,134.917309 -282.099858,188.146862 C-190.171235,214.204685 -65.9645849,259.30515 -60.13579,199.189799 Z"); }
    to {
      d: path("M-160.553381,263.533987 C-124.4955,243.377988 -18.6139605,181.080724 56.456352,264.385412 C131.526664,347.690099 165.148428,226.409513 223.668826,168.5 C282.189224,110.590487 372.68516,208.331261 462.489847,188.09298 C552.294535,167.854699 723.262827,-40.1656225 847.424394,40.7522734 C971.58596,121.670169 1156.59375,252.295176 1300.40314,228.958726 C1444.21253,205.622277 1478.90991,106.221579 1563.51957,124.699258 C1655.80276,144.85274 1595.69955,250.007434 1832.41793,206.740235 C2069.1363,163.473036 2002.94707,336.794682 2002.94707,336.794682 L270.563429,337.025114 L-60.13579,337.025114 C-60.13579,337.025114 -495.794798,256.512987 -308.007829,309.74254 C-216.079206,335.800362 -208.740043,290.469854 -160.553381,263.533987 Z"); } 
}
`