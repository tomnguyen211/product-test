import React, {useState} from "react"
import data from './product-sample.json'

function Handlebars()
{
    const [products, setProducts] = useState(data);

    const saleButton = () => {
        const updated = products.map(product => ({
            ...product,
            price: (product.price / 2)
        })); 
        
        setProducts(updated);
    };

    return (          
        <div>
            <div className="sale-button">
                <button onClick={saleButton}>Apply 50% Sale</button>
            </div>
            <div className="grid-layout">
            {
                products.map((product,i) =>(
                    <div key={i} className="grid-tile">
                        <img src={product.image} alt={product.name} className="grid-image"/>
                        <h2>{product.name}</h2>
                        <p className="price">${product.price}</p>
                    </div>
                ))
            }
            </div>
        </div>
        
    );
}

export default Handlebars