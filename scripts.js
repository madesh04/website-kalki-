/**
 * WOODEN TOYS ECOMMERCE - MAIN JAVASCRIPT
 * =======================================
 * Author: AI Assistant
 * Description: Main JavaScript file for Wooden Toys eCommerce website
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initProductCarousel();
    initTestimonialCarousel();
    initProductGallery();
    initQuantitySelectors();
    initAccordions();
    initFilters();
    initCart();
    initPopup();
    initWhatsAppButton();
    initTabSystem();
    initBlogReadMore();
    initPagination();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
}

/**
 * Product Carousel
 * Converted to grid layout for featured products
 */
function initProductCarousel() {
    // The carousel functionality is disabled as we're using a grid layout instead
    // The CSS has been updated to display products in a 3x2 grid
    const productCarousel = document.querySelector('.product-carousel');
    
    if (productCarousel) {
        // Hide navigation buttons as they're no longer needed
        const prevButton = productCarousel.querySelector('.carousel-prev');
        const nextButton = productCarousel.querySelector('.carousel-next');
        
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    }
    
    // Initialize the related products carousel
    initRelatedProductsCarousel();
}

/**
 * Testimonial Carousel
 */
function initTestimonialCarousel() {
    // Similar implementation as product carousel if needed
    // For simplicity, we can use the same carousel logic
}

/**
 * Product Gallery
 * For product detail page
 */
function initProductGallery() {
    const productGallery = document.querySelector('.product-gallery');
    
    if (productGallery) {
        const mainImage = productGallery.querySelector('.product-main-image');
        const thumbnails = productGallery.querySelectorAll('.product-thumbnail');
        
        if (!mainImage || thumbnails.length === 0) return;
        
        // Add click event to each thumbnail
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image source
                const newSrc = this.getAttribute('src');
                mainImage.setAttribute('src', newSrc);
                
                // Update active state
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

/**
 * Quantity Selectors
 * For product detail and cart pages
 */
function initQuantitySelectors() {
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    
    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.quantity-minus');
        const plusBtn = selector.querySelector('.quantity-plus');
        const input = selector.querySelector('.quantity-input');
        
        if (!minusBtn || !plusBtn || !input) return;
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(input.value, 10);
            value = isNaN(value) ? 1 : value;
            if (value > 1) {
                input.value = value - 1;
                // Trigger change event for cart updates
                input.dispatchEvent(new Event('change'));
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(input.value, 10);
            value = isNaN(value) ? 1 : value;
            input.value = value + 1;
            // Trigger change event for cart updates
            input.dispatchEvent(new Event('change'));
        });
        
        // Validate input on change
        input.addEventListener('change', function() {
            let value = parseInt(this.value, 10);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
        });
    });
}

/**
 * Accordions
 * For FAQ and product details
 */
function initAccordions() {
    // Initialize all accordion content to be hidden by default
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.style.maxHeight = '0';
        content.style.padding = '0 var(--spacing-md)';
    });
    
    // For regular accordions with parent container
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            if (!header) return;
            
            header.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default button behavior
                const item = this.closest('.accordion-item');
                
                // Close all other items in this accordion
                const siblings = accordion.querySelectorAll('.accordion-item');
                siblings.forEach(sibling => {
                    if (sibling !== item && sibling.classList.contains('active')) {
                        sibling.classList.remove('active');
                        const siblingContent = sibling.querySelector('.accordion-content');
                        if (siblingContent) {
                            siblingContent.style.maxHeight = '0';
                            siblingContent.style.padding = '0 var(--spacing-md)';
                        }
                        const siblingIcon = sibling.querySelector('.accordion-header i');
                        if (siblingIcon) {
                            siblingIcon.classList.remove('fa-minus');
                            siblingIcon.classList.add('fa-plus');
                        }
                    }
                });
                
                // Toggle active class on the clicked item
                const wasActive = item.classList.contains('active');
                item.classList.toggle('active');
                
                // Toggle content visibility
                const content = item.querySelector('.accordion-content');
                if (content) {
                    if (!wasActive) {
                        // Opening the accordion
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.padding = 'var(--spacing-md)';
                        // Change icon from plus to minus
                        const icon = this.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-minus');
                        }
                    } else {
                        // Closing the accordion
                        content.style.maxHeight = '0';
                        content.style.padding = '0 var(--spacing-md)';
                        // Change icon from minus to plus
                        const icon = this.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        }
                    }
                }
                
                // Force a reflow to ensure styles are applied correctly
                window.getComputedStyle(content).getPropertyValue('max-height');
            });
        });
    });
    
    // For standalone accordion items (like in contact page)
    const standaloneAccordionHeaders = document.querySelectorAll('.accordion-item > .accordion-header:not(.accordion .accordion-header)');
    
    standaloneAccordionHeaders.forEach(header => {
        if (!header) return;
        
        header.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            const item = this.closest('.accordion-item');
            
            // Toggle active class on the clicked item
            const wasActive = item.classList.contains('active');
            item.classList.toggle('active');
            
            // Toggle content visibility
            const content = item.querySelector('.accordion-content');
            if (content) {
                if (!wasActive) {
                    // Opening the accordion
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.padding = 'var(--spacing-md)';
                    // Change icon from plus to minus
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    // Closing the accordion
                    content.style.maxHeight = '0';
                    content.style.padding = '0 var(--spacing-md)';
                    // Change icon from minus to plus
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
                
                // Force a reflow to ensure styles are applied correctly
                window.getComputedStyle(content).getPropertyValue('max-height');
            }
        });
    });
    
    // Initialize accordion items to be closed by default
    document.querySelectorAll('.accordion-content').forEach(content => {
        // Using maxHeight instead of display for smooth transitions
        content.style.maxHeight = '0';
        content.style.padding = '0 var(--spacing-md)';
        content.style.overflow = 'hidden';
    });
    
    // Force a reflow to ensure all styles are applied
    document.body.offsetHeight;
}

/**
 * Blog Read More Functionality
 * For blog page to show detailed content when 'Read more' is clicked
 */
function initBlogReadMore() {
    const readMoreButtons = document.querySelectorAll('.blog-readmore');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent blog card
            const blogCard = this.closest('.blog-card');
            if (!blogCard) return;
            
            // Get the excerpt paragraph
            const excerpt = blogCard.querySelector('.blog-excerpt');
            if (!excerpt) return;
            
            // Check if expanded content already exists
            let expandedContent = blogCard.querySelector('.blog-expanded-content');
            
            if (!expandedContent) {
                // Create expanded content with more details
                expandedContent = document.createElement('div');
                expandedContent.className = 'blog-expanded-content';
                
                // Generate detailed content based on the blog title
                const blogTitle = blogCard.querySelector('.blog-title').textContent;
                expandedContent.innerHTML = `
                    <p>This is the detailed content for "${blogTitle}". Here you would find the full article with more information, images, and insights about the topic.</p>
                    <p>Wooden toys offer numerous benefits for child development, including improved fine motor skills, creativity, and cognitive development. Unlike plastic toys, wooden toys are more durable, environmentally friendly, and often safer for children.</p>
                    <p>Our handcrafted wooden toys are made from sustainably sourced materials and finished with non-toxic paints and oils, ensuring they're safe for children of all ages.</p>
                    <a href="#" class="blog-collapse">Show Less</a>
                `;
                
                // Insert expanded content after excerpt
                excerpt.parentNode.insertBefore(expandedContent, excerpt.nextSibling);
                
                // Add event listener to 'Show Less' link
                const collapseLink = expandedContent.querySelector('.blog-collapse');
                collapseLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    expandedContent.style.display = 'none';
                    excerpt.style.display = 'block';
                    button.style.display = 'block';
                });
            } else {
                // Show expanded content if it already exists
                expandedContent.style.display = 'block';
            }
            
            // Hide excerpt and read more button
            excerpt.style.display = 'none';
            this.style.display = 'none';
        });
    });
}

/**
 * Pagination Functionality
 * For FAQ and blog pages
 */
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length === 0) return;
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically load content for the selected page
            // For demonstration, we'll just show an alert
            if (!this.classList.contains('pagination-next')) {
                console.log('Loading page ' + this.textContent);
                // In a real implementation, you would load content for this page
                // For example: loadPageContent(this.textContent);
            } else {
                // Handle next button click
                const activePage = document.querySelector('.pagination-btn.active:not(.pagination-next)');
                if (activePage) {
                    const nextPage = parseInt(activePage.textContent) + 1;
                    const maxPage = 3; // Assuming 3 pages total
                    
                    if (nextPage <= maxPage) {
                        // Find and click the next page button
                        const nextPageButton = document.querySelector(`.pagination-btn:not(.pagination-next):nth-child(${nextPage})`);
                        if (nextPageButton) {
                            nextPageButton.click();
                        }
                    }
                }
            }
        });
    });
}

// Global products array - accessible from all pages
const products = [
    {
        id: 1,
        name: 'Interlock Alphabets & Number EvaMat',
        originalPrice: 3125,
        offerPrice: 2625,
        category: 'Floor Mat',
        image: 'images/products/KFM - 01(white).png'
    },
    {
        id: 2,
        name: 'Interlock Multi Color EvaMat',
        originalPrice: 1295,
        offerPrice: 995,
        category:'Floor Mat',
        image: 'images/products/KFM - 02.png'
    },
    {
        id: 3,
        name: 'Interlock Multi color PlayMat',
        originalPrice: 1755,
        offerPrice: 1455,
        category:'Floor Mat',
        image: 'images/products/KFM - 03.png'
    },
    {
        id: 4,
            name: 'Interlocking Hopscotch Mat',
            originalPrice: 995,
            offerPrice: 795,
            category:'Floor Mat',
            image: 'images/products/KFM - 04.png'
        },
        {
            id: 5,
            name: 'Interlocking Hopscotch Mat',
            originalPrice: 2495,
            offerPrice: 1995,
            category:'Floor Mat',
            image: 'images/products/KFM - 05.png'
        },
        {
            id: 6,
            name: 'Pre writing Strokes',
            originalPrice: 999,
            offerPrice: 799,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 01.png'
        },
        {
            id: 7,
            name: 'Lines Strokes With Alphabets',
            originalPrice: 999,
            offerPrice: 799,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 02.png'
        },
        {
            id: 8,
            name: 'Curves Strokes With Alphabets',
            originalPrice: 999,
            offerPrice: 799,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 03.png'
        },
        {
            id:9,
            name: 'English Alphabets Upper Case',
            originalPrice: 999,
            offerPrice: 799,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 04.png'
        },
        {
            id: 10,
            name: 'English Alphabets Lower Case',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 05.png'
        },
        {
            id: 11,
            name: 'English Cursive Lower Case',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 06.png'
        },
        {
            id: 12,
            name: 'English Cursive Upper Case',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 07.png'
        },
        {
            id: 13,
            name: 'Tamizh Vowels',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',      
            image: 'images/products/KLBW - 08.png'
        },
        {
            id: 14,
            name: 'Tamizh Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 09.png'
        },
        {
            id: 15,
            name: 'Numbers 0-10',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 10.png'
        },
        {
            id: 16,
            name: 'Numbers 0-25',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',      
            image: 'images/products/KLBW - 11.png'
        },
        {
            id: 17,
            name: 'Geo Shapes',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 12.png'
        },
        {
            id: 18,
            name: 'Hand Eye Coordination',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 13.png'
        },
        {
            id: 19,
            name: 'Maze Easy Way',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 14.png'
        },
        {
            id: 20,
            name: 'Maze Hard Way',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 15.png'
        },
        {
            id: 21,
            name: 'Hindi Vowels',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 16.png'
        },
        {
            id: 22,
            name: 'Hindi Vowels',
            originalPrice: 1199,
            offerPrice: 999,
            category:'Finger Tracing Wall Hanging Boards',
            image: 'images/products/KLBW - 17.png'
        },
        {
            id: 23,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 01.png'
        },
        {
            id: 24,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 02.png'
        },
        {
            id: 25,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 03.png'
        },
        {
            id: 26,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 04.png'
        },
        {
            id: 27,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 05.png'
        },
        {
            id: 28,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 06.png'  
        },
        {
            id: 29,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KCRB - 07(combined).png'
        },
        {
            id: 30,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KDB - 08.png'
        },
        {
            id: 31,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KDB - 09.png'
        },
        {
            id: 32,
            name: 'Hindi Consonents',
            originalPrice: 1199,
            offerPrice: 999,
            category:'ClassRoom Boards',
            image: 'images/products/KDB - 10.png'
        },
];

     

/*
 * Product Filters
 * For shop page
 */
function initFilters() {
    const filterForm = document.querySelector('.filter-form');
    const productGrid = document.querySelector('.product-grid');
    
    if (!filterForm || !productGrid) {
        return;
    }

    // Current sort option
    let currentSortOption = 'featured';
    
    // Sort products function
    function sortProducts(productsToSort) {
        const sortedProducts = [...productsToSort];
        
        switch(currentSortOption) {
            case 'price-low':
                sortedProducts.sort((a, b) => {
                    const priceA = a.offerPrice > 0 ? a.offerPrice : a.originalPrice;
                    const priceB = b.offerPrice > 0 ? b.offerPrice : b.originalPrice;
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => {
                    const priceA = a.offerPrice > 0 ? a.offerPrice : a.originalPrice;
                    const priceB = b.offerPrice > 0 ? b.offerPrice : b.originalPrice;
                    return priceB - priceA;
                });
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'featured':
            default:
                // Featured sorting (default order)
                break;
        }
        
        return sortedProducts;
    }
    
    // Sort change event
    const sortBySelect = document.getElementById('sort-by');
    if (sortBySelect) {
        sortBySelect.addEventListener('change', function() {
            currentSortOption = this.value;
            applyFiltersAndSort();
        });
    }
    
    // Function to apply both filters and sorting
    function applyFiltersAndSort() {
        // Get selected filters
        const selectedCategories = Array.from(filterForm.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
        const minPrice = parseInt(filterForm.querySelector('#price-min').value, 10) || 0;
        const maxPrice = parseInt(filterForm.querySelector('#price-max').value, 10) || 100000;
        

        
        // Filter products
        const filteredProducts = products.filter(product => {
            // Check category
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            
            // Check price range (use offer price if available, otherwise use original price)
            const productPrice = product.offerPrice > 0 ? product.offerPrice : product.originalPrice;
            const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
            
            return categoryMatch && priceMatch;
        });
        
        // Sort and render products
        const sortedProducts = sortProducts(filteredProducts);
        renderProducts(sortedProducts);
    }
    
    // Filter change event
    filterForm.addEventListener('change', function() {
        applyFiltersAndSort();
    });
    
    // Reset button event
    const resetButton = filterForm.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset sort dropdown to default
            if (sortBySelect) {
                sortBySelect.value = 'featured';
                currentSortOption = 'featured';
            }
            
            // Small delay to ensure form reset completes
            setTimeout(() => {
                applyFiltersAndSort();
            }, 10);
        });
    }
    
    // Render products to grid
    function renderProducts(productsToRender) {
        // Clear product grid
        productGrid.innerHTML = '';
        
        // Update product count
        const productCountElement = document.getElementById('product-count');
        if (productCountElement) {
            productCountElement.textContent = productsToRender.length;
        }
        
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
            return;
        }
        
        // Add products to grid
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Format prices
            const formattedOriginalPrice = '₹' + product.originalPrice.toLocaleString('en-IN', {
                maximumFractionDigits: 0
            });
            const formattedOfferPrice = product.offerPrice > 0 ? '₹' + product.offerPrice.toLocaleString('en-IN', {
                maximumFractionDigits: 0
            }) : '';
            
            // All products now use the dynamic product.html page with ID parameter
            const productUrl = `product.html?id=${product.id}`;
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="original-price">${formattedOriginalPrice}</span>
                        <span class="offer-price">${formattedOfferPrice}</span>
                    </div>
                    <div class="product-actions">
                        <!--<button class="btn btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>-->
                        <a href="${productUrl}" class="btn btn-sm btn-secondary">View Details</a>
                        <a href="https://wa.me/919876543210" class="contact-whatsapp-btn btn-sm" target="_blank">
                            <i class="fab fa-whatsapp"></i> Contact
                        </a>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
    }
    
    // Initial render with sorting applied
    applyFiltersAndSort();
}

/**
 * Shopping Cart
 */
function initCart() {
    // Cart data structure
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add to cart function (global scope for product buttons)
    window.addToCart = function(productId) {
        // Find product in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            // Increment quantity
            existingItem.quantity += 1;
        } else {
            // Add new item
            cart.push({
                id: productId,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        saveCart();
        
        // Update cart UI
        updateCartUI();
        
        // Show confirmation
        showToast('Product added to cart!');
    };
    
    // Remove from cart
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    };
    
    // Update quantity
    window.updateCartQuantity = function(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    };
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Update cart UI
    function updateCartUI() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Update cart page if on cart page
        const cartContainer = document.querySelector('.cart-container');
        if (cartContainer) {
            renderCart();
        }
    }
    
    // Render cart on cart page
    function renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSummary = document.querySelector('.cart-summary');
        
        if (!cartItemsContainer || !cartSummary) return;
        
        // Clear existing content
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartSummary.innerHTML = '';
            return;
        }
        
        // Render cart items
        let subtotal = 0;
        
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            
            const price = product.offerPrice > 0 ? product.offerPrice : product.originalPrice;
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p class="cart-item-price">₹${(price / 100).toLocaleString('en-IN')}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">₹${(itemTotal / 100).toLocaleString('en-IN')}</div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update cart summary
        const shipping = subtotal > 50000 ? 0 : 5000; // Free shipping over ₹500
        const total = subtotal + shipping;
        
        cartSummary.innerHTML = `
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>₹${(subtotal / 100).toLocaleString('en-IN')}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'Free' : '₹' + (shipping / 100).toLocaleString('en-IN')}</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total:</span>
                <span>₹${(total / 100).toLocaleString('en-IN')}</span>
            </div>
            <a href="checkout.html" class="btn checkout-btn">Proceed to Checkout</a>
        `;
    }
    
    // Show toast notification
    function showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.querySelector('.toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
            
            // Add styles
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = 'var(--accent-color)';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '4px';
            toast.style.zIndex = '1000';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
        }
        
        // Set message and show toast
        toast.textContent = message;
        toast.style.opacity = '1';
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }

    
    // Initialize cart UI
    updateCartUI();
}

/**
 * Popup
 * For discount offer
 */
function initPopup() {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem('popupShown');
    
    if (!popupShown) {
        // Create popup elements
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';
        
        popupOverlay.innerHTML = `
            <div class="popup">
                <button class="popup-close">×</button>
                <h2 class="popup-title">Welcome to Wooden Toys!</h2>
                <div class="popup-content">
                    <p>Get ₹50 off your first order with code:</p>
                    <div class="discount-code">WELCOME50</div>
                    <button class="btn">Shop Now</button>
                </div>
            </div>
        `;
        
        // Add popup to body
        document.body.appendChild(popupOverlay);
        
        // Show popup after 2 seconds
        setTimeout(() => {
            popupOverlay.classList.add('active');
        }, 2000);
        
        // Close button event
        const closeButton = popupOverlay.querySelector('.popup-close');
        closeButton.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
            
            // Remove popup after animation
            setTimeout(() => {
                popupOverlay.remove();
            }, 300);
            
            // Set flag in localStorage
            localStorage.setItem('popupShown', 'true');
        });
        
        // Shop now button event
        const shopButton = popupOverlay.querySelector('.btn');
        shopButton.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
            
            // Remove popup after animation
            setTimeout(() => {
                popupOverlay.remove();
            }, 300);
            
            // Set flag in localStorage
            localStorage.setItem('popupShown', 'true');
            
            // Redirect to shop page
            window.location.href = 'shop.html';
        });
    }
}

/**
 * WhatsApp Button
 */
function initWhatsAppButton() {
    // Create WhatsApp button if it doesn't exist
    if (!document.querySelector('.whatsapp-btn')) {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.className = 'whatsapp-btn';
        whatsappBtn.href = 'https://wa.me/919876543210'; // Replace with actual WhatsApp number
        whatsappBtn.target = '_blank';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsappBtn);
    }
}

/**
 * Tab System
 * For product details and other tabbed content
 */
function initTabSystem() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-btn');
        const tabContents = container.querySelectorAll('.tab-content');
        
        if (tabButtons.length === 0 || tabContents.length === 0) return;
        
        // Add click event to each tab button
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get tab ID
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                container.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
            });
        });
        
        // Activate first tab by default
        tabButtons[0].click();
    });
}

/**
 * Related Products Carousel
 * For the "You May Also Like" section
 */
function initRelatedProductsCarousel() {
    const relatedProductsSection = document.querySelector('.related-products');
    
    if (relatedProductsSection) {
        const productGrid = relatedProductsSection.querySelector('.product-grid');
        
        if (productGrid) {
            // Create navigation arrows
            const prevButton = document.createElement('button');
            prevButton.className = 'carousel-nav carousel-prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'carousel-nav carousel-next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            // Add navigation arrows to the related products section
            relatedProductsSection.insertBefore(prevButton, productGrid);
            relatedProductsSection.appendChild(nextButton);
            
            // Get all product cards
            const productCards = productGrid.querySelectorAll('.product-card');
            const totalProducts = productCards.length;
            
            // Show only 3 products at a time
            const productsPerPage = 3;
            let currentIndex = 0;
            
            // Function to update visible products
            function updateVisibleProducts() {
                productCards.forEach((card, index) => {
                    if (index >= currentIndex && index < currentIndex + productsPerPage) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            // Initialize visible products
            updateVisibleProducts();
            
            // Add click event to previous button
            prevButton.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex -= productsPerPage;
                    if (currentIndex < 0) currentIndex = 0;
                    updateVisibleProducts();
                }
            });
            
            // Add click event to next button
            nextButton.addEventListener('click', function() {
                if (currentIndex + productsPerPage < totalProducts) {
                    currentIndex += productsPerPage;
                    if (currentIndex > totalProducts - productsPerPage) {
                        currentIndex = totalProducts - productsPerPage;
                    }
                    updateVisibleProducts();
                }
            });
            
            // Style the navigation buttons
            const navButtonStyle = {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: '1'
            };
            
            Object.assign(prevButton.style, navButtonStyle);
            Object.assign(nextButton.style, navButtonStyle);
            
            prevButton.style.left = '-20px';
            nextButton.style.right = '-20px';
            
            // Make the related products section position relative for absolute positioning of buttons
            relatedProductsSection.style.position = 'relative';
        }
    }
}

/**
 * Helper Functions
 */

// Format price
function formatPrice(price) {
    return '₹' + (price / 100).toLocaleString('en-IN', {
        maximumFractionDigits: 0
    });
}

// Get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}