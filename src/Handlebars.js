import React, {useState} from "react"
import data from './product-sample.json'
import { useMediaQuery } from "react-responsive";

/**
 * Handlebars - A React component that renders a list of products with an option to apply a 50% sale to all product prices. 
 * It also adapts the layout style based on the screen size (mobile or desktop).
 * 
 * @function
 * @returns {JSX.Element} The rendered component.
 */

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

    const sortByPrice = () => {

        const updated = [...products];
        updated.sort(function(a, b) { 
            return a.price - b.price;
        })
            
        setProducts(updated);
    };

    const sortByName = () => {

        const updated = [...products];
        updated.sort(function(a, b) { 
            return a.name.localeCompare(b.name);
        })
            
        setProducts(updated);
    };
   
    /**
     * Determines the layout style based on the screen width.
     * 
     * @function
     * @returns {string} The layout style class name ('grid-layout-mobile' or 'grid-layout-desktop').
     */
    const GetCSSLayoutStyleByScreenType = () => {
        /**
         * @function
         * @returns {bool} Check whether if resolution is under 480px
         */
        const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

        if(isMobile)
            return 'grid-layout-mobile'
        else
            return 'grid-layout-desktop';

    }

    return (          
        <div>
            <div className="sale-button">
                <button onClick={() => saleButton()} id="saleButton">Apply 50% Sale</button>
                <button onClick={() => sortByPrice()} id="sortPrice">Sort By Price</button>
                <button onClick={() => sortByName()} id="sortName">Sort By Name</button>
            </div>
            <div className={GetCSSLayoutStyleByScreenType()}>
            {
                products.map((product,i) =>(
                    <div key={i} className="grid-tile">
                        <img src={product.image} alt={product.name} className="grid-image"/>
                        <p className="word-style">{product.name}</p>
                        <h3>${product.price}</h3>
                    </div>
                ))
            }
            </div>
        </div>        
    );
}

export default Handlebars