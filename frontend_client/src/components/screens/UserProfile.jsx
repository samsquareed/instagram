import { useEffect, useState, useContext } from 'react';
import img from '../assets/images/deekshi.jpg'
import Axios from 'axios'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const UserProfile = () =>{

    const [userProfile, setUserProfile] = useState(null);
    const {state, dispatch} = useContext(UserContext)

    const {userid} = useParams()
    // console.log(userid);

    useEffect( async ()=>{
        const authAxios = await Axios.create({
            baseURL : 'http://localhost:3001',
            headers : {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.get(`/user/${userid}`)
        .then(response=>{
            console.log(response);
            const userData = {
                name : response.data.user.name,
                email : response.data.user.email,
                posts : response.data.posts.length,
                images : response.data.posts
            }
            setUserProfile(userData)
            // console.log(userProfile);
            // setMyData(response.data.mypost);
        })
    },[])

    return(
        <>
        {userProfile ?

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
                {/* <h4>{state? state.name : "Loading ..."}</h4> */}
                <h4> {userProfile.name} </h4>
                <h5>{userProfile.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{userProfile.posts} posts</h6>
                    <h6> 0 followers</h6>
                    <h6>0 following</h6>
                </div>
            </div>
            </div>
             <div className="gallery">
               {
                   userProfile.images?.map((pics)=>{
                       return(
                           <img src={pics.photo} className="item" key={pics._id} alt={pics.title} />
                       )
                   })
               }
           </div>
        </div>
        
        
        : <h3> Loading ...</h3>}
        </>
    )
}

export default UserProfile;