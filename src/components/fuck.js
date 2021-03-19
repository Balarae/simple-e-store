import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../context'
import PropTypes from 'prop-types'

export default class Product extends Component {
    render() {
        const{id, title, img, price, inCart} = this.props.product;
        return (
           <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3 " >
           <div className="card">
           {/* Product consumer */}
           <ProductConsumer>
           {(value)=>{
               return (
                <div className="img-container p-5" onClick={()=>value.handleDetail(id)}>
                <Link to="/details" >
                    <img src={img} alt="product"  className="card-img-top" />
                </Link>
                <button className="cart-btn" disabled={inCart?true:false} 
                onClick={()=>{
                     value.addToCart(id)
                     value.openModal(id)
                    
                }} >
                {inCart?(<p className="text-capitalize mb-0" disabled > {" "}  inCart</p>):(<i className="fas fa-cart-plus" />)}
                </button>

               </div>
               )
           }}
            
           </ProductConsumer>
              
               {/* card footer */}
               <div className="card-footer d-flex justify-content-between ">
                   <p className="align-self-center mb-o" >{title}</p>
                   <h5 className="text-blue font-italic mb-0 ">
                       <span className="mr-1" >$</span>
                       {price}
                   </h5>
               </div>

           </div>

           </ProductWrapper>
        )
    }
}
// proptypes
Product.propTypes ={
    product: PropTypes.shape({
        id:PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price:PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}

const ProductWrapper = styled.div`
.card{
    border-color:transparent;
    transition: all 1s linear;
}
.card-footer{
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
    }
    .card-footer{
        background: rgba(247,247,247);
    }
}
/* overflow hidden is a must if the u planning on tranforming ur image */
.img-container{
    position: relative;
    overflow: hidden;
}
/* setting our transition timely */
.card-img-top{
    transition: all 1s linear;
}
/* scling the image */
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.cart-btn{
    /* since img-container is acting as parent container for the btn */
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size:1.4rem;
    border-radius: 0.5rem 0 0 0;
    /* button hidden 100% right and 100% down, all coming it's starting point which was bottom, right */
    transform: translate(100%, 100%);
    transition: all 1s linear;

}
.img-container:hover .cart-btn{
    /* it reappears to original position */
    transform: translate(0,0);
    color: var(--mainBlue);
    cursor: pointer;
}

`
// fucked up shit

import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

export default class Details extends Component {

    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                    const {id, company, img, info, title, inCart, price}= value.detailProduct;
                    return(
                        <div className="container py-5 "  >
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* end of title */}
                            {/* Product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 " >
                                    <img src={img} className="img-fluid" alt="product"/>
                                </div>
                                {/* product text */}
                                 <div className="col-10 mx-auto col-md-6 my-3 text-capitalize" >
                                    <h2>model : {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2" >
                                        made by : <span className="text-uppercase" >{company}</span>
                                    </h4>
                                    <h4 className="text-blue" >
                                        <strong>
                                            price : <span>$</span>{price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3  mb-0">
                                        some info about the product:
                                    </p>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>
                                    {/* Buttons */}
                                    <div>
                                        <Link to="/" >
                                            <ButtonContainer>
                                                back to products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer cart  disabled={inCart? true : false} onClick={()=>{
                                            value.addToCart(id)
                                            value.openModal(id)
                                            
                                        }} >
                                                {inCart ? "inCart": "add to cart"}
                                            </ButtonContainer>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}

// fucked up context
import React, { Component } from 'react'
import Product from './components/Product';
import {storeProducts, detailProduct} from './data';



const ProductContext = React.createContext();
//Provider

 class ProductProvider extends Component {
     state={
         products: [],
         detailProduct: detailProduct,
         cart: [],
         modelOpen:true,
         modalProduct: detailProduct,
     }
     componentDidMount(){
         this.setProducts();
     }

     //setProducts - can be done outside the ProductProvider in my case i think that's better
     setProducts=()=>{
         let tempProducts = [];
         storeProducts.forEach(item=>{
             //Created a singleItem to be added to the end of the array
             const singleItem= {...item};
             tempProducts = [...tempProducts, singleItem]
         });
         this.setState(()=>{
             return {products: tempProducts}
         })
     }
     //Utility method
     getItem = (id)=>{
         const product = this.state.products.find((item)=> item.id === id);
         return product;
     }
    
     
     //simple functionalties
     handleDetail = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
     }
     //instead of using find, we went with index such that the component can always have a static index other than switching when we use the find function
     addToCart =(id)=>{
         let tempProducts = [...this.state.products];
         const index = tempProducts.indexOf(this.getItem(id))
         // now we got the product at the specific point of the index
         const product = tempProducts[index];
         product.inCart = true;
         product.count = 1;
         const price = product.price;
         product.total = price;
         this.setState(()=>{
            return {products: tempProducts, cart:[...this.state.cart,product]};
         }, ()=> {console.log(this.state);})
     }
     //opening function
     openModal = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{ modalProduct: product, modalOpen:true}
        })
     }
     closeModal = ()=>{
         this.setState(()=>{
             return{modalOpen:false}
         })
     }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
            }} >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

//consumer
const ProductConsumer = ProductContext.Consumer;

export{ProductProvider, ProductConsumer}