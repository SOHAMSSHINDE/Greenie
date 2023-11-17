import { useState , useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function View() {
	// const nav = useNavigate();
	const [info , setInfo] = useState([]);
	const [tableEmpty, setTableEmpty] = useState(false);

	useEffect(() =>{
		let urladd = "http://localhost:9000/getdata";
		axios.get(urladd)
		.then(res =>{if (res.data.length === 0) {
			setTableEmpty(true);
		  } else {
			 setInfo(res.data);
			console.log(info);
			setTableEmpty(false);
 		 }
		})
		.catch(err => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const delStu = (email) => {

			let urladd = "http://localhost:9000/remove";
			let d = {data:{email}}
			axios.delete(urladd , d)
			.then(res =>{
				alert("record deleted");
				window.location.reload();
			})
			.catch(err =>alert("del issue " + err));
		}
		const truncStu = () => {

			let urladd = "http://localhost:9000/trunc";
			
			axios.delete(urladd )
			.then(res =>{
				alert("record deleted");
				window.location.reload();
			})
			.catch(err =>alert("del issue " + err));
		}

		
		
		
		// const updateStu = (rno , name , marks)=>{
		// 	nav("/update", {state: {r:rno, n:name, m:marks}})
		// }
		
		return(
		<>
		<center>
		<h1>View Page </h1>
		{tableEmpty ? (
  <p >Note: The table is empty.</p>
) : (
		<table border= "4" style={{ "width":"50"}}>
			<tr> 
				<th> Email id </th>
				<th> UserName </th>
				<th> Phone</th>
				<th> Personal id</th>
				<th> <button onClick = 
			{()=> {if (window.confirm('r u sure ???')) truncStu()}}>
			Delete all </button></th>
				{/* <th> Update</th> */}
			</tr>
			{
			info.map((e) =>(
				<tr style={{"text-align":"center"}}>
				<td>{e.email } </td>
				<td>{e.name } </td>
				<td>{e.phone} </td>
				<td>{e.id} </td>

			<td><button onClick = 
			{()=> {if (window.confirm('r u sure ???')) delStu(e.email)}}>
			Delete </button></td>

			
			</tr>
			))

			}
			</table>
			)}
			</center>
			</>
			);
}
export default View;
