document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Anchor Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // No fixed header anymore, but keep a small offset for breathing room
                const offset = 20; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Booking System Logic
    const bookButtons = document.querySelectorAll('.book-car-btn');
    const vehicleSelect = document.getElementById('vehicle-select-main');
    const serviceTypeSelect = document.getElementById('service-type');
    const bookingForm = document.querySelector('.main-booking-form');
    const bookingSection = document.getElementById('booking');
    const securityCtaBtn = document.querySelector('.btn-security-cta');

    // Custom Notification Logic
    window.showNotification = function(message) {
        const notification = document.getElementById('custom-notification');
        const notificationText = notification.querySelector('.notification-text p');
        if (message) {
            notificationText.textContent = message;
        }
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            closeNotification();
        }, 5000);
    }

    window.closeNotification = function() {
        const notification = document.getElementById('custom-notification');
        notification.classList.remove('show');
    }

    // Handle 'Contact Security Team' click
    if (securityCtaBtn) {
        securityCtaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to booking section
            if (bookingSection) {
                const headerOffset = 50;
                const elementPosition = bookingSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            // Select 'VIP Security' in the service type dropdown
            if (serviceTypeSelect) {
                // serviceTypeSelect.value = 'security'; // Option removed based on user request
                serviceTypeSelect.focus(); // Focus the dropdown instead
                // Trigger change event if needed
                // serviceTypeSelect.dispatchEvent(new Event('change'));
            }
            // Highlight form
            if (bookingForm) {
                bookingForm.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                bookingForm.style.transform = 'scale(1.02)';
                bookingForm.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
                setTimeout(() => {
                    bookingForm.style.transform = 'scale(1)';
                    bookingForm.style.boxShadow = 'none';
                }, 800);
            }
        });
    }

    // Handle Form Submission
    if (bookingForm) {
        bookingForm.onsubmit = function(e) {
            e.preventDefault();
            showNotification('Booking request submitted! We will contact you shortly.');
            bookingForm.reset();
        };
    }

    // Handle 'Book Now' clicks on fleet cards
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const vehicleValue = btn.getAttribute('data-vehicle');
            
            // Set the dropdown value
            if (vehicleSelect) {
                vehicleSelect.value = vehicleValue;
            }

            // Scroll to the booking form
            if (bookingSection) {
                const headerOffset = 50;
                const elementPosition = bookingSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Highlight the form briefly
                if (bookingForm) {
                    bookingForm.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                    bookingForm.style.transform = 'scale(1.02)';
                    bookingForm.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
                    setTimeout(() => {
                        bookingForm.style.transform = 'scale(1)';
                        bookingForm.style.boxShadow = 'none';
                    }, 800);
                }
            }
        });
    });

    // Initialize Flatpickr for Service Date
    if (document.getElementById('service-date')) {
        flatpickr("#service-date", {
            dateFormat: "F j, Y",
            minDate: "today",
            disableMobile: false, // Force custom calendar on mobile
            allowInput: false,    // Prevent manual typing
            clickOpens: true,
            onOpen: function(selectedDates, dateStr, instance) {
                // Optional: Scroll to input if needed
            }
        });
    }

    // Set minimum date for date pickers to today (Fallback for native inputs if any remain)
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});
