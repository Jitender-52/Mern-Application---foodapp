import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options);
    // let foodItem = props.foodItems;
    const[qty, setQty] = useState(1);
    const[size, setSize] = useState("");

    const handleAddToCart = async () =>{

        let food = [];
        for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
            // if(item.id === props.foodItem._id && item.size !== size){
            //     food = item;
            //     // break;
            // }
            // if(item.id === props.foodItem._id && item.size === size)
            // {
            //     if(food !== [])
            //     {
            //         food = [];
            //         // return
            //     }
            //     food = [];
            // }
        }

        if(food !== []){
            if(food.size === size){ // this size is the new size selected by the user and food.size is the searched size from the cart
                await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
                return 
            }
            else if(food.size !== size){
                await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});
                return
            }
            return;
        }
        await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});
        // await console.log(data);
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    },[])

  return (
    <>
        <div>
            <div className="card mt-3" style={{"width":"18rem", "maxHeight":"360px"}}>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqE91FfeExJ_qVFW-LjLybdXL-J643ZQvCw&usqp=CAU" className="card-img-top" alt="..."/> */}
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text">Order your favourite food here.</p> */}
                    <div className="container ">
                        <select  className="m-2 rounded bg-dark text-light" onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i)=>{
                                return(
                                    <option key = {i+1} value={i+1}> {i+1} </option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-dark text-light rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {
                                priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                            {/* <option value="half">Half</option>
                            <option value="full">Full</option> */}
                        </select>
                        <div className="d-inline">
                            ${finalPrice}/-
                        </div>
                        <hr />
                        <div className='btn btn-dark justify-center text-white ms-4' onClick={handleAddToCart}>Add to cart</div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}
