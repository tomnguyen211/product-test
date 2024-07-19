import React, {useState} from "react"
import data from './product-sample.json'
import { useMediaQuery } from "react-responsive";

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

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const textStyle = isMobile ? 'grid-layout-mobile' : 'grid-layout-desktop';

    return (          
        <div>
            <div className="sale-button">
                <button onClick={saleButton}>Apply 50% Sale</button>
            </div>
            <div className={textStyle}>
            {
                products.map((product,i) =>(
                    <div key={i} className="grid-tile">
                        <img src={product.image} alt={product.name} className="grid-image"/>
                        <h3>{product.name}</h3>
                        <p className="price">${product.price}</p>
                    </div>
                ))
            }
            </div>
        </div>
        
    );
}

export default Handlebars