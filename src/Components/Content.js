import React, { useState } from "react";
import LineChart from "./LineChart";
import { updateData } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const upArrow = <FontAwesomeIcon icon={faAngleUp} />;
const downArrow = <FontAwesomeIcon icon={faAngleDown} />;

function SaleTable({ sales, data }) {
  const dispatch = useDispatch();
  const [arrows, setArrows] = useState([
    "down",
    "down",
    "down",
    "down",
    "down",
  ]);

  function handleUpdate(index) {
    let array = arrows;
    let arrow = arrows[index];
    if (arrow === "down") {
      array[index] = "up";
      for (let i = 0; i < 5; i++) {
        if (i !== index) {
          array[i] = "down";
        }
      }
      setArrows([...array]);
    } else {
      array[index] = "down";
      setArrows([...array]);
    }
    console.log(arrow);
/**
 * retailSales: "$348,123.00"
​​​​
retailerMargin: "$123,294.00"
​​​​
unitsSold: 887
​​​​
weekEnding: "01-01-17"
​​​​
wholesaleSales: "$255,721.00"
 */
    // if down, turn it into decreasing order
    
    function sortByPrice(array,field, decreasing=true){
         const sorted = array.slice().sort((a,b)=>{
            const valueA = parseFloat(a[field].replace(/[$,]/g,""));
            const valueB = parseFloat(b[field].replace(/[$,]/g,""));
            if(decreasing){
                return valueB - valueA;
            }
            else{
                return valueA - valueB;
            }
         })
         return sorted;
    }
    let temp = {...data};
    let sales = temp[0].sales;

    switch (index) {
      case 0:
        if(arrow==='down'){
            let result = sales.slice().sort((a,b)=>b.weekEnding.localeCompare(a.weekEnding)); 

            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        else{
            let result = sales.slice().sort((a,b)=>a.weekEnding.localeCompare(b.weekEnding));      
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        console.log("0");
        break;

      case 1:
        if(arrow==='down'){
            let result = sortByPrice(sales,"retailSales", true);          
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        else{
            let result = sortByPrice(sales,"retailSales", false);            
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        console.log("1");
        break;
      case 2:
        if(arrow==='down'){
            let result = sortByPrice(sales,"wholesaleSales", true);          
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        else{
            let result = sortByPrice(sales,"wholesaleSales", false);            
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        console.log("2");
        break;
      case 3:

        if(arrow==='down'){
            let result = sales.slice().sort((a,b)=>b.unitsSold-a.unitsSold);       
         
            console.log("result,,,,",result);
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        else{
            let result = sales.slice().sort((a,b)=>-b.unitsSold+a.unitsSold);      
         
            console.log("result,,,,",result);
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        console.log("3");
        break;
      case 4:
        if(arrow==='down'){
            let result = sortByPrice(sales,"retailerMargin", true);          
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        else{
            let result = sortByPrice(sales,"retailerMargin", false);            
         
            temp[0].sales = result;
            dispatch(updateData(temp));
        }
        console.log("4");
        break;
      default:
        break;
    }
  }

  console.log("in sales table ,", data);
  
  function getTitles() {
    const titles = [
      "WEEK ENDING",
      "RETAIL SALES",
      "WHOLESALE SALES",
      "UNITS SOLD",
      "RETAILER MARGIN",
    ];

    let result = titles.map((title, index) => {
      return (
        <th key={index} onClick={() => handleUpdate(index)}>
          <span style={{ paddingRight: "10px" }}>{title}</span>
          {arrows[index] === "down" ? downArrow : upArrow}
        </th>
      );
    });

    return result;
  }

  function getCells() {
    //sales
    let result = sales.map((sale, index) => {
      let array = Object.values(sale);

      return (
        <tr key={index}>
          {array.map((item, index) => {
            return <td key={index}>{item}</td>;
          })}
        </tr>
      );
    });

    return result;
  }
  return (
    <div>
      <p style={{ color: "green" }}>Click table headers to change order</p>
      <table className="sales-table">
        <thead>
          <tr> {getTitles()}</tr>
        </thead>
        <tbody>{getCells()}</tbody>
      </table>
    </div>
  );
}

function SaleGraph({ sales }) {
  return (
    <div>
      <div>Retail Sales </div>
      <LineChart data={sales} />
    </div>
  );
}
function Content({ sales, data }) {
  return (
    <div className="content-container">
      <SaleGraph sales={sales} />
      <SaleTable sales={sales} data={data} />
    </div>
  );
}

export default Content;
