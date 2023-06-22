import React from 'react'

export default function Card() {
  return (
    <>
        <div>
            <div class="card mt-3" style={{"width":"18rem", "maxHeight":"360px"}}>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqE91FfeExJ_qVFW-LjLybdXL-J643ZQvCw&usqp=CAU" class="card-img-top" alt="..."/> */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ji658LbLQ21tTJg1W1CQkzZn7tgtdr5FwA&usqp=CAU" class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Order your favourite food here.</p>
                    <div className="container ">
                        <select  className="m-2 rounded bg-dark text-light">
                            {Array.from(Array(6), (e, i)=>{
                                return(
                                    <option key = {i+1} value={i+1}> {i+1} </option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-dark text-light rounded">
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                        </select>
                        <div className="d-inline">
                            Total Price
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}
