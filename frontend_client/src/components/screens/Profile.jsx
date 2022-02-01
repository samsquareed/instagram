import { useEffect, useState, useContext } from 'react';
import img from '../assets/images/sam.jpg'
import Axios from 'axios'
import {UserContext} from '../../App'

const Profile = () =>{

    const [myData, setMyData] = useState([]);
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=>{
        const authAxios = Axios.create({
            baseURL : 'http://localhost:3001',
            headers : {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.get('/myposts')
        .then(response=>{
            // console.log(response.data);
            setMyData(response.data.mypost);
        })
    },[])

    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin : "1.1rem 0",
               borderBottom :"0.5px solid gray"  
            }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={img}
                />
            </div>
            <div>
                <h4> {state? state.name : "Loading ..."} </h4>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{myData?myData.length:"0"} posts</h6>
                    <h6> {state?state.followers.length:"0"} followers</h6>
                    <h6>{state?state.following.length:"0"} following</h6>
                </div>
            </div>
            </div>
             <div className="gallery">
               {
                   myData?.map((pics)=>{
                       return(
                           <img src={pics.photo} className="item" key={pics._id} alt={pics.title} />
                       )
                   })
               }
           </div>
        </div>
    )
}

export default Profile;