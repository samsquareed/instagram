import img from '../assets/images/deekshi.jpg'

const Profile = () =>{
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
                <h4> Deeskhu </h4>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>24 posts</h6>
                    <h6> 208 followers</h6>
                    <h6>311 following</h6>
                </div>
            </div>
            </div>
             <div className="gallery">
               <img src={img} className="item" />
               <img src={img} className="item" />
               <img src={img} className="item" />
               <img src={img} className="item" />
               <img src={img} className="item" />
               <img src={img} className="item" />
           </div>
        </div>
    )
}

export default Profile;