import { useEffect, useState } from 'react';
import img from '../assets/images/deekshi.jpg'
import Axios from 'axios'

const Home = () =>{

    const [data, setData] = useState([]);
    useEffect(()=>{
        const authAxios = Axios.create({
            baseURL : 'http://localhost:3001',
            headers :{
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        authAxios.get('/allposts')
        .then(response=>{
            // console.log(response.data.mypost);
            setData(response.data.posts);
            // console.log(data);
        })
    },[])

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
                                <h6>{item.title}</h6>
                                <p> {item.caption} </p>
                                <input type="text" placeholder='Leave a comment' />
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Home;