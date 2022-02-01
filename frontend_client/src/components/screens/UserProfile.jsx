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
                images : response.data.posts,
                followers : response.data.user.followers.length,
                following : response.data.user.following.length
            }
            setUserProfile(userData)
            // console.log(userProfile);
            // setMyData(response.data.mypost);
        })
    },[])


    const handleFollow = async() =>{
        const authAxios = await Axios.create({
            baseURL : 'http://localhost:3001',
            headers : {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.put('/follow',{
            followId : userid
        }).then(response=>{
            console.log(response);
            dispatch({type : "UPDATE", payload : {
                followers : response.data.followers,
                following : response.data.following
            }})
            localStorage.setItem("user", JSON.stringify(response.data))
        })
    }

    const handleUnFollow = async() =>{
        const authAxios = await Axios.create({
            baseURL : 'http://localhost:3001',
            headers : {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.put('/unfollow',{
            unfollowId : userid
        }).then(response=>{
            console.log(response);
        })
    }

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
                    <h6>{userProfile.followers} followers</h6>
                    <h6>{userProfile.following} following</h6>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={handleFollow}
                >
                    follow
                </button>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    unfollow
                </button>
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