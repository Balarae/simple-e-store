import React from 'react'

export default function CartItem({item,value}) {
    const{id, title, img, price, total, count} = item;
    const{increment, decrement, removeItem} = value 
    return (
       <div className="row my-2 text-capitalize text-center">
           <div className="col-10 mx-auto col-lg-2">
           {/* inline styling and img-fluid such that image doesn't exceed the container */}
               <img src={img} style={{width:'5rem', height:"5rem"}} className="img-fluid"  alt="product"/>
           </div>
           <div className="col-10 mx-auto col-lg-2" >
            {/* our span won't be active for display on a large screen */}
            <span className="d-lg-none">product : </span> {title}
           </div>
           <div className="col-10 mx-auto col-lg-2" >
            {/* our span won't be active for display on a large screen */}
            <span className="d-lg-none">price : </span> {price}
           </div>
           <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
               <div className="d-flex justify-content-center">
                   <span className="btn btn-black mx-1" onClick={()=>decrement(id)} >-</span>
                   <span className="btn btn-black mx-1">{count}</span>
                   <span className="btn btn-black mx-1" onClick={()=>increment(id)} >+</span>
               </div>
           </div>

            {/* remove button */}
            <div className="col-10 mx-auto col-lg-2"  >
                <div className="cart-icon" onClick={()=>removeItem(id)} >
                    <i className="fas fa-trash"></i>
                </div>
            </div>

            {/* total items */}
           <div className="col-10 mx-auto col-lg-2" >
              <strong> item total : $ {total} </strong>
           </div>
           
       </div>
    )
}
