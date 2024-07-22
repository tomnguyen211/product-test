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
        const layoutStyle = isMobile ? 'grid-layout-mobile' : 'grid-layout-desktop';

        return layoutStyle;
    }

    return (          
        <div>
            <div className="sale-button">
                <button onClick={saleButton}>Apply 50% Sale</button>
            </div>
            <div className={GetCSSLayoutStyleByScreenType()}>
            {
                products.map((product,i) =>(
                    <div key={i} className="grid-tile">
                        <img src={product.image} alt={product.name} className="grid-image"/>
                        <h3 className="word-style">{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))
            }
            </div>
        </div>        
    );
}

export default Handlebars