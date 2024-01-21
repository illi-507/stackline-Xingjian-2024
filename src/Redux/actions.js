import axios from 'axios';

/**
 * 
 
        "weekEnding": "2017-01-01",
        "retailSales": 348123,
        "wholesaleSales": 255721,
        "unitsSold": 887,
        "retailerMargin": 123294
         
 */
function dataPreprocess(input){
    let dummyInput = input;
     let sales = input[0].sales;
     let result = sales.map((sale)=>{
        let object = {};
        let date = sale.weekEnding.split('-');
        let year = date[0].slice(2);
        let formatDate = date[1]+'-'+date[2]+"-"+year;
        let formatRetailSales = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(sale.retailSales); 
        let formatWholeSales = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(sale.wholesaleSales); 

          let formatRetailerMargin = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(sale.retailerMargin); 

          object = {
            weekEnding:formatDate, 
            retailSales: formatRetailSales,
            wholesaleSales:formatWholeSales,
            unitsSold: sale.unitsSold,
            retailerMargin: formatRetailerMargin
          }

          return object;
     })

     dummyInput[0].sales = result;
     return dummyInput;
}
export function fetchData(){

    async function temp(dispatch){
        try{
            const response = 
            await axios.get('stackline_frontend_assessment_data_2021.json');
           let processedData =  dataPreprocess(response.data);
            dispatch({type:"FETCH_DATA_SUCCESS", payload:processedData});
         }
         catch(error){
            dispatch({type:"FETCH_DATA_FAILURE", payload:error.message});
         }        
    }

    return temp;
}

export const updateData = (newData)=>({
    type:"UPDATE_DATA",
    payload: newData
})

 