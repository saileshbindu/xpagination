import { useEffect, useState } from "react";
import './xpagination.css'
const Xpagination = () => {
    const empURL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    const [employData, setEmployData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10);

    useEffect(()=>{
        fetch(empURL)
            .then((response)=>response.json())
            .then((data) => setEmployData(data))
            .catch((e)=>window.alert(e))
    },[])

   const indexOfLastpage = currentPage * postsPerPage;
   const indexOfFirstPage = indexOfLastpage - postsPerPage;
   const currentPosts = employData.slice(indexOfFirstPage, indexOfLastpage)
   const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    return(<div>
<table cellSpacing='0' className="tableMain">
  <thead><tr className="theader">
        <th className="thspace">ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
    </tr></thead>
<tbody>
    {currentPosts.map((emp)=>(
 <tr className="tbody">
 <td className="thspace">{emp.id}</td>
 <td>{emp.name}</td>
 <td>{emp.email}</td>
  <td>{emp.role}</td>
</tr>

    ))}
    </tbody>
  </table>
  <div className="btnMain">
    <button className="btnBg" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
    <div className="btnBg" >{currentPage}</div>
    <button className="btnBg"  onClick={() => paginate(currentPage + 1)} disabled={indexOfLastpage >= employData.length}>Next</button>
  </div>
   

    </div>)

}

export default Xpagination;