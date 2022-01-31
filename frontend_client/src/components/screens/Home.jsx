import { useEffect, useState, useContext } from 'react';
import {UserContext} from '../../App'
import img from '../assets/images/deekshi.jpg'
import Axios from 'axios'

const Home = () =>{

    const [data, setData] = useState([]);
    const [userComments, setuserComments] = useState([]);
    const {state,dispatch} = useContext(UserContext)

    const [comment, setComment] = useState("");

    useEffect(()=>{
        const authAxios = Axios.create({
            baseURL : 'http://localhost:3001',
            headers :{
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.get('/allposts')
        .then(response=>{
            // console.log(response.data.posts);
            setData(response.data.posts);
            // console.log(data);
        })
    },[])


    const LikePost = (id)=>{
        const authAxios = Axios.create({
            baseURL : 'http://localhost:3001',
            headers :{
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.put('/like',{
            postId : id
        }).then(response=>{
            // console.log(response.data);
            const newData = data.map(item=>{
                if(item._id == response.data._id){
                    return response.data
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err))
    }

     const UnLikePost = (id)=>{
        const authAxios = Axios.create({
            baseURL : 'http://localhost:3001',
            headers :{
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.put('/unlike',{
            postId : id
        }).then(response=>{
            // console.log(response);
            const newData = data.map(item=>{
                if(item._id == response.data._id){
                    return response.data
                }else{
                    return item
                }
            })
            setData(newData)
            
        }).catch(err=>console.log(err))
    }

    const handleComment = (text,id)=>{
        // console.log(comment);
        // console.log(text, id);
        const authAxios = Axios.create({
            baseURL : 'http://localhost:3001',
            headers :{
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.put('/comment',{
            text : text,
            postedBy : id
        }).then(response=>{
            console.log(response.data.comments);
            setuserComments(response.data.comments);
            // const newData = data.map(item=>{
            //     if(item._id == response.data._id){
            //         return response.data
            //     }else{
            //         return item
            //     }
            // })
            // setData(newData)
            // console.log(data);
        })
    }

    return(
        <div className="home">
            {
                data?.map((item)=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img 
                                    src={item.photo} alt="" 
                                />
                            </div>
                            <div className="card-content">
                                <i className="material-icons like" style={{color : "red"}} >favorite</i>
                                {item.likes.includes(state._id)
                                ? 
                                <i className="material-icons"
                                    onClick={()=>{UnLikePost(item._id)}}
                                >thumb_down</i>
                                : 
                                <i className="material-icons"
                                onClick={()=>{LikePost(item._id)}}
                                >thumb_up</i>
                                }
                                <h6> {item.likes.length} likes </h6>
                                <h6>{item.title}</h6>
                                <p> {item.caption} </p>
                                {
                                    userComments.map(record=>{
                                        return(
                                            <h6> <span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text} </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    handleComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="Leave a comment" />  
                                </form>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Home;