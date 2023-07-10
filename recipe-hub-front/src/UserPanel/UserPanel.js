import React, {useEffect, useState} from 'react'

function UserPanel(){
   const [data, setData] = useState([])
   useEffect(()=>{
    async function fetchData(){
        try{
            const response = await fetch('https://localhost:7264/api/User/id?id=1')
            const json = await response.json();
            setData(json);
        } catch (error){
            console.log('Error fetching data: ', error)
        }}
        fetchData();
    }, []);
    return(
<div>
<h3>User name: {data.userName}</h3>

<p>Name: {data.firstName} {data.lastName}</p>
<h3>About:</h3>
<p>{data.bio}</p>

</div>
    )

}

export default UserPanel