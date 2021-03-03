import React, { useState, useRef, setState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {XYPlot, 
  LineSeries, 
  XAxis, 
  YAxis, 
  VerticalGridLines, 
  HorizontalGridLines,
  MarkSeries,
  Voronoi,
  Hint} from 'react-vis';

// import ReactDataGrid from 'react-data-grid';
import data from '../../eng-possibilities-svcs-tests/src/main/resources/data/investment-details.json';

const ForecasterHome = () => {
    const SectionStyled = styled.section`
      max-width: 3000px;
      position: relative;


      .inner {
        display: grid;
        grid-template-columns: 3fr 2fr;
        grid-gap: 250px;

      }

      ul {
        &.fancy-list {
          padding: 0;
          margin: 0;
          list-style: none;
          li {
            position: relative;
            padding-left: 30px;
            margin-bottom: 10px;
            &:before {
              content: '▹';
              position: absolute;
              left: 0;
              color: #DA4E4E;
            }
          }
        }
      }
  `;
  

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    head: {
      backgroundColor: '#7399C6',
      // color: '#FFFFFF',
      align: "center"
    },
    cell: {
      backgroundColor: '#D4E4FA',
    },
  });
  
  const classes = useStyles();
  const revealContainer = useRef(null);
  const investments = Array(8);

  data.Investments.map((data,i) => {
    investments[i] = table(data.data);
  })

  const lines = investments.map((p, i) => p.map(d => ({...d, line: i})));


  const [hoveredNode, setHoveredNode] = useState(null);

  // useEffect(() => {
  //   if (hoveredNode !== null) {
  //   setPasswdMismatch(true);
  
  //      } 
  //   else{
  //     setPasswdMismatch(false);
  //  }
  // }, [rePassword]);

 
  return (
    <SectionStyled id="about" ref={revealContainer}>
    
       <div>
            <h3>Investment Forecaster</h3>
            <p>This page allows you to customize your investments and view the potential growth of <b>$10,000</b> over a period of <b>10 years</b>.</p>
        </div>


      {/* {investments = investments.map((p, i) => p.map(d => ({...d, line: i})))}; */}
      {console.log(investments)}
      <XYPlot 
        xType="ordinal"
        // stackBy="y"
        width={1000}
        height={500}
        style={{paddingLeft: '30'}}
        >
        <XAxis title="Year"/>
        <YAxis title="Investment Outlook"
        tickLabelAngle={-70}
        />
        {/* <AreaSeries data={table(data.data)} 
        style={{strokeWidth: 2, fill: 'none'}}
        /> */}
        {lines.map((d, i) => {
          return (
            <LineSeries
              key={i}
              opacity={hoveredNode && hoveredNode.line === i ? 1 : 0.5}
              data={d}
              onValueMouseOver={(event)=>{
                // does something on click
                // <Hint value={data.Investments[i].category} style={{fontSize: 14}}/>
                <Hint value={d}>
                  <div style={{background: 'black'}}>
                    <p>{d.y}</p>
                  </div>
                </Hint>
                // you can access the value of the event
            }}
            />
          )          
        })}
        {hoveredNode && <MarkSeries data={[hoveredNode]} />}
        {/* <Hint value={data.Investments[0].category} style={{fontSize: 14}}/> */}
        <Voronoi
            nodes={lines.reduce((acc, d) => [...acc, ...d], [])}
            onHover={node => setHoveredNode(node)}
            // onBlur={() => (hoveredNode === null)}
            // onBlur={() => this.setState({hoveredNode: null})}
          />
        {/* {()=>(hoveredNode ? (
          <Hint value={d}>
            <div style={{background: 'black'}}>
              <p>{d.y}</p>
            </div>
          </Hint>
          ):
        } */}
      </XYPlot>
      {/* {data.Investments.map((data,i) => {
            // investments[i] = table(data.data);
            return (

              <ul key = {i}>
                <div>
                  <label>{data.category}</label>
                  <br></br>
                  <input type="text" id={data.category} min={data.minimum}></input>
                </div>

              </ul>
            )
          }    
        )
      } */}

    <br />
    <br />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Investment Category</TableCell>
            {data.Investments.map((data,i) => (
                  <TableCell align="right">{2021+i}</TableCell>
                )  
              )
            }
            <TableCell align="center">{2029}</TableCell>
            <TableCell align="center">{2030}</TableCell>
            <TableCell align="center">Input</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">{2031}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.cell}>
          {data.Investments.map((row,y) => (
            <TableRow key={row.category}>
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              {row.data.map((daat) => (
                <TableCell align="center">{"$" + (daat*1000)}</TableCell>
              ))}
              <TableCell align="center">
                <input type="text" id={row.category} min={row.minimum} style={{width:'60px', marginRight: '4px'}}></input>
                <Button align="center" variant="contained" color="primary" disableElevation>
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br />       
    </SectionStyled>
  );
};

export default ForecasterHome;

function table(profile) {
  var i = 0, invest = [];
  for (i = 0; i < 10; i++) {
      invest[i] = {x: (2021+i), y: profile[i]*1000};
  }
  
  return invest;  
}

// function all(profile) {
//   // var i = 0, invest =[];
//   var invest = [];
//   profile.jsonParse()
//   profile.map((datap, i) => 
//     invest[i] = {datap.data};
//   )
//   // for (i = 0; i < 8; i++) {
//   //   // let temp = new Array(11);
//   //   // for (y = 0; y < 11; y++) {
//   //   //   temp[y] = {x: (2021+y), y: profile[i].data[y]*1000};
//   //   // }
//   //   invest[i] = table();
//   // }
//   return invest;
// }


function handleClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
}