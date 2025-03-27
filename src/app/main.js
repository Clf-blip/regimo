document.addEventListener('DOMContentLoaded', function () {
    const propertyList = document.querySelector('.properties-container');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileMenu = document.getElementById('profile-menu');

    if (!propertyList) {
        console.error('Error: Element with class "properties-container" not found.');
        return;
    }

    const apiUrl = 'http://localhost:5000/properties';

    // ✅ Fetch and display properties
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(properties => {
        console.log('Fetched properties:', properties); // Logging for debugging
        propertyList.innerHTML = '';

        // ✅ Map property titles to specific image filenames in public/images/
        const propertyImages = {
            "2-Bedroom Apartment in Nairobi": "apartment-interior.jpg",
            "3-Bedroom House in Mombasa": "house-exterior-modern.jpg",
            "1-Bedroom Studio in Kisumu": "studio-apartment.jpg",
            "4-Bedroom Villa in Eldoret": "villa.jpg",
            "3-Bedroom Apartment in Nakuru": "highrise-apartment.jpg"
        };

        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property-card');

            // ✅ Assign the correct image filename or fallback to default
            const imageFilename = propertyImages[property.title] || "default.jpg";
            const imagePath = `/images/${encodeURIComponent(imageFilename)}`; // Encode filename for safety

            propertyElement.innerHTML = `
                <img class="property-image" 
                     src="${imagePath}" 
                     alt="${property.title}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='/images/default.jpg';">
                <h2 class="property-title">${property.title}</h2>
                <p class="property-location"><strong>Location:</strong> ${property.location}</p>
                <p class="property-price"><strong>Price:</strong> KES ${property.price}</p>
                <p class="property-description">${property.description}</p>
                <p class="property-availability"><strong>Availability:</strong> ${property.available ? 'Available' : 'Not Available'}</p>
            `;
            propertyList.appendChild(propertyElement);
        });
    })
    .catch(error => {
        console.error('Error fetching properties:', error);
        propertyList.innerHTML = '<p style="color: red;">Failed to load properties. Please try again later.</p>';
    });

    // ✅ Profile Dropdown Toggle
    if (profileDropdown && profileMenu) {
        profileDropdown.addEventListener('click', function () {
            console.log('Profile dropdown clicked');
            profileMenu.classList.toggle('active');
        });

        // ✅ Close dropdown when clicking outside
        document.addEventListener('click', function (event) {
            if (!profileDropdown.contains(event.target)) {
                console.log('Closing dropdown');
                profileMenu.classList.remove('active');
            }
        });
    }

    // ✅ Open Modal Function
    function openModal(content) {
        console.log('Opening modal with content:', content);
    
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
    
        if (!modalOverlay || !modalContent) {
            console.error('❌ Modal elements not found. Check your HTML IDs.');
            return;
        }
    
        modalContent.innerHTML = content;
        modalOverlay.style.display = 'flex';
    }    

    // ✅ Close Modal Function
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            if (modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // ✅ Close modal when clicking outside content
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (event) {
            if (event.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
    }

    // ✅ Event Delegation for Opening Modals
    document.addEventListener("DOMContentLoaded", function () {
        const modalOverlay = document.getElementById("modal-overlay");
        const modalBody = document.getElementById("modal-body");
    
        // Function to open the modal with dynamic content
        function openModal(content) {
            if (!modalOverlay || !modalBody) {
                console.error("Modal elements not found.");
                return;
            }
    
            modalBody.innerHTML = content;  // Inject content dynamically
            modalOverlay.style.display = "block";
        }
    
        // Function to close the modal
        function closeModal() {
            modalOverlay.style.display = "none";
            modalBody.innerHTML = ""; // Clear content
        }
    
        // Attach event listeners to all modal trigger links
        document.querySelectorAll(".open-modal").forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                const modalType = this.getAttribute("data-modal");
    
                let modalContent = "";
                switch (modalType) {
                    case "sign-in":
                        modalContent = `<h2>Sign In</h2><p>Sign in form goes here...</p>`;
                        break;
                    case "settings":
                        modalContent = `<h2>Settings</h2><p>Settings content goes here...</p>`;
                        break;
                    case "privacy-modal":
                        modalContent = `<h2>Privacy Policy</h2><p>Details about our privacy policy...</p>`;
                        break;
                    case "about-modal":
                        modalContent = `<h2>About</h2><p>Information about Regimo...</p>`;
                        break;
                    case "terms-modal":
                        modalContent = `<h2>Terms & Conditions</h2><p>Terms and conditions details...</p>`;
                        break;
                    case "cookie-modal":
                        modalContent = `<h2>Cookie Policy</h2><p>Details about our cookie policy...</p>`;
                        break;
                    default:
                        modalContent = `<h2>Error</h2><p>No content available for this modal.</p>`;
                }
    
                openModal(modalContent);
            });
        });
    
        // Attach close event to close button
        document.querySelector(".close-modal").addEventListener("click", closeModal);
    
        // Close modal when clicking outside the content
        modalOverlay.addEventListener("click", function (event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    });    

    // ✅ Carousel Functionality
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    // ✅ Ensure buttons exist before adding event listeners
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        prevButton.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    }

    showSlide(currentIndex);
});
