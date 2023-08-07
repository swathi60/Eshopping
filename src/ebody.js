import './ebody.css';
import {useState, useEffect} from 'react';
export function Ebody(){
    
    const[categories, setcategories]= useState([]);
    const[products, setproducts]=useState([]);
    const[cartitems, setcartitems]=useState([]);
    const[countitems, setcountitems]=useState(0);
    const[totalamount, settotalamount]=useState(0);
    

    function Getitemscount(){
        setcountitems(cartitems.length);
    }

    function Loadcategories(){
        fetch(`https://fakestoreapi.com/products/categories`).then(response=>response.json()).then(data=>{
        data.unshift("all");    
        setcategories(data);})
    }

    function Loadproducts(url){
        fetch(url).then(response=>response.json()).then(data=>{setproducts(data);})

    }

    useEffect(()=>{
        Loadcategories();
        Loadproducts(`https://fakestoreapi.com/products`);
    },[cartitems])

    function handlecategorychange(e){
        if(e.target.value==="all")
       { Loadproducts(`https://fakestoreapi.com/products`);}
       else{
        Loadproducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
       }
    }

    function handleAddtocart(e){ 
        fetch(`https://fakestoreapi.com/products/${e.target.id}`).then(response=>response.json()).then(data=>{cartitems.push(data);
        alert(`${data.title} added to cart`);
        Getitemscount();
    })
    }
    
    function  handledelete(item){
        const itemindex= cartitems.findIndex((Ritem)=>Ritem.id===item.id); 
        if(itemindex!==-1){
            const newcartitems = [...cartitems];
            newcartitems.splice(itemindex,1);
            setcartitems(newcartitems);
            setcountitems(newcartitems.length);

        }
        
    }

    function handleallremove(){
        setcartitems([]); setcountitems(0);
    }
    
    function handletotal(){
        const total= cartitems.reduce((totalamount, current)=>{return totalamount + current.price ;} , 0)
        settotalamount(total); 
        
    }
    

    return(
        <div className='ebody1'>
            <div className='row'>
                <nav className='col-1'>
                  <label>Select category</label>
                    <select className='form-select' onChange={handlecategorychange}> 
                       {
                        categories.map(category=>
                            <option style={{fontSize:'0.7em'}} key={category} value={category}>{category.toUpperCase()}</option> )
                       }
                    </select>
                </nav>

                <main className='col-8 d-flex flex-wrap overflow-auto '>
                    {
                        products.map(product=>
                            <div className='card m-3 justify-content-center' key={product.id}>
                        
                        <div className='card-img-top p-4'>
                            <img src={product.image} alt='cardimage' width={'65%'}/>
                        </div>

                        <div className='card-body'>
                            <dl>
                                <dt>Id</dt> <dd>{product.id}</dd>
                                <dt>Name</dt> <dd>{product.title}</dd>
                                <dt>Price</dt> <dd>{product.price}</dd>
                                <dt>Rating</dt> 
                                <dd> <span>Rate: {product.rating.rate}</span> <span>Count: {product.rating.count}</span> </dd>
                                    
                            </dl>
                        </div>

                        <div className='card-footer'>
                            <button className='btn btn-danger w-100' id={product.id} onClick={handleAddtocart}> <span className='bi bi-plus'></span> <span>Add to cart</span> </button>
                        </div>
                    
                    </div>)
                    }
                </main>

                <aside className='col-2'>
                    <button className='btn btn-primary'>
                        <span>
                            <span className='bi bi-cart4'></span>
                            <span className='coun'>{countitems}</span>
                        </span> 
                        <span className='text1'>Your cart items </span>
                        <span className='bi bi-trash' onClick={handleallremove}></span>
                    </button>
                    <div >
                        <table className='table table-hover' >
                            <thead style={{fontSize:'0.6em'}}>
                                <tr> 
                                <th>Title</th>
                                <th>Price</th>
                                <th style={{paddingLeft:'5%'}}>preview</th>
                                <th>Delete</th>
                                </tr> 
                            </thead>
                            <tbody>
                               {
                                cartitems.map((item, index)=>(
                                    <tr key={index} >
                                        <td style={{fontSize:'0.6em'}}>{item.title}</td>
                                        <td style={{fontSize:'0.6em',color:'brown'}}>{item.price}</td>
                                        <td><img style={{paddingLeft:'5%'}} src={item.image} width={'100%'} alt='preview'/></td>
                                        <td style={{fontSize:'0.7em'}}><button className='btn1'  onClick={()=>handledelete(item)}>X</button></td>
                                    </tr>
                                ))
                               }
                            </tbody>
                        </table>
                    </div>
                    <div >
                        <button  className='btn btn-success ' onClick={handletotal}>Total:{totalamount.toFixed(2)}<span>{}</span></button>
                    </div>
                </aside>
            </div>
        </div>
    );
}