import CountriesCard from "./CountriesRow";
import LoadingIndicator from "./LoadingIndicator";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Countries() {

  const[data,setData]= useState([])
  const[loading,setLoading]=useState(false)
  const[page,setpage]=useState(1)
  const[er,setEr]=useState(null)
  const[totalPages,setTotalPages] = useState(null)



  async function getData(){
    setLoading(true)
    try {
      let rec = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?limit=10&page=${page}`)
      let NewRec = await rec.json()
      setTotalPages(NewRec.totalPages)
      setData(NewRec.data)
      console.log(NewRec.data)
      
    } catch (error) {
      setEr(error.message)
      console.log(error)
      
    }finally{setLoading(false)}
  }
useEffect(function(){
  getData()
},[page])

if(loading)return <LoadingIndicator />;
if(er)return <h1>{er} </h1>
  return (
    <div>
      <h1 data-testid="countries-header">Countries List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>COUNTRY</th>
            <th>POPULATION</th>
            <th>RANK</th>
          </tr>
        </thead>
        <tbody data-testid="countries-container">
          {/* Show the CountriesRow here  */}
          {data.map((row)=>(
            <CountriesCard
            key={row.id}
            {...row}/>

          ))}
        </tbody>
      </table>
      <div>{/* Pagination */}
            <Pagination total={totalPages} onChange={setpage} current={page}/>
      
      </div>

    </div>
  );
}

export default Countries;
