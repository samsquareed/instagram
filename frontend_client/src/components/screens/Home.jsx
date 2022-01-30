import img from '../assets/images/deekshi.jpg'

const Home = () =>{
    return(
        <div className="home">
            <div className="card home-card">
                <h5>Deeksha</h5>
                <div className="card-image">
                    <img 
                        src={img} alt="" 
                    />
                </div>
                <div className="card-content">
                    <i className="material-icons like" style={{color : "red"}} >favorite</i>
                    <h6>Title</h6>
                    <p>Amazing girl</p>
                    <input type="text" placeholder='Leave a comment' />
                </div>
            </div>
        </div>
    )
}

export default Home;