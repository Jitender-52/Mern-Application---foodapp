import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSerach] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData",{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      }
    });
  
    response = await response.json();

    // console.log(response[0], response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    
  }
  
  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
        <div> <Navbar/> </div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{zIndex:"10"}}>
                <form className="d-flex justify-content-center">
                    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSerach(e.target.value)}/>
                    {/* <button className="btn btn-outline-success bg-dark text-light" type="submit">Search</button> */}
                </form>
            </div>

                <div className="carousel-item active">
                <img src="https://source.unsplash.com/random/900×700/?Burger" className="imgBox d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/> 
                {/* class we can added height and objectFit in style and can remove imgBox */}
                </div>
                <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900×700/?samosa" className="imgBox d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900×700/?patty" className="imgBox d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
      </div>

        {/* <div> <Carousel/> </div> */}

        <div className="container">
          {
            foodCat !== []
            ? foodCat.map((data) => {
              return(
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem !== []
                  ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toString().toLocaleLowerCase()))).map(filteredItems => {
                      return(
                        <div key={filteredItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card 
                            foodItem = {filteredItems}
                            // foodID = {filteredItems._id}
                            options = {filteredItems.options[0]}
                          />
                        </div>
                      )
                    })
                  :<div>No such data Found!</div>
                }
                </div>
              )
            })
            :<div>""</div>
          } 
        </div>

        <div> <Footer/> </div>
    </>
  )
}

